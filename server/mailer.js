const nodemailer = require('nodemailer');
const { pendingWishes } = require('./data');

const SENDER_EMAIL = 'do_not_reply@northpole.com';
const RECIPIENT_EMAIL = 'santa@northpole.com';
const SUBJECT = `Santa's Pending Wishes!`;
const getEmailMessage = () => {
  const wishes = pendingWishes.map(
    (wish, idx) =>
      `${idx + 1}. ${wish.username} from '${wish.address}' wants "${wish.wish}"`
  );
  return `
    Dear Santa, 
    
    You have pending wishes!
    
    ${wishes.join('\n')}
  `;
};

const startMailer = () =>
  nodemailer.createTestAccount((error, account) => {
    console.log('Mailer started...');

    if (error) {
      console.error('Failed to create a testing account. ' + error.message);
      return process.exit(1);
    }

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const mailOptions = {
      from: SENDER_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: SUBJECT,
    };

    const sendEmail = () => {
      console.log('Sending email...');
      const options = { ...mailOptions, text: getEmailMessage() };
      transporter.sendMail(options, (error, info) => {
        if (error) {
          console.error('An error occurred: ', error.message);
          return process.exit(1);
        }
        const url = nodemailer.getTestMessageUrl(info);
        console.log('Message sent! Preview URL: %s', url);
      });
    };

    setInterval(sendEmail, 15000);
  });

module.exports = { startMailer };
