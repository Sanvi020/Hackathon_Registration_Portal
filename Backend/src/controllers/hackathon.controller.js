const Hackathon = require("../models/hackathon.model");
const User = require("../models/user.models");
const {sendRegistrationEmail} = require("../utilities/mailer");

const registerHackathonController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      mobile,
      college,
      course,
      branch,
      year,
      domain,
      projectName,
      pptUrl,
      prototypeUrl,
      demoUrl,
      teamSize,
      teamMembers,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const existingRegistration = await Hackathon.findOne({ user: userId });

    if (existingRegistration) {
      return res.status(409).json({
        message: "You have already registered",
      });
    }

    if (
      !mobile ||
      !college ||
      !course ||
      !branch ||
      !year ||
      !domain ||
      !projectName ||
      !pptUrl ||
      !prototypeUrl ||
      !teamSize
    ) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        message: "Invalid Indian mobile number",
      });
    }

    if (projectName.trim().length < 5) {
      return res.status(400).json({
        message: "Project name must contain at least 5 characters",
      });
    }

    const size = Number(teamSize);

    if (!Number.isInteger(size) || size < 1 || size > 5) {
      return res.status(400).json({
        message: "Team size must be between 1 and 5",
      });
    }

    const members = teamMembers || [];

    if (!Array.isArray(members) || members.length !== size - 1) {
      return res.status(400).json({
        message: "Please provide details for all additional team members",
      });
    }

    const registration = await Hackathon.create({
      user: userId,
      fullName: user.fullName,
      email: user.email,
      mobile,
      college,
      course,
      branch,
      year,
      domain,
      projectName,
      pptUrl,
      prototypeUrl,
      demoUrl,
      teamSize: size,
      teamMembers: members,
    });

    let emailSent = true;

    try {
      await sendRegistrationEmail(user.email, user.fullName, projectName);
    } catch (emailError) {
      emailSent = false;
      console.error("Registration email failed:", emailError.message);
    }

    return res.status(201).json({
      message: "Hackathon registration successful!",
      emailSent,
      registration,
    });

  } catch (error) {
    console.error("Hackathon Registration Error:", error);

    return res.status(500).json({
      message: "Unable to complete registration",
    });
  }
};

const getMyEntryController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const registration = await Hackathon.findOne({
      user: userId,
    });

    if (!registration) {
      return res.status(404).json({
        message: "No hackathon registration found",
      });
    }

    return res.status(200).json({
      message: "Registration fetched successfully",
      registration,
    });
  } catch (error) {
    console.error("Get Registration Error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch registration",
    });
  }
};

module.exports = { registerHackathonController, getMyEntryController };
