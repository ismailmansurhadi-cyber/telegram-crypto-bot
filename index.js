import fetch from "node-fetch";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = "@Crypto_TonPrice"; // ضع اسم قناتك هنا

const coins = [
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "binancecoin", symbol: "BNB" },
  { id: "solana", symbol: "SOL" },
  { id: "ripple", symbol: "XRP" },
  { id: "the-open-network", symbol: "TON" }
];

async function run() {
  const ids = coins.map(c => c.id).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

  const res = await fetch(url);
  const data = await res.json();

  let msg = "⚡ Crypto Prices\n\n";

  coins.forEach(c => {
    const price = data[c.id]?.usd;
    if (!price) return;
    msg += `💰 #${c.symbol}: $${price}\n`;
  });

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: msg
    })
  });
}

run();
