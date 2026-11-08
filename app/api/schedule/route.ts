import { NextResponse } from 'next/server';
import { generateScheduleEmailHtml } from '@/lib/email-templates';

export const dynamic = 'force-dynamic';

const RECIPIENT_EMAIL = 'aounr3292@gmail.com';

function createGoogleCalendarUrl({
  title,
  description,
  date,
  timeSlot,
  location,
}: {
  title: string;
  description: string;
  date: string;
  timeSlot: string;
  location: string;
}) {
  try {
    // Generate ISO timestamp approximations for Google Calendar format (YYYYMMDDTHHmmssZ)
    const baseDate = new Date(date);
    if (isNaN(baseDate.getTime())) {
      const today = new Date();
      baseDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    }
    
    // Parse time like "03:00 PM"
    let hours = 15;
    let minutes = 0;
    const timeMatch = timeSlot.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (timeMatch) {
      hours = parseInt(timeMatch[1], 10);
      minutes = parseInt(timeMatch[2], 10);
      const ampm = timeMatch[3].toUpperCase();
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
    }

    baseDate.setHours(hours, minutes, 0, 0);
    const startDate = baseDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    
    const endDateObj = new Date(baseDate.getTime() + 30 * 60 * 1000);
    const endDate = endDateObj.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', title);
    url.searchParams.set('dates', `${startDate}/${endDate}`);
    url.searchParams.set('details', description);
    url.searchParams.set('location', location);

    return url.toString();
  } catch (e) {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(description)}`;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, meetingType, date, timeSlot, platform, topic } = body;

    if (!name || !email || !date || !timeSlot) {
      return NextResponse.json(
        { error: 'Name, email, date, and time slot are required.' },
        { status: 400 }
      );
    }

    const meetingTitle = `Meeting: Syed Aoun Raza & ${name} (${meetingType || 'Consultation'})`;
    const meetingDesc = `Discussion between Syed Aoun Raza and ${name}.\nMeeting Type: ${meetingType}\nTopic: ${topic || 'General Project Discussion'}\nPlatform: ${platform || 'Google Meet'}\nClient Email: ${email}\nClient Phone/WhatsApp: ${phone || 'N/A'}`;
    const meetingLoc = platform === 'Google Meet' ? 'Google Meet (link will be sent)' : (platform || 'Google Meet');

    const googleCalendarUrl = createGoogleCalendarUrl({
      title: meetingTitle,
      description: meetingDesc,
      date,
      timeSlot,
      location: meetingLoc,
    });

    const emailHtml = generateScheduleEmailHtml({
      name,
      email,
      phone,
      meetingType: meetingType || '30-Min Project Consultation',
      date,
      timeSlot,
      platform: platform || 'Google Meet',
      topic,
      googleCalendarUrl,
    });

    let sentSuccessfully = false;
    let providerUsed = 'none';

    // 1. Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'Meetings <onboarding@resend.dev>',
            to: [RECIPIENT_EMAIL],
            reply_to: email,
            subject: `📅 New Meeting Booked by ${name}: ${date} at ${timeSlot}`,
            html: emailHtml,
          }),
        });

        if (resendRes.ok) {
          sentSuccessfully = true;
          providerUsed = 'resend';
        }
      } catch (err) {
        console.error('Resend schedule notification error:', err);
      }
    }

    // 2. Web3Forms
    if (!sentSuccessfully) {
      try {
        const web3Key = process.env.WEB3FORMS_ACCESS_KEY || 'public-portfolio-schedule';
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `📅 New Meeting Booked by ${name}: ${date} at ${timeSlot}`,
            from_name: name,
            to: RECIPIENT_EMAIL,
            email: email,
            phone: phone || 'Not provided',
            meetingType: meetingType,
            slot: `${date} @ ${timeSlot}`,
            platform: platform,
            topic: topic || 'None provided',
            html: emailHtml,
          }),
        });

        if (web3Res.ok) {
          sentSuccessfully = true;
          providerUsed = 'web3forms';
        }
      } catch (err) {
        console.warn('Web3Forms schedule delivery attempt:', err);
      }
    }

    const whatsappConfirmation = `https://wa.me/923014981629?text=${encodeURIComponent(
      `Hi Aoun! I just scheduled a ${meetingType || 'call'} for ${date} at ${timeSlot} via your portfolio website.\nName: ${name}\nEmail: ${email}\nLooking forward to speaking with you!`
    )}`;

    return NextResponse.json({
      success: true,
      message: 'Meeting scheduled successfully! Notification sent to Aoun.',
      booking: {
        name,
        email,
        date,
        timeSlot,
        meetingType,
        platform,
      },
      recipient: RECIPIENT_EMAIL,
      provider: providerUsed,
      googleCalendarUrl,
      whatsappConfirmation,
    });
  } catch (error: any) {
    console.error('Schedule API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to schedule meeting' },
      { status: 500 }
    );
  }
}

