import ai from "../config/gemini.js";

export const suggestReply = async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
      Suggest 3 short dating app replies for:
      "${message}"

      Return only the replies.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    return res.status(200).json({
      success: true,
      suggestions: response.text
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};