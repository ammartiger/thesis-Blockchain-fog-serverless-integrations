const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;
const sha1 = require("sha1");
// Where we will keep personal Information about a patient
let doctors = [
  {
    ssn: "2001",
    name: "Ammar Hassan",
    address: "House no 100/3, Block C, Satellite town",
    phone: "03216026940",
    meta: "4710f87f4cf37056fd0c872b009fd8d3badb0d41",
  },
  {
    ssn: "2002",
    name: "Saad Faisal",
    address: "S14  Satellite town",
    phone: "03215802584",
    meta: "13474f33e6eaea16b7e0c109a337d16d74045743",
  },
  {
    ssn: "2003",
    name: "Faisal Mukhtar",
    address: "New city, Lahore",
    phone: "03245689547",
    meta: "a93834912fb617845c70112290b12170d94cf19c",
  },
];
let admin = [
  {
    ssn: "1001",
    name: "Saim Hassan",
    address: "House no 75, Block A, Satellite town",
    phone: "03356025874",
  },
];
for (let f of admin) {
  const adminMeta = sha1(JSON.stringify(f));
  f.meta = adminMeta;
}
console.log(admin);

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/adddoctors", (req, res) => {
  const per = req.body;
  const meta = sha1(JSON.stringify(per));
  console.log(meta);
  per.meta = meta;
  console.log(per);
  doctors.push(per);
  console.log(doctors);
  res.send("Doctor is added to the database");
});

app.get("/doctors", (req, res) => {
  res.json(doctors);
});

app.get("/admin", (req, res) => {
  res.json(admin);
});

let phi = [
  {
    ssn: "0001",
    name: "Ammar Hassan",
    Diseases: "Fever",
    healthPlan: "Annual",
    responsibleClinician: "2002",
    payment: "Credit card",
    meta: "5c0f89f42a84c6425afed749999d8f3622e41bc4",
  },
  {
    ssn: "0002",
    name: "Saad Faisal",
    Diseases: "Aids",
    healthPlan: "Monthly",
    responsibleClinician: "2001",
    payment: "Cheque",
    meta: "4fd826ee9f7e8bae6446a580e8ec8a29d0554cec",
  },
];
app.post("/addpatientshealthdata", (req, res) => {
  const per = req.body;
  const meta = sha1(JSON.stringify(per));
  console.log(meta);
  per.meta = meta;
  console.log(per);
  phi.push(per);
  console.log(phi);
  res.send("Personal Health Data is added to the database");
});

app.get("/viewpatientshealthdata", (req, res) => {
  res.json(phi);
});

let prescriptions = [
  {
    ssn: "0001",
    name: "Ammar Hassan",
    Disease: "fever",
    prescription: "panador",
    Clinician: "2002",
    meta: "3861bb2940258c8df56eb30bb39ce46c29e33181",
  },
  {
    ssn: "0002",
    name: "Saad Faisal",
    Disease: "stomach upset",
    prescription: "flagyl",
    Clinician: "2001",
    meta: "a1529ffb6705ca240834d9fc8507a2dbdd7b19e2",
  },
];
app.post("/addprescriptions", (req, res) => {
  const per = req.body;
  const meta = sha1(JSON.stringify(per));
  console.log(meta);
  per.meta = meta;
  console.log(per);
  prescriptions.push(per);
  console.log(prescriptions);
  res.send("prescription added to the database");
});

app.get("/viewprescriptions", (req, res) => {
  res.json(prescriptions);
});

app.get("/viewpatientshealthdata/:ssn", (req, res) => {
  // Reading ssn from the URL
  const ssn = req.params.ssn;

  // Searching books for the isbn
  for (let ph of phi) {
    if (ph.ssn === ssn) {
      res.json(ph);
      return;
    }
  }

  // Sending 404 when not found something is a good practice
  res.status(404).send("Patient not found");
});

app.get("/viewprescriptions/:ssn", (req, res) => {
  // Reading ssn from the URL
  const ssn = req.params.ssn;

  // Searching books for the isbn
  for (let ph of prescriptions) {
    if (ph.ssn === ssn) {
      res.json(ph);
      return;
    }
  }

  // Sending 404 when not found something is a good practice
  res.status(404).send("Patient not found");
});

app.listen(port, () => console.log(`Doctors API listening on ${port}!`));
