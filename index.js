const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = "@Crypto_TonPrice"; // اسم القناة

const symbols = [
  { id: "bitcoin", label: "BTC" },
  { id: "ethereum", label: "ETH" },
  { id: "binancecoin", label: "BNB" },
  { id: "solana", label: "SOL" },
  { id: "ripple", label: "XRP" },
  { id: "toncoin", label: "TON" }
];

async function runBot() {
  try {
    let msg = "⚡️ Crypto Market Update\n\n";

    for (const symbol of symbols) {
      const res = await axios.get(https://api.coingecko.com/api/v3/simple/price, {
        params: {
          ids: symbol.id,
          vs_currencies: "usd"
        }
      });

      const price = res.data[symbol.id]?.usd;
      if (!price) continue;

      msg += #${symbol.label}: $${price}\n;
    }

    const telegramUrl = https://api.telegram.org/bot${BOT_TOKEN}/sendMessage;
    await axios.post(telegramUrl, {
      chat_id: CHAT_ID,
      text: msg
    });

    console.log("✅ Message sent to Telegram!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

runBot();
