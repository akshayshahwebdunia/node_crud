const mongoose = require("mongoose");
//create schema
Schema=mongoose.Schema;
const EventSchema = new Schema({
  name: String,
  slug: {
    type: String,
    unique: true,
  },
  description: String,
});

//Middleware
EventSchema.pre("save", function (next) {
    this.slug=convertToSlug(this.name);
    next();
});

//creating the model
const eventModel = mongoose.model("Event", EventSchema);

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}
//export the module

module.exports = eventModel;
