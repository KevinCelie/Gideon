import { Client, Intents } from "discord.js";
import createCommand from "./createCommand";

import convertTimeString from "./convertTimeString";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.on("ready", function () {
  console.log("Je suis connecté !");
});

let parentId;
let timeoutSeconds = 5;

createCommand(client, "voc-timeout", (message) => {
  if (!message) {
    timeoutSeconds = 0;
    message.channel.send(
      `Les salons vocaux ne seront plus fermé automatiquement`
    );
  }
  if (channel) {
    timeoutSeconds = convertTimeString(message);
    message.channel.send(
      `Les salons vocaux seront désormais fermé au bout de ${message} soit ${timeoutSeconds} seconds`
    );
  } else message.channel.send(`Aucune catégorie ne correspond à ce nom`);
});

createCommand(client, "voc-category", (message) => {
  if (!message) {
    parentId = null;
    message.channel.send(`Les salons vocaux seront générés sans catégorie`);
  }
  const channel = message.guild.channels.cache.find(
    (channel) =>
      channel.type === "GUILD_CATEGORY" &&
      channel.name.toLowerCase().trim() === message.content.toLowerCase().trim()
  );
  if (channel) {
    parentId = channel.id;
    message.channel.send(
      `Les salons vocaux seront désormais générés dans ${channel.name}`
    );
  } else message.channel.send(`Aucune catégorie ne correspond à ce nom`);
});

createCommand(client, "voc", (message) => {
  console.log(parentId);
  message.guild.channels
    .create(message.content, { parent: parentId, type: "GUILD_VOICE" })
    .then((channel) => {
      let timeout;
      function checkPresence() {
        if (timeoutSeconds)
          timeout = setTimeout(() => {
            channel.delete();
          }, timeoutSeconds * 1000);
      }
      checkPresence();
      client.on("voiceStateUpdate", () => {
        if (!channel.members.size) checkPresence();
        else if (timeout) clearTimeout(timeout);
      });
    });
});

client.login(process.env.TOKEN);
