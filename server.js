const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const firebaseConfig = require("./firebaseConfig");
const cors = require("cors")
const nodemailer = require('nodemailer');

const app = express();

app.use(cors())

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: firebaseConfig.databaseURL
});

// Create a reference to the Firebase Realtime Database
const db = admin.database();

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Define an API endpoint to create new user records
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Create a new record in the "users" collection
    const ref = db.ref("users");
    const newRecordRef = ref.push({ name, email });

    // Return the ID of the new record
    res.json({ id: newRecordRef.key });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Define your API endpoint to get all projects
app.get('/getMyDetails', async (req, res) => {
  try {
    const projectsRef = admin.database().ref('myDetails');
    const snapshot = await projectsRef.once('value');
    const projects = snapshot.val();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

//socialLinks
app.get('/socialLinks', async (req, res) => {
  try {
    const projectsRef = admin.database().ref('socialLinks');
    const snapshot = await projectsRef.once('value');
    const projects = snapshot.val();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Define your API endpoint to get all projects
app.get('/getMyProjects', async (req, res) => {
  try {
    const projectsRef = admin.database().ref('myProjects');
    const snapshot = await projectsRef.once('value');
    const projects = snapshot.val();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Define your API endpoint to get a specific project's details
app.get('/getMyProjects/:Id', (req, res) => {
  const Id = req.params.Id;

  db.ref('myProjects/').orderByChild('Id').equalTo(Id).once('value')
    .then(snapshot => {
      const users = snapshot.val();
      const user = Object.values(users)[0];
      if (!users) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error getting user');
    });
});




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Handle form submission
const mailgun = require('mailgun-js')({
  apiKey: '81f79ddaf1273741fde1eb88df810413-2cc48b29-eec0bbaa',
  domain: 'sandbox5bdfe2a16b954bd59b9e96f8afbf9a8b.mailgun.org'
});
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const data = {
    from: `${name} ${email}`,
    to: 'websiteuse01@gmail.com',
    subject: 'New Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log(body);
      res.send('Email sent successfully');
    }
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
