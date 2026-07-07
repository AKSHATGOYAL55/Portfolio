import { Router } from "express";
import { body, validationResult } from "express-validator";
import Contact from "../models/Contact.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post(
  "/",
  contactLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
    body("email").trim().isEmail().withMessage("A valid email is required").normalizeEmail(),
    body("message").trim().notEmpty().withMessage("Message is required").isLength({ max: 2000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    try {
      const { name, email, message } = req.body;
      const contact = await Contact.create({ name, email, message });
      return res.status(201).json({
        message: "Message received. Thank you!",
        id: contact._id,
      });
    } catch (err) {
      console.error("Contact save error:", err.message);
      return res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  }
);

// Simple endpoint to list messages (protect this in production with auth!)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
    return res.json(contacts);
  } catch (err) {
    return res.status(500).json({ error: "Could not fetch messages." });
  }
});

export default router;
