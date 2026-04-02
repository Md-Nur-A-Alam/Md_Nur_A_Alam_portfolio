import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendContactEmail = async ({ name, email, subject, message }) => {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      from_name:    name,
      from_email:   email,
      subject:      subject,
      message:      message,
      to_name:      'Nur',
      reply_to:     email,
    }
  );
};
