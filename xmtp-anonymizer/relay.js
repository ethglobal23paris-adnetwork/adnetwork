import run from "@xmtp/bot-starter";

import dotenv from "dotenv";
dotenv.config();

const AI_BACKEND = process.env.AI_BACKEND;

// XTMP message handler
run(async (context) => {
  const message = context.message.content;
  const response = await fetch(
    `${AI_BACKEND}/?text=${encodeURIComponent(message)}`,
    {
      method: "POST",
    }
  );
  const text = await response.text();
  await context.reply(`${text}`);
});
