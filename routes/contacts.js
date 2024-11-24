const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Получение всех контактов
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Создание нового контакта
router.post('/', async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });

    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Получение контакта по ID
router.get('/:id', getContact, (req, res) => {
    res.json(res.contact);
});

// Обновление контакта
router.patch('/:id', getContact, async (req, res) => {
    if (req.body.name != null) {
        res.contact.name = req.body.name;
    }
    if (req.body.phone != null) {
        res.contact.phone = req.body.phone;
    }
    if (req.body.email != null) {
        res.contact.email = req.body.email;
    }

    try {
        const updatedContact = await res.contact.save();
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Удаление контакта
router.delete('/:id', getContact, async (req, res) => {
    try {
        await res.contact.deleteOne();
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware для получения контакта по ID
async function getContact(req, res, next) {
    let contact;
    try {
        contact = await Contact.findById(req.params.id);
        if (contact == null) {
            return res.status(404).json({ message: 'Cannot find contact' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.contact = contact;
    next();
}

module.exports = router;
