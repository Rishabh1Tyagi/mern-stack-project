const mongoose = require("mongoose");

const contactInfoSchema = {
  basicInfo: {
    type: Object,
    required: true,
  },
  uploadDocs: {
    type: Array,
    required: true,
  },
};

const ContactInfo = mongoose.model("CONTACTINFO", contactInfoSchema);

module.exports = ContactInfo;
