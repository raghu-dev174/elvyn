import 'server-only';
import { Resend, type CreateEmailOptions } from 'resend';
import type { Brief } from '../inquiry';

export class InquiryDeliveryError extends Error {
  status: number;
  category: string;
  missingVariables?: string[];
  constructor(
    status: number,
    category: string,
    missingVariables?: string[],
  ) {
    super('Inquiry delivery failed');
    this.status = status;
    this.category = category;
    this.missingVariables = missingVariables;
  }
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]!,
  );
const fields: [keyof Brief, string][] = [
  ['name', 'Name'],
  ['business', 'Business / Company'],
  ['email', 'Email'],
  ['whatsapp', 'WhatsApp'],
  ['service', 'Project type'],
  ['budget', 'Creation budget'],
  ['details', 'Project details'],
  ['references', 'References'],
  ['timeline', 'Preferred timeline'],
];

export function formatInquiryEmail(brief: Brief) {
  const rows = fields
    .map(
      ([key, label]) =>
        `<tr><th scope="row" style="padding:16px 20px;border-bottom:1px solid #ddd;text-align:left;vertical-align:top;width:150px;font-size:13px;color:#666;font-weight:400">${label}</th><td style="padding:16px 20px;border-bottom:1px solid #ddd;font-size:15px;line-height:1.6;word-break:break-word">${escapeHtml(brief[key] || 'Not provided').replace(/\r?\n/g, '<br>')}</td></tr>`,
    )
    .join('');
  return {
    subject: `New project inquiry — ${brief.business.replace(/[\r\n]/g, ' ')}`,
    text:
      'ELVYN — NEW PROJECT INQUIRY\n\n' +
      fields
        .map(([key, label]) => `${label}\n${brief[key] || 'Not provided'}`)
        .join('\n\n'),
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;background:#eee;font-family:Arial,sans-serif;color:#111"><table role="presentation" style="width:100%;max-width:680px;margin:32px auto;background:#fff;border-collapse:collapse"><tr><td style="background:#0a0a0a;color:#fff;padding:32px"><div style="font-size:28px;letter-spacing:-1px;font-weight:bold">ELVYN</div><div style="font-size:11px;letter-spacing:2px;margin-top:8px">WEB STUDIO / NEW PROJECT INQUIRY</div></td></tr><tr><td style="padding:28px 20px 12px"><h1 style="font-size:25px;letter-spacing:-1px;margin:0 0 12px">A new project starts here.</h1><p style="font-size:14px;line-height:1.6;color:#666">A visitor submitted the following brief. Reply to this email to contact the prospect directly.</p></td></tr><tr><td><table style="width:100%;border-collapse:collapse">${rows}</table></td></tr><tr><td style="padding:24px 20px;color:#777;font-size:11px">Submitted through the ELVYN website. Visitor-provided content.</td></tr></table></body></html>`,
  };
}

export async function sendInquiryEmail(brief: Brief, idempotencyKey: string) {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();
  const to = process.env.INQUIRY_TO_EMAIL?.trim();
  if (!key || !to || !from) {
    const missingVariables: string[] = [];
    if (!key) missingVariables.push('RESEND_API_KEY');
    if (!to) missingVariables.push('INQUIRY_TO_EMAIL');
    if (!from) missingVariables.push('INQUIRY_FROM_EMAIL');
    throw new InquiryDeliveryError(
      500,
      'missing_configuration',
      missingVariables,
    );
  }
  // Reject configuration mistakes without revealing addresses or credentials.
  const address = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
  const fromAddress = from.match(/<([^<>]+)>$/)?.[1] ?? from;
  if (!address.test(to) || !address.test(fromAddress) || /[\r\n]/.test(from)) {
    throw new InquiryDeliveryError(500, 'invalid_configuration');
  }
  const resend = new Resend(key);
  const email: CreateEmailOptions = {
    from,
    to: [to],
    replyTo: brief.email,
    ...formatInquiryEmail(brief),
  };
  let result;
  try {
    result = await resend.emails.send(email, { idempotencyKey });
  } catch {
    throw new InquiryDeliveryError(500, 'provider_connection');
  }
  if (result.error) {
    const upstream = result.error.statusCode;
    // Use only a bounded category in logs; never propagate the provider message.
    const category =
      upstream === 401
        ? 'provider_authentication'
        : upstream === 403
          ? 'provider_sender_or_permissions'
          : upstream === 429
            ? 'provider_rate_limit'
            : upstream === 409
              ? 'provider_duplicate_in_progress'
              : 'provider_rejected';
    throw new InquiryDeliveryError(500, category);
  }
  if (!result.data?.id)
    throw new InquiryDeliveryError(500, 'provider_empty_response');
  return { id: result.data.id };
}
