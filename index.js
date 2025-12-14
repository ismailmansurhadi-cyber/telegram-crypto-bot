const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = "@Crypto_TonPrice";

const symbols = ["bitcoin","ethereum","binancecoin","solana","ripple","toncoin"];

async function runBot() {
  try {
    let msg = "⚡️ Crypto Market Update\n\n";

    for (const symbol of symbols) {
      const res = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
        params: { ids: symbol, vs_currencies: "usd" }
      });

      const price = res.data[symbol]?.usd;
      if (!price) continue;

      msg += #${symbol.toUpperCase()}: $${price}\n;
    }

    await axios.post(https://api.telegram.org/bot${BOT_TOKEN}/sendMessage, {
      chat_id: CHAT_ID,
      text: msg
    });

    console.log("✅ Message sent!");
  } catch (e) {
    console.error("❌ Error:", e.message);
  }
}

runBot();
