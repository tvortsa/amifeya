// Mongo/mongoose DB init and connect
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const aminoSchema = new Schema({
    id: String,
    name: String,
    link: String,
    icon: String,
    tagline: String,
    createdTime: Date
});

//экспортируется функция для создания класса модели "SomeModel"
module.exports = mongoose.model('AminoModel', aminoSchema);