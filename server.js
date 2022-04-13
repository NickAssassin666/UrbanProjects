const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

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
  res.render("career");
});

app.get("/contact", (req, res) => {
  res.render("contact");
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

app.post("/career/sent-email", (req,res) => {
  res.send("mail sent");
})

app.post("/career/sent-email", (req,res) => {
  res.send("mail sent");
})

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log("Server started at port 3000");
});
