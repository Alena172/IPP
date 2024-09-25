const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 8080
var cors = require('cors')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect('mongodb://localhost:27017/test', {
  }).then(() => {
    console.log('Successfully connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  const contactSchema = new mongoose.Schema({
      name: String,
      email: String,
      phone: String
  });

const Contact = mongoose.model('Contact', contactSchema);

app.get('/v1/contact', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

app.post('/v1/contact', async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
});

app.delete('/v1/contact', async (req, res) => {
    await Contact.deleteMany();
    res.status(204).end();
});

app.get('/v1/contact/:uid', async (req, res) => {
    const contact = await Contact.findById(req.params.uid);
    res.json(contact);
});

app.delete('/v1/contact/:uid', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.uid);
    res.status(204).end();
});

app.put('/v1/contact/:uid', async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.uid, req.body, { new: true });
    res.json(contact);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})