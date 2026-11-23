import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import { Application } from "./models/application.model.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  await connectDB();

  try {
    await Application.deleteMany({});
    await Job.deleteMany({});
    await Company.deleteMany({});
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("Password@123", 10);

    // 1. Users (Recruiter & Student)
    const recruiter = await User.create({
      fullname: "Aarav Sharma",
      email: "recruiter@jobportal.com",
      phoneNumber: 9876543210,
      password: hashedPassword,
      role: "recruiter",
      profile: {
        bio: "Hiring engineering talent across India.",
        skills: ["Recruitment", "Tech Screening", "Team Building"],
        profilePhoto: ""
      }
    });

    const student = await User.create({
      fullname: "Rohit Kumar",
      email: "student@jobportal.com",
      phoneNumber: 9876543211,
      password: hashedPassword,
      role: "student",
      profile: {
        bio: "Full-stack MERN developer building clean and scalable web apps.",
        skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        resume: "",
        resumeOriginalName: ""
      }
    });

    // 2. Companies across filter locations
    const companies = await Company.insertMany([
      {
        name: "NorthStar Tech Labs",
        description: "Product engineering company building modern web platforms.",
        website: "https://northstartech.example.com",
        location: "Delhi NCR",
        logo: "",
        userId: recruiter._id
      },
      {
        name: "CodeCraft Bangalore",
        description: "Frontend and full-stack product studio.",
        website: "https://codecraft.example.com",
        location: "Bangalore",
        logo: "",
        userId: recruiter._id
      },
      {
        name: "Deccan Cloud Systems",
        description: "Backend and distributed systems team.",
        website: "https://deccancloud.example.com",
        location: "Hyderabad",
        logo: "",
        userId: recruiter._id
      },
      {
        name: "Western Stack Solutions",
        description: "Full-stack SaaS and enterprise solutions provider.",
        website: "https://westernstack.example.com",
        location: "Pune",
        logo: "",
        userId: recruiter._id
      },
      {
        name: "Harbour Digital Works",
        description: "Digital product agency focused on fast UI and APIs.",
        website: "https://harbourdigital.example.com",
        location: "Mumbai",
        logo: "",
        userId: recruiter._id
      }
    ]);

    recruiter.profile.company = companies[0]._id;
    await recruiter.save();

    // 3. Jobs matching Location, Industry & Salary filters
    const jobs = await Job.insertMany([
      {
        title: "Frontend Developer",
        description: "Build responsive React interfaces with clean component architecture.",
        requirements: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
        salary: 35000,
        experienceLevel: 1,
        location: "Bangalore",
        jobType: "Full-Time",
        position: 3,
        company: companies[1]._id,
        created_by: recruiter._id
      },
      {
        title: "Backend Developer",
        description: "Develop REST APIs, authentication, and database schemas with Node.js and MongoDB.",
        requirements: ["Node.js", "Express", "MongoDB", "JWT"],
        salary: 65000,
        experienceLevel: 2,
        location: "Hyderabad",
        jobType: "Full-Time",
        position: 2,
        company: companies[2]._id,
        created_by: recruiter._id
      },
      {
        title: "FullStack Developer",
        description: "Work across React frontend and Node/Express/MongoDB backend modules.",
        requirements: ["MongoDB", "Express", "React", "Node.js"],
        salary: 150000,
        experienceLevel: 2,
        location: "Delhi NCR",
        jobType: "Full-Time",
        position: 2,
        company: companies[0]._id,
        created_by: recruiter._id
      },
      {
        title: "Frontend Developer",
        description: "Create accessible UI components and smooth user workflows.",
        requirements: ["React", "TypeScript", "CSS"],
        salary: 28000,
        experienceLevel: 0,
        location: "Mumbai",
        jobType: "Internship",
        position: 4,
        company: companies[4]._id,
        created_by: recruiter._id
      },
      {
        title: "FullStack Developer",
        description: "Build end-to-end features with modern JS tooling and clean state management.",
        requirements: ["React", "Node.js", "MongoDB", "Git"],
        salary: 85000,
        experienceLevel: 1,
        location: "Pune",
        jobType: "Full-Time",
        position: 2,
        company: companies[3]._id,
        created_by: recruiter._id
      }
    ]);

    // 4. Sample Application
    const application = await Application.create({
      job: jobs[0]._id,
      applicant: student._id,
      status: "pending"
    });

    jobs[0].applications.push(application._id);
    await jobs[0].save();

    console.log("Seed data inserted successfully!");
    console.log("Recruiter -> email: recruiter@jobportal.com | password: Password@123");
    console.log("Student   -> email: student@jobportal.com   | password: Password@123");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();