import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const sendMessage = async (userMessage: string) => {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
    system:
      "You are a helpful financial assistant for RemitIQ, a money transfer app. Help users with questions about transfers, wallet balance, and financial advice.",
  });

  const content = response.content[0];
  if (content.type === "text") return content.text;
  throw new Error("Unexpected response type");
};