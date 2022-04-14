const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/clients", (req, res) => {
  res.render("clients");
});

app.get("/career", (req, res) => {
  res.render("career", { msg: "" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { msg: "" });
  console.log(process.env.USER);
});

app.get("/services/manpower-supplies", (req, res) => {
  res.render("manpower-supplies");
});

app.get("/services/rental-equipment-service", (req, res) => {
  res.render("rental-equipment-service");
});

app.get("/services/trading", (req, res) => {
  res.render("trading");
});

app.get("/services/general-contracting", (req, res) => {
  res.render("general-contracting");
});

app.get("/services/transportation", (req, res) => {
  res.render("transportation");
});

app.get("/services/office-supplies", (req, res) => {
  res.render("office-supplies");
});

app.get("/services/catering-service", (req, res) => {
  res.render("catering-service");
});

app.get("/services/information-technology", (req, res) => {
  res.render("information-technology");
});

app.post("/career", upload.single("file"), (req, res) => {
  var data = req.body;
  console.log(req.body);
  console.log(req.file);

  const output = `<p>You have a new contact request,</p>
  <h3>Contact Details</h3>
  <ul>
    <p>Name: ${data.name}</p>
    <p>Email: ${data.email}</p>
    <p>Phone: ${data.phone}</p>
  </ul>
  <h3>Message</h3>
  <p>${data.message}</p>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  const info = transporter.sendMail({
    from: `${data.name} "<uproksa.contact@gmail.com>"`, // sender address
    to: "admin@uproksa.com", // list of receivers
    subject: data.subject, // Subject line
    text: "Contact", // plain text body
    html: output, // html body
    attachments: [
      {
        filename: req.file.originalname,
        path: req.file.path,
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.render("career", { msg: "mail sent succesfully" });
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  let data = req.body;

  const output = `<p>You have a new contact request,</p>
  <h3>Contact Details</h3>
  <ul>
    <p>Name: ${data.name}</p>
    <p>Email: ${data.email}</p>
    <p>Phone: ${data.phone}</p>
  </ul>
  <h3>Message</h3>
  <p>${data.message}</p>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
      tls: {},
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  const info = transporter.sendMail({
    from: `${data.name} "<uproksa.contact@gmail.com>"`, // sender address
    to: "admin@uproksa.com", // list of receivers
    subject: data.subject, // Subject line
    text: "Contact", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.render("contact", { msg: "mail sent succesfully" });
});

app.post("/quote", (req, res) => {
  console.log(req.body);

  let data = req.body;

  const output = `<p>You have a new contact request,</p>
  <h3>Contact Me Please</h3>
  <ul>
    <p>Name: ${data.name}</p>
    <p>Email: ${data.email}</p>
    <p>Phone: ${data.phone}</p>
  </ul>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  const info = transporter.sendMail({
    from: `${data.name} "<uproksa.contact@gmail.com>"`, // sender address
    to: "admin@uproksa.com", // list of receivers
    subject: "Query", // Subject line
    text: "Contact", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.render("home");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started at port 3000");
});
