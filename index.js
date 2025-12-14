const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = -1003134337711; // معرف رقمي للقناة

const symbols = ["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT","XRPUSDT","TONUSDT"];

async function runBot() {
  let msg = "⚡️ Crypto Market Update\n\n";

  for (const symbol of symbols) {
    try {
      console.log("Fetching price for:", symbol);
      const res = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
      const price = parseFloat(res.data.price).toFixed(2);
      console.log("Price received:", price);

      msg += `#${symbol.replace("USDT","")}: $${price}\n`;
    } catch (err) {
      console.log("Error fetching:", symbol, err.message);
      msg += `#${symbol.replace("USDT","")}: ❌ Error fetching price\n`;
    }
  }

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: msg
    });
    console.log("✅ Message sent to Telegram!");
  } catch (err) {
    console.error("❌ Telegram error:", err.message);
  }
}

runBot();
