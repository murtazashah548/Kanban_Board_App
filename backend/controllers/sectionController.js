const Section = require("../models/sectionModel");

exports.createSection = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Section title is required" });
    }

    const section = await Section.create({ title });
    res.status(201).json({
      message: "Section created successfully",
      data: section,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json({
      message: "Sections fetched successfully",
      data: sections,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
