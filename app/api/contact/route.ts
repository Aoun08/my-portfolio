import { NextResponse } from 'next/server';
import { generateContactEmailHtml } from '@/lib/email-templates';

export const dynamic = 'force-dynamic';

const RECIPIENT_EMAIL = 'aounr3292@gmail.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, service, budget, message } = body;
    const name = body.name || [firstName, lastName].filter(Boolean).join(' ') || 'Website Visitor';

    // Validation
    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: 'Email and message are required.' },
        { status: 400 }
      );
    }

    const emailHtml = generateContactEmailHtml({
      name,
      email,
      phone,
      service,
      budget,
      message,
    });

    let sentSuccessfully = false;
    let providerUsed = 'none';
    let needsActivation = false;
    let providerMessage = '';

    // 1. Try Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>',
            to: [RECIPIENT_EMAIL],
            reply_to: email,
            subject: `⚡ New Portfolio Message from ${name}`,
            html: emailHtml,
          }),
        });

        if (resendRes.ok) {
          sentSuccessfully = true;
          providerUsed = 'resend';
        }
      } catch (err) {
        console.error('Resend delivery failed:', err);
      }
    }

    // 2. Try Web3Forms if configured
    if (!sentSuccessfully && process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            subject: `⚡ Portfolio Message from ${name}`,
            from_name: name,
            to: RECIPIENT_EMAIL,
            email: email,
            message: message,
            html: emailHtml,
          }),
        });

        const web3Data = await web3Res.json();
        if (web3Res.ok && web3Data.success) {
          sentSuccessfully = true;
          providerUsed = 'web3forms';
        }
      } catch (err) {
        console.warn('Web3Forms delivery attempt:', err);
      }
    }

    // 3. Try FormSubmit.co (Direct delivery to aounr3292@gmail.com)
    if (!sentSuccessfully) {
      try {
        const origin = request.headers.get('origin') || 'http://localhost:3000';
        const referer = request.headers.get('referer') || 'http://localhost:3000';

        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Origin: origin,
            Referer: referer,
          },
          body: JSON.stringify({
            _subject: `⚡ New Portfolio Message from ${name}`,
            _template: 'box',
            _captcha: 'false',
            name: name,
            email: email,
            phone: phone || 'Not provided',
            service: service || 'General Inquiry',
            budget: budget || 'Not specified',
            message: message,
          }),
        });

        const fsJson = await formSubmitRes.json();
        if (formSubmitRes.ok && (fsJson.success === 'true' || fsJson.success === true)) {
          sentSuccessfully = true;
          providerUsed = 'formsubmit';
        } else if (fsJson.message && typeof fsJson.message === 'string' && fsJson.message.toLowerCase().includes('activation')) {
          needsActivation = true;
          providerMessage = fsJson.message;
        } else if (fsJson.message) {
          providerMessage = fsJson.message;
        }
      } catch (err: any) {
        console.warn('FormSubmit delivery attempt failed:', err);
      }
    }

    // Fallback URL links
    const encodedSubject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
    const whatsappUrl = `https://wa.me/923014981629?text=${encodeURIComponent(
      `Hi Aoun! My name is ${name} (${email}).\nMessage: ${message}`
    )}`;

    if (sentSuccessfully) {
      return NextResponse.json({
        success: true,
        message: 'Message delivered directly to aounr3292@gmail.com!',
        recipient: RECIPIENT_EMAIL,
        provider: providerUsed,
      });
    }

    if (needsActivation) {
      return NextResponse.json({
        success: false,
        needsActivation: true,
        message: "FormSubmit needs one-time activation. An activation email has been sent to aounr3292@gmail.com. Please open Gmail (Inbox / Spam / Junk) and click 'Activate Form'.",
        recipient: RECIPIENT_EMAIL,
        fallbackMailto: mailtoUrl,
        fallbackWhatsApp: whatsappUrl,
      });
    }

    return NextResponse.json({
      success: false,
      message: providerMessage || 'Could not deliver automatically. Fallback options available.',
      fallbackMailto: mailtoUrl,
      fallbackWhatsApp: whatsappUrl,
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process message' },
      { status: 500 }
    );
  }
}
