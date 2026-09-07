export const projectTypes = [
  'New Website',
  'Website Redesign',
  'Landing Page',
  'Web Application',
  'Not Sure',
];
export const budgets = [
  '₹8k–₹15k',
  '₹15k–₹30k',
  '₹30k–₹50k',
  '₹50k+',
  'Not Sure',
];
export type Brief = {
  name: string;
  business: string;
  email: string;
  whatsapp: string;
  service: string;
  budget: string;
  details: string;
  references: string;
  timeline: string;
  website: string;
};
export const emptyBrief: Brief = {
  name: '',
  business: '',
  email: '',
  whatsapp: '',
  service: '',
  budget: '',
  details: '',
  references: '',
  timeline: '',
  website: '',
};
export function validateBrief(input: unknown): {
  data: Brief;
  errors: Partial<Record<keyof Brief, string>>;
} {
  const raw =
    input && typeof input === 'object'
      ? (input as Record<string, unknown>)
      : {};
  const data = Object.fromEntries(
    Object.keys(emptyBrief).map((k) => [
      k,
      typeof raw[k] === 'string' ? (raw[k] as string).trim() : '',
    ]),
  ) as Brief;
  const errors: Partial<Record<keyof Brief, string>> = {};
  if (data.name.length < 2 || data.name.length > 100)
    errors.name = 'Please enter your name (2–100 characters).';
  if (data.business.length < 2 || data.business.length > 150)
    errors.business = 'Please enter your business or company name.';
  if (data.email.length > 254 || !/^\S+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Please enter a valid email address.';
  const digits = data.whatsapp.replace(/\D/g, '');
  if (
    !/^[+\d\s().-]+$/.test(data.whatsapp) ||
    digits.length < 7 ||
    digits.length > 15
  )
    errors.whatsapp = 'Enter a valid number, including your country code.';
  if (!projectTypes.includes(data.service))
    errors.service = 'Choose what you need, or select Not Sure.';
  if (!budgets.includes(data.budget))
    errors.budget = 'Choose a budget, or select Not Sure.';
  if (data.details.length < 20 || data.details.length > 5000)
    errors.details = 'Tell us a little more (20–5,000 characters).';
  if (data.timeline.length < 2 || data.timeline.length > 150)
    errors.timeline = 'Add a timeframe, or write “Flexible”.';
  if (data.references.length > 2000)
    errors.references = 'Please keep your references under 2,000 characters.';
  if (data.references) {
    const urls = data.references.split(/[\s,]+/).filter(Boolean);
    if (
      urls.length > 10 ||
      urls.some((s) => {
        try {
          const u = new URL(s);
          return (
            !['http:', 'https:'].includes(u.protocol) ||
            !u.hostname.includes('.')
          );
        } catch {
          return true;
        }
      })
    )
      errors.references =
        'Use complete https:// links, separated by spaces or new lines (up to 10).';
  }
  return { data, errors };
}
