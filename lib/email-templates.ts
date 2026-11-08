/**
 * Email Templates for Syed Aoun Raza Portfolio
 * Recipient: aounr3292@gmail.com
 */

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}

export interface ScheduleData {
  name: string;
  email: string;
  phone?: string;
  meetingType: string;
  date: string;
  timeSlot: string;
  platform: string;
  topic?: string;
  googleCalendarUrl?: string;
}

/**
 * Generates an HTML email for contact form submissions
 */
export function generateContactEmailHtml(data: ContactData): string {
  const whatsappUrl = data.phone
    ? `https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`
    : `https://wa.me/923014981629`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Message</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f17; color: #e2e8f0; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #00FFA3; }
    .badge { display: inline-block; background-color: rgba(0,255,163,0.15); color: #00FFA3; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 999px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
    .title { font-size: 24px; font-weight: 800; color: #ffffff; margin: 0; }
    .subtitle { color: #94a3b8; font-size: 14px; margin-top: 6px; }
    .content { padding: 32px 24px; }
    .info-card { background-color: #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #334155; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #334155; font-size: 14px; }
    .info-row:last-child { border-bottom: none; }
    .label { color: #94a3b8; font-weight: 600; }
    .value { color: #ffffff; font-weight: 600; text-align: right; }
    .value a { color: #00FFA3; text-decoration: none; }
    .message-box { background-color: #0b0f17; border-left: 4px solid #00FFA3; border-radius: 8px; padding: 18px; margin: 20px 0; }
    .message-title { font-size: 13px; font-weight: 700; color: #00FFA3; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px; }
    .message-text { color: #cbd5e1; font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin: 0; }
    .actions { display: flex; gap: 12px; margin-top: 28px; text-align: center; }
    .btn { display: inline-block; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 4px; }
    .btn-primary { background-color: #00FFA3; color: #0b0f17 !important; }
    .btn-secondary { background-color: #25D366; color: #ffffff !important; }
    .footer { background-color: #0f172a; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1f2937; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Portfolio Inquiry</div>
      <h1 class="title">New Message Received!</h1>
      <p class="subtitle">A client submitted the contact form on your portfolio website</p>
    </div>
    
    <div class="content">
      <div class="info-card">
        <div class="info-row">
          <span class="label">Sender Name:</span>
          <span class="value">${escapeHtml(data.name)}</span>
        </div>
        <div class="info-row">
          <span class="label">Sender Email:</span>
          <span class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
        </div>
        ${data.phone ? `
        <div class="info-row">
          <span class="label">WhatsApp / Phone:</span>
          <span class="value"><a href="${whatsappUrl}">${escapeHtml(data.phone)}</a></span>
        </div>` : ''}
        ${data.service ? `
        <div class="info-row">
          <span class="label">Interested Service:</span>
          <span class="value" style="color: #00FFA3;">${escapeHtml(data.service)}</span>
        </div>` : ''}
        ${data.budget ? `
        <div class="info-row">
          <span class="label">Estimated Budget:</span>
          <span class="value">${escapeHtml(data.budget)}</span>
        </div>` : ''}
        <div class="info-row">
          <span class="label">Received At:</span>
          <span class="value">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} (PKT)</span>
        </div>
      </div>

      <div class="message-box">
        <div class="message-title">Client Message</div>
        <p class="message-text">${escapeHtml(data.message)}</p>
      </div>

      <div class="actions" style="text-align: center;">
        <a href="mailto:${escapeHtml(data.email)}?subject=Re: Portfolio Inquiry&body=Hi ${encodeURIComponent(data.name)},%0A%0AThank you for reaching out! I would love to discuss your project.%0A%0ABest regards,%0ASyed Aoun Raza" class="btn btn-primary">
          ✉️ Reply via Email
        </a>
        ${data.phone ? `
        <a href="${whatsappUrl}" class="btn btn-secondary">
          💬 Chat on WhatsApp
        </a>` : ''}
      </div>
    </div>

    <div class="footer">
      <p>Sent to Syed Aoun Raza (aounr3292@gmail.com) from your Next.js Portfolio.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generates an HTML email for Meeting Schedule bookings
 */
export function generateScheduleEmailHtml(data: ScheduleData): string {
  const whatsappUrl = data.phone
    ? `https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`
    : `https://wa.me/923014981629`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Meeting Booked</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f17; color: #e2e8f0; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #022c22 0%, #0f172a 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #00FFA3; }
    .badge { display: inline-block; background-color: rgba(0,255,163,0.2); color: #00FFA3; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 999px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
    .title { font-size: 24px; font-weight: 800; color: #ffffff; margin: 0; }
    .subtitle { color: #94a3b8; font-size: 14px; margin-top: 6px; }
    .content { padding: 32px 24px; }
    .highlight-card { background: linear-gradient(135deg, #134e4a20 0%, #1e293b 100%); border: 1px solid #00FFA3; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center; }
    .highlight-date { font-size: 20px; font-weight: 800; color: #00FFA3; margin: 4px 0; }
    .highlight-time { font-size: 16px; color: #ffffff; font-weight: 600; }
    .info-card { background-color: #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #334155; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #334155; font-size: 14px; }
    .info-row:last-child { border-bottom: none; }
    .label { color: #94a3b8; font-weight: 600; }
    .value { color: #ffffff; font-weight: 600; text-align: right; }
    .value a { color: #00FFA3; text-decoration: none; }
    .topic-box { background-color: #0b0f17; border-left: 4px solid #00FFA3; border-radius: 8px; padding: 18px; margin: 20px 0; }
    .topic-title { font-size: 13px; font-weight: 700; color: #00FFA3; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px; }
    .topic-text { color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap; }
    .btn { display: inline-block; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 6px; text-align: center; }
    .btn-cal { background-color: #2563eb; color: #ffffff !important; }
    .btn-wa { background-color: #25D366; color: #ffffff !important; }
    .footer { background-color: #0f172a; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1f2937; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">📅 Meeting Scheduled</div>
      <h1 class="title">New 1-on-1 Call Booked!</h1>
      <p class="subtitle">A client scheduled a consultation session with you</p>
    </div>
    
    <div class="content">
      <div class="highlight-card">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8;">Scheduled Slot</div>
        <div class="highlight-date">${escapeHtml(data.date)}</div>
        <div class="highlight-time">${escapeHtml(data.timeSlot)} (PKT / UTC+5)</div>
        <div style="margin-top: 8px; font-size: 13px; color: #a7f3d0;">Platform: ${escapeHtml(data.platform)}</div>
      </div>

      <div class="info-card">
        <div class="info-row">
          <span class="label">Client Name:</span>
          <span class="value">${escapeHtml(data.name)}</span>
        </div>
        <div class="info-row">
          <span class="label">Client Email:</span>
          <span class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
        </div>
        ${data.phone ? `
        <div class="info-row">
          <span class="label">Client WhatsApp:</span>
          <span class="value"><a href="${whatsappUrl}">${escapeHtml(data.phone)}</a></span>
        </div>` : ''}
        <div class="info-row">
          <span class="label">Meeting Type:</span>
          <span class="value" style="color: #00FFA3;">${escapeHtml(data.meetingType)}</span>
        </div>
      </div>

      ${data.topic ? `
      <div class="topic-box">
        <div class="topic-title">Discussion Topic / Notes</div>
        <p class="topic-text">${escapeHtml(data.topic)}</p>
      </div>` : ''}

      <div style="text-align: center; margin-top: 24px;">
        ${data.googleCalendarUrl ? `
        <a href="${data.googleCalendarUrl}" class="btn btn-cal" target="_blank">
          📅 Add to Google Calendar
        </a>` : ''}
        ${data.phone ? `
        <a href="${whatsappUrl}" class="btn btn-wa" target="_blank">
          💬 Message Client on WhatsApp
        </a>` : ''}
      </div>
    </div>

    <div class="footer">
      <p>Sent to Syed Aoun Raza (aounr3292@gmail.com) • Portfolio Meeting Engine</p>
    </div>
  </div>
</body>
</html>
  `;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

