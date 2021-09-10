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

createCommand(client, "voc-timeout", (message) => {
  if (!message) {
    parentId = null;
    message.channel.send(
      `Les salons vocaux ne seront plus fermé automatiquement`
    );
  }
  if (channel) {
    parentId = channel.id;
    message.channel.send(
      `Les salons vocaux seront désormais fermé au bout de `
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
        timeout = setTimeout(() => {
          channel.delete();
        }, 5 * 60 * 1000);
      }
      checkPresence();
      client.on("voiceStateUpdate", () => {
        if (!channel.members.size) checkPresence();
        else if (timeout) clearTimeout(timeout);
      });
    });
});

client.login("ODg1NTU3OTY2NjIxNzgyMDk2.YToyIA.oabhRm9sDjWx_IcWQFOIc8EY58M");

console.log(convertTimeString("5h2s"));
