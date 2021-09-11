export function getConfig(db, guildId) {
  let config = db
    .prepare("SELECT * FROM RolesConfig WHERE guildId = ?")
    .get(guildId);
  if (config) {
    return config;
  } else {
    db.prepare("INSERT INTO RolesConfig (guildId) VALUES( ? );").run(guildId);
    return getConfig(guildId);
  }
}
