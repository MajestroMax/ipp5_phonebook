const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT;

// Подключение к MongoDB Atlas
mongoose.connect('mongodb+srv://maxqwerty177:8UrFzLcXUHWds7Vh@cluster0.hqdp9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.json());

// Маршруты
app.use('/api/contacts', contactsRouter);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
