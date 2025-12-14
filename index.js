// index.js
import fetch from "node-fetch";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = "@Crypto_TonPrice"; // اسم القناة العامة

const symbols = ["BTC", "ETH", "BNB", "SOL", "XRP", "TON"];

async function runBot() {
  try {
    let msg = "⚡️ Crypto Market Update\n\n";

    for (const symbol of symbols) {
      // ✅ استخدم backticks لتصحيح template literal
      const res = await fetch(https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd);
      const data = await res.json();
      const price = data[symbol.toLowerCase()]?.usd;
      if (!price) continue;

      msg += #${symbol}: $${price}\n;
    }

    const telegramUrl = https://api.telegram.org/bot${BOT_TOKEN}/sendMessage;
    await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: msg })
    });

    console.log("✅ Message sent to Telegram!");
  } catch (e) {
    console.error("❌ Error:", e.message);
  }
}

runBot();
