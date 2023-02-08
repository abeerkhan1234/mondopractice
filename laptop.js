const mongoose = require("mongoose")

const laptopSchema = new mongoose.Schema({
    name:String,
    brand:String,
    price:String,
    specs:String
})

module.exports = mongoose.model("Laptops",laptopSchema)