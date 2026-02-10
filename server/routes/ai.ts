import { RequestHandler } from "express";
import { ContentBlock } from "@shared/api"; // I should check if @shared/api has ContentBlock

// Since I don't have the shared types in server easily, I'll define a local version or use any
export const handleAIEmailTemplate: RequestHandler = (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // This is a simulated AI response. 
  // In a real production app, you would call OpenAI/Gemini here.
  
  let blocks: any[] = [];
  let message = "I've generated a template for you.";

  const promptLower = prompt.toLowerCase();

  if (promptLower.includes("image") && (promptLower.includes("hero") || promptLower.includes("header"))) {
    message = "I've added the requested image to your hero section.";
    blocks = [
      {
        type: "image",
        id: `ai-${Date.now()}-1`,
        src: "https://cdn.builder.io/api/v1/image/assets%2F29e1153dc01141dc90b150d02a5a23e3%2F28ab786bd5ec4988b4be0f78bf7534d4?format=webp&width=800&height=1200",
        alt: "Hero Image",
        width: 100,
        widthUnit: "%",
        padding: 0,
      },
      {
        type: "title",
        id: `ai-${Date.now()}-2`,
        content: "Elevate Your Brand",
        fontSize: 36,
        alignment: "center",
        padding: 20,
      }
    ];
  } else if (promptLower.includes("welcome") || promptLower.includes("onboarding")) {
    message = "Here is a professional welcome email template.";
    blocks = [
      {
        type: "title",
        id: `ai-${Date.now()}-1`,
        content: "Welcome to Our Community!",
        fontSize: 32,
        fontColor: "#1a1a1a",
        alignment: "center",
        fontWeight: "bold",
        padding: 20,
      },
      {
        type: "text",
        id: `ai-${Date.now()}-2`,
        content: "We're thrilled to have you here. This journey is just beginning, and we can't wait to show you what we've built for you.",
        fontSize: 16,
        fontColor: "#4a4a4a",
        alignment: "center",
        padding: 20,
      },
      {
        type: "button",
        id: `ai-${Date.now()}-3`,
        text: "Get Started Now",
        link: "https://example.com",
        backgroundColor: "#FF6A00",
        textColor: "#ffffff",
        alignment: "center",
        padding: 20,
        borderRadius: 8,
      }
    ];
  } else if (promptLower.includes("newsletter") || promptLower.includes("update")) {
    message = "I've created a monthly newsletter layout.";
    blocks = [
      {
        type: "title",
        id: `ai-${Date.now()}-1`,
        content: "Monthly Newsletter",
        fontSize: 28,
        fontColor: "#333333",
        alignment: "left",
        fontWeight: "bold",
        padding: 15,
      },
      {
        type: "text",
        id: `ai-${Date.now()}-2`,
        content: "Here are the top highlights from this month. We've been working hard on new features and improvements.",
        fontSize: 14,
        fontColor: "#666666",
        alignment: "left",
        padding: 15,
      },
      {
        type: "divider",
        id: `ai-${Date.now()}-3`,
        color: "#eeeeee",
        height: 1,
        padding: 10,
      }
    ];
  } else if (promptLower.includes("product") || promptLower.includes("sale") || promptLower.includes("offer")) {
    message = "Here is a product promotion template.";
    blocks = [
      {
        type: "title",
        id: `ai-${Date.now()}-1`,
        content: "Special Offer Just for You!",
        fontSize: 30,
        fontColor: "#d32f2f",
        alignment: "center",
        fontWeight: "bold",
        padding: 20,
      },
      {
        type: "text",
        id: `ai-${Date.now()}-2`,
        content: "Don't miss out on our limited time offer. Save up to 50% on all new arrivals this weekend only.",
        fontSize: 18,
        fontColor: "#333333",
        alignment: "center",
        padding: 20,
      },
      {
        type: "button",
        id: `ai-${Date.now()}-3`,
        text: "Shop the Sale",
        link: "https://example.com/sale",
        backgroundColor: "#d32f2f",
        textColor: "#ffffff",
        alignment: "center",
        padding: 15,
        borderRadius: 4,
      }
    ];
  } else {
    // Default generic response
    message = "I've generated some blocks based on your instructions.";
    blocks = [
      {
        type: "title",
        id: `ai-${Date.now()}-1`,
        content: "Your Custom Email Section",
        fontSize: 24,
        fontColor: "#1a1a1a",
        alignment: "left",
        fontWeight: "bold",
        padding: 20,
      },
      {
        type: "text",
        id: `ai-${Date.now()}-2`,
        content: "This section was generated based on your prompt: '" + prompt + "'. You can further customize it using the editor.",
        fontSize: 14,
        fontColor: "#4a4a4a",
        alignment: "left",
        padding: 20,
      }
    ];
  }

  res.json({ message, blocks });
};
