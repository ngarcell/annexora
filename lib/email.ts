import type { Lead } from '@/lib/leads';

export type PilotNotification = {
  id: string;
  name: string;
  email: string;
  company: string;
  useCase: string;
  systemCount: string;
  amountTotal: number | null;
  currency: string | null;
};

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM || 'ActaOS <hello@actaos.example>';
const notifyEmail = process.env.NOTIFY_EMAIL;

async function sendEmail({
  to,
  subject,
  html
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resendApiKey || !to) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject,
      html
    })
  });
}

export async function sendLeadNotification(lead: Lead) {
  if (!notifyEmail) return;
  const html = `
    <h2>New readiness review request</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Company:</strong> ${lead.company}</p>
    <p><strong>Use case:</strong> ${lead.useCase}</p>
    <p><strong>High-risk systems:</strong> ${lead.systemCount}</p>
    <p><strong>Status:</strong> ${lead.status}</p>
  `;
  await sendEmail({
    to: notifyEmail,
    subject: `New readiness review request — ${lead.company}`,
    html
  });
}

export async function sendPilotNotification(pilot: PilotNotification) {
  if (!notifyEmail) return;
  const amount = pilot.amountTotal
    ? `${pilot.amountTotal / 100} ${pilot.currency?.toUpperCase() || ''}`
    : 'N/A';
  const html = `
    <h2>Paid pilot confirmed</h2>
    <p><strong>Name:</strong> ${pilot.name}</p>
    <p><strong>Email:</strong> ${pilot.email}</p>
    <p><strong>Company:</strong> ${pilot.company}</p>
    <p><strong>Use case:</strong> ${pilot.useCase}</p>
    <p><strong>High-risk systems:</strong> ${pilot.systemCount}</p>
    <p><strong>Amount:</strong> ${amount}</p>
  `;
  await sendEmail({
    to: notifyEmail,
    subject: `Paid pilot confirmed — ${pilot.company}`,
    html
  });
}
