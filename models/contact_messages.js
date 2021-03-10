const mongoose = require('mongoose');

//comment user dateofcreation video likes dislikes
const contactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: String
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;