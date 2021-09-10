const prefix = "!";

export default function createCommand(client, aliases, callback) {
  if (typeof aliases === "string") aliases = [aliases];
  client.on("message", (message) => {
    message.content = message.content.replace(/\s+/, " ").trim();
    aliases.forEach((alias) => {
      if (
        message.content === `${prefix}${alias}` ||
        message.content.startsWith(`${prefix}${alias} `)
      ) {
        message.content = message.content
          .replace(`${prefix}${alias}`, "")
          .trim();
        callback(message);
      }
    });
  });
}
