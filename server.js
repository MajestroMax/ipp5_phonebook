const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/phonebook', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());

// Маршруты
app.use('/api/contacts', contactsRouter);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
