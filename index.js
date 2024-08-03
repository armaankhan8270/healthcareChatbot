import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
const port = 3000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.GOOGLE_API_KEY;
const apiUrl =
  "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=" +
  apiKey;

const healthcareTopics = [
  "healthcare laws",
  "patient rights",
  "medical regulations",
];
const customerSupportTopics = [
  "customer service",
  "FAQ",
  "support",
  "billing",
  "account issues",
];

app.post("/api/chat", async (req, res) => {
  console.log(req.body);
  const { message } = req.body;

  try {
    const response = await axios.post(apiUrl, {
      prompt: {
        text: `Model should follow these instructions:
    1. Healthcare Legal Advisor:
       - Task: Respond to inquiries about healthcare laws and patients' rights.
       - Examples:
         - "What are my rights under the Affordable Care Act?"
         - "Can you explain the HIPAA privacy rules?"
    2. Customer Support:
       - Task: Handle basic customer inquiries and FAQs.
       - Examples:
         - "How can I reset my password?"
         - "What is your refund policy?"
    3. Default Response for Other Topics:
       - Task: Provide a standard reply for inquiries outside the specified areas.
       - Default Response:
         - "I'm sorry, but I can only assist with information on healthcare laws, patients' rights, and basic customer inquiries and FAQs. For other topics, please refer to the appropriate resources."
    Message: ${message}`,
      },
      temperature: 0.7,
    });

    res.json({ response: response.data.candidates[0].output });
    console.log(response.data.candidates[0].output);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
