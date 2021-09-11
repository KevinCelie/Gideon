import { Client, Intents } from "discord.js";
import sqlite3 from "better-sqlite3";
import createCommand from "./createCommand.js";
import { getConfig } from "./manageConfig.js";

import convertTimeString from "./convertTimeString";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

const guildId = "886150874454454303";
const db = sqlite3("roles-handler.db");

const config = getConfig(db, guildId);
console.log(config);

client.on("ready", function () {
  console.log("Je suis connecté !");
});

let color = "BLUE";
let channelRequest = "admin";

// add
// del
// request
// def-main
// def-sub
// def-color ?

createCommand(client, "roles add", (message) => {
  console.log(message.guild.id);
  if (!message.content) {
    message.channel.send(`Aucun nom n'a été donné pour le rôle.`);
  } else {
    if (
      message.guild.roles.cache.find((role) => role.name === message.content)
    ) {
      message.channel.send(`Le nom de rôle spécifié existe déjà.`);
    } else {
      // Create a new role
      message.guild.roles.create({
        name: message.content,
        color: color,
        mentionable: true,
        reason: "",
      });
    }
  }
});

createCommand(client, "roles del", (message) => {
  let role = message.guild.roles.cache.find(
    (role) => role.name === message.content
  );
  if (role) {
    role.delete();
  }
});

createCommand(client, "roles request", (message) => {
  if (!message.content) {
    message.channel.send(`Aucun nom n'a été donné pour le rôle.`);
  } else {
    let channel = message.guild.channels.cache.find(
      (channel) => channel.name === channelRequest
    );
    if (channel) {
      channel.send(
        `${message.author} propose d'ajouter le role ${message.content}`
      );
    }
  }
});

createCommand(client, "roles opt", (message) => {
  if (!message.content) {
    message.channel.send(`Aucun nom n'a été donné pour le rôle.`);
  } else {
    let channel = message.guild.channels.cache.find(
      (channel) => channel.name === channelRequest
    );
    if (channel) {
      channel.send(
        `${message.author} propose d'ajouter le role ${message.content}`
      );
    }
  }
});

client.login(process.env.TOKEN);
