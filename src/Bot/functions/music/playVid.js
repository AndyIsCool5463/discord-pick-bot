const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLE_API_KEY);
module.exports = async (Bot, guild, song) => {
  Bot.serverConfig.ensure(guild.id, "queue");
  const serverQueue = Bot.serverConfig.get(guild.id, "queue");

  if (!song) {
    serverQueue.voiceChannel.leave();
    Bot.queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song ended.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
};
