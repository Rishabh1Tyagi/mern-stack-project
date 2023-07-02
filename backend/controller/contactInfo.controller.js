const express = require("express");

// import contact us schema
const ContactInfo = require("../schema/contactInfoSchema");

const router = express.Router();

// post query for ContactInfos
router.post("/register", async (req, res) => {
  try {
    const ContactInfos = new ContactInfo({
      basicInfo: req.body.basicInfo,
      uploadDocs: req.body.uploadDocs,
    });
    const NewContactInfos = await ContactInfos.save();
    return res.status(200).json(NewContactInfos);
  } catch (err) {
    console.log(err, "error");
    return res.status(500).json({ error: err.message });
  }
});

router.get("/id", async (req, res) => {
  try {
    const GetContactInfos = await ContactInfo.findOne({
      firstname: req.query.firstname,
    });
    res.json(GetContactInfos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/contactInfo/get", async (req, res) => {
  try {
    const ContactInfosOne = await ContactInfo.findOne(req.params.firstname);
    console.log(ContactInfosOne);
    if (!ContactInfosOne?.error) {
      return res.json(ContactInfosOne);
    }
    return res.status(400).json(ContactInfosOne);
  } catch (err) {
    return res.status(500).json({
      message: err?.message ? err?.message : "cannot get ContactInfos ",
    });
  }
});

router.get("/getContactInfo", async (req, res) => {
  try {
    const ContactInfosOne = await ContactInfo.find();
    return res.json(ContactInfosOne);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.put("/contactInfo/update", async (req, res) => {
  try {
    const UpdateContactInfo = await ContactInfo.findOneAndUpdate(
      req.body.firstname,
      req.body
    );
    return res.json(UpdateContactInfo);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// delete for  ContactInfos
router.delete("/contactInfo/:delete", async (req, res) => {
  try {
    const DeleteJobsData = await Journey.findOne({
      firstname: req.params.firstname,
    });
    await DeleteJobsData.deleteOne();
    res.json({ message: "Contact Info has been deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
