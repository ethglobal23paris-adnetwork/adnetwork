import run from "@xmtp/bot-starter";

import dotenv from "dotenv";
dotenv.config();

const AI_BACKEND = process.env.AI_BACKEND;

// XTMP message handler
run(async (context) => {
  const message = context.message.content;
  console.log(`RECV: ${message}`);

  const response = await fetch(
    `${AI_BACKEND}/?text=${encodeURIComponent(message)}`,
    {
      method: "POST",
    }
  );

  // reply to XMTP message
  const text = await response.text();

  await context.reply(`${text}`);
  console.log(`SENT: ${text}`);
}).catch((err) => {
    console.log(err);
    }
);
