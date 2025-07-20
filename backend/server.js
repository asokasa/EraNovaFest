require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// MongoDB setup
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

// MongoDB Program model
const Program = mongoose.model("Program", new mongoose.Schema({
  date: String,
  time: String,
  title: String,
  description: String,
  imageUrl: String
}));

// 🔐 Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// 🔐 Example protected endpoint
app.get("/api/admin-data", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    res.json({ message: "Welcome to admin panel!", secretData: "🎉" });
  });
});

// 📤 Upload festival program
app.post("/api/programs", upload.single("image"), async (req, res) => {
  try {
    const { date, time, title, description } = req.body;

    if (!req.file) return res.status(400).json({ error: "No image provided" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "festival_programs"
    });

    const program = new Program({
      date,
      time,
      title,
      description,
      imageUrl: result.secure_url
    });

    await program.save();

    res.json({ message: "✅ Program saved!", program });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.get("/api/programs", async (req, res) => {
  try {
    const programs = await Program.find().sort({ date: 1, time: 1 });
    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch programs" });
  }
});

app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));