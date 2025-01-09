const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const validator = require('validator');

const app = express();
const PORT = process.env.PORT || 5000;
const TELEGRAM_BOT_TOKEN = '7976515849:AAFKO3ANTB1rhYNLJvH91204Ni8T9Zu2-98';
const CHAT_ID = '911010771';

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Hi, I back-end Voronkov</h1>')
});

app.post('/submit-form', async (req, res) => {
  const { email, price } = req.body;

  if (!email || !price) {
    return res.status(400).json({ success: false, message: 'Email and price are required.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email.' });
  }

  const text = `Нова заявка:\nEmail: ${email}\nВибраний план: $${price}`;

  try {
    const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: text,
    });
    res.status(200).json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send message to Telegram.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
