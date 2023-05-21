const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
const sha1 = require("sha1");
// Where we will keep personal Information about a patient
let patients = [
  {
    ssn: "0001",
    name: "Ammar Hassan",
    address: "House no 100/3, Block C, Satellite town\t",
    phone: "03216026940\t",
    doctor: "2002",
    meta: "e60c76a3a53a7fc7d4bcf5ab63ded85b03be628e",
  },
  {
    ssn: "0002",
    name: "Saad Faisal",
    address: "S14 Satellite town",
    phone: "03215802584",
    doctor: "2001",
    meta: "aaad42beadef69cb64bd9d93e6ce9dda2e56143a",
  },
  {
    ssn: "0003",
    name: "Faisal Mukhtar",
    address: "New city, Lahore",
    phone: "03245689547",
    doctor: "2003",
    meta: "48efa8448804e9fcea6559b5b67d61d13d5def84",
  },
];
let admin = [
  {
    ssn: "0001",
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

app.post("/addpatients", (req, res) => {
  const per = req.body;
  const meta = sha1(JSON.stringify(per));
  console.log(meta);
  per.meta = meta;
  console.log(per);
  patients.push(per);
  console.log(patients);
  res.send("Patient is added to the database");
});

app.get("/patients", (req, res) => {
  res.json(patients);
});

app.get("/admin", (req, res) => {
  res.json(admin);
});

app.listen(port, () => console.log(`Patients API listening on ${port}!`));
