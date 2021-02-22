const Lead = require('./models/lead.model');

const leads = await Lead.find({});

const nodemailer = require('nodemailer');

const mail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SPORTIZEN</title>

    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <style>
      .header-logo {
        width: 50%;
      }

      .dark {
        background-color: #000;
        color: #fff;
      }

      /* POINTER */
      .pointer {
        cursor: pointer;
      }

      /* FOOTER */

      footer {
        background-color: #333;
        padding: 25px 0;
      }

      .footer-nav {
        list-style: none;
        float: left;
      }

      /* FOOTER LINKS */

      .social-links {
        list-style: none;
      }

      .footer-nav li,
      .social-links li {
        display: inline-block;
        margin-right: 20px;
      }

      .footer-nav li:last-child,
      .social-links li:last-child {
        margin-right: 0;
      }

      .footer-nav li a:link,
      .footer-nav li a:visited,
      .social-links li a:link,
      .social-links li a:visited {
        text-decoration: none;
        border: 0;
        color: #999;
        -webkit-transition: color 0.2s;
        transition: color 0.2s;
      }

      .social-links li a:link,
      .social-links li a:visited {
        font-size: 180%;
      }

      .footer-nav li a:hover,
      .footer-nav li a:active,
      .social-links li a:hover,
      .social-links li a:active {
        color: #eee;
      }

      .fa-facebook,
      .fa-twitter,
      .fa-instagram,
      .fa-linkedin {
        -webkit-transition: color 0.2s;
        transition: color 0.2s;
      }

      .fa-facebook:hover {
        color: #3b5998;
      }

      .fa-twitter:hover {
        color: #61b2f8;
      }

      .fa-instagram:hover {
        color: #cd486b;
      }

      .fa-linkedin:hover {
        color: #0073b1;
      }

      /* FOOTER CONTENT */

      .copyright {
        color: #ccc;
        text-align: center;

        font-size: 90%;
        margin-top: 1rem;
      }

      .developer {
        color: #ccc;
        text-align: right;
        font-size: 75%;
        margin-top: 1rem;
      }
    </style>
  </head>
  <body>
    <header class="dark">
      <div class="container">
        <div class="row py-5 px-2">
          <div class="col-12 text-center">
            <img
              class="header-logo"
              src="https://s3.ap-south-1.amazonaws.com/shubhammore.developer/shared/White.png"
              alt="SPORTIZEN"
            />
          </div>
        </div>
      </div>
    </header>
    <section>
      <div class="container">
        <div class="row p-3">
          <div class="col-12">
            <p class="mail-text">
              Hey [name],
              <br />
              <br />
              I’m [name], the founder of [company name] and I’d like to personally thank you for
              signing up to our service.
              <br />
              <br />

              We established [company name] in order to [mission/values of company].
              <br />
              <br />

              I’d love to hear what you think of [product] and if there is anything we can improve.
              If you have any questions, please reply to this email. I’m always happy to help!
              <br />
              <br />

              [name]
              <br />
              <br />

              The above template is best used soon after a customer makes their first purchase,
              preferably after a purchase confirmation email has been sent. By establishing a warm,
              personal tone, this email helps you to spark an initial interaction with your
              customer.
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="row">
        <div class="col-10 mx-auto text-center">
          <ul class="social-links">
            <li>
              <a href="https://www.facebook.com/Sportizen-352682545821391"
                ><i class="fa fa-facebook"></i
              ></a>
            </li>
            <li>
              <a href="https://twitter.com/_sportizen_"><i class="fa fa-twitter"></i></a>
            </li>
            <li>
              <a href="https://www.instagram.com/_sportizen_/"><i class="fa fa-instagram"></i></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/sportizen"
                ><i class="fa fa-linkedin"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p class="copyright">
            Copyright &copy; 2020 by SPORTIZEN SPORT SOLUTION LLP - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  </body>
</html>

`;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'contact@sportizen.in',
    pass: 'jJSpRIPiarzu',
  },
});

const mailOptions = {
  from: 'contact@sportizen.in', // sender address
  to: 'shubhammore1796@gmail.com', // list of receivers
  subject: 'Test', // Subject line
  // generateTextFromHTML: true,
  html: mail, // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    return console.log(error);
  }

  console.log('Message sent: ' + info.response);
});
