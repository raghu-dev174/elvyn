import { validateBrief } from '@/lib/inquiry';
import {
  InquiryDeliveryError,
  sendInquiryEmail,
} from '@/lib/server/inquiry-email';

export const runtime = 'nodejs';
const baseHeaders = { 'Cache-Control': 'no-store' };
const unavailable =
  'We couldn’t send your brief right now. Your details are still here. Please try again shortly, or save a copy below.';

export async function POST(request: Request) {
  const respond = (
    body: unknown,
    status: number,
    extra: Record<string, string> = {},
  ) => Response.json(body, { status, headers: { ...baseHeaders, ...extra } });
  try {
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin)
      return respond(
        { message: 'Please submit your brief from the ELVYN website.' },
        403,
      );
    if (!request.headers.get('content-type')?.includes('application/json'))
      return respond({ message: 'Please use the project form.' }, 415);
    if (Number(request.headers.get('content-length')) > 24000)
      return respond(
        {
          message:
            'Your brief is a little too long. Please shorten it and try again.',
        },
        413,
      );
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > 24000)
      return respond(
        {
          message:
            'Your brief is a little too long. Please shorten it and try again.',
        },
        413,
      );
    let input: unknown;
    try {
      input = JSON.parse(raw);
    } catch {
      return respond(
        { message: 'Please check your brief and try again.' },
        400,
      );
    }
    const { data, errors } = validateBrief(input);
    if (data.website)
      return respond(
        { message: 'Please check your brief and try again.' },
        400,
      );
    if (Object.keys(errors).length)
      return respond(
        { message: 'Please check the highlighted fields.', errors },
        422,
      );
    const suppliedKey = request.headers.get('idempotency-key');
    if (suppliedKey && !/^[a-zA-Z0-9_-]{16,100}$/.test(suppliedKey))
      return respond(
        { message: 'Please refresh the page and try again.' },
        400,
      );
    const key = suppliedKey ?? crypto.randomUUID();
    await sendInquiryEmail(data, 'elvyn-inquiry/' + key);
    return respond({ ok: true }, 200);
  } catch (error) {
    const delivery = error instanceof InquiryDeliveryError;
    const status = delivery ? error.status : 500;
    console.error(
      '[inquiry]',
      delivery ? error.category : 'unexpected_failure',
    );
    const message =
      status === 429
        ? 'We’re receiving a lot of enquiries right now. Please wait a moment and try again.'
        : status === 409
          ? 'Your brief is still being processed. Please wait a moment before trying again.'
          : unavailable;
    return respond(
      { message },
      status,
      status === 429 || status === 409 ? { 'Retry-After': '10' } : {},
    );
  }
}
