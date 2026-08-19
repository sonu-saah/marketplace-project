import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateSmartDescription = async (req, res) => {
  try {
    const { productName, brand, category, condition } = req.body;
    
    // API Key check
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API Key is missing");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // 🔥 Yahan 'gemini-pro' use kar rahe hain jo sabse stable hai
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Act as an expert marketplace assistant. 
    Product: ${productName}, Brand: ${brand}, Category: ${category}, Condition: ${condition}.
    Write a professional description (under 25 words).
    Return ONLY JSON: {"suggestedPrice": "1000", "description": "text here"}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");
    
    const parsedData = JSON.parse(jsonMatch[0]);

    res.status(200).json({ 
      success: true,
      suggestedPrice: String(parsedData.suggestedPrice),
      description: parsedData.description 
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
