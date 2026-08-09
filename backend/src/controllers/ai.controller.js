import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateSmartDescription = async (req, res) => {
  try {
    const { productName } = req.body;

    if (!productName) {
      return res.status(400).json({ message: "Product name is required for AI" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // 👇 YAHAN HAI MAGIC: Humne Google ka latest model daal diya hai jo aapke dashboard mein tha!
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `I am building a resale marketplace. Write a short, attractive, and professional product description for an item named: "${productName}". Also suggest a reasonable second-hand selling price in INR (₹). Keep the whole response strictly under 50 words.`;

    const result = await model.generateContent(prompt);
    const aiResponseText = result.response.text();

    res.status(200).json({ 
      success: true,
      aiSuggestion: aiResponseText 
    });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "Error generating AI content", error: error.message });
  }
};