import Groq from "groq-sdk";
import dotenv from "dotenv";
import courseModel from "../model/courseModel.js";

dotenv.config();

// ✅ Initialize once, reuse on every request
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // NORMAL SEARCH FIRST
    let courses = await courseModel.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: "i" } },
        { subTitle: { $regex: input, $options: "i" } },
        { description: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
        { level: { $regex: input, $options: "i" } },
      ],
    });

    if (courses.length > 0) {
      return res.status(200).json({ success: true, courses });
    }

    // ============================
    // GROQ AI FALLBACK
    // ============================
    const prompt = `You are an intelligent assistant for an LMS platform.

Choose ONLY ONE keyword from:
- App Development
- AI/ML
- AI Tools
- Data Science
- Data Analytics
- Ethical Hacking
- UI UX Designing
- Web Development
- Others
- Beginner
- Intermediate
- Advanced

Reply with ONLY one keyword. No explanation. No extra text.

Query: ${input}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      max_tokens: 20, 
      messages: [{ role: "user", content: prompt }],
    });

    const keyword = completion.choices[0].message.content.trim();
    //console.log("AI Keyword:", keyword);

    // AI KEYWORD SEARCH
    courses = await courseModel.find({
      isPublished: true,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { subTitle: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { level: { $regex: keyword, $options: "i" } },
      ],
    });
    //console.log(courses);

    return res.status(200).json(courses);

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search",
    });
  }
};