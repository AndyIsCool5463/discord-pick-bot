require("dotenv").config();
const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLE_API_KEY);
const handleVideo = require("../functions/music/handleVideo.js");
exports.run = async (Bot, msg, args) => {
  Bot.queue = new Map();
  const searchString = args.slice(0).join(" ");
  const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
  console.log(searchString);
  console.log(url);
  // console.log(url);
  // User in Channel..?
  const voiceChannel = msg.member.voiceChannel;
  if (!voiceChannel)
    return msg.channel
      .send("I'm sorry but you need to be in a voice channel to play music!")
      .then(m => {
        setTimeout(function() {
          m.delete();
        }, 10000);
      });
  // Permission Checking
  const permissions = voiceChannel.permissionsFor(msg.client.user);
  if (!permissions.has("CONNECT")) {
    return msg.channel
      .send(
        "I cannot connect to your voice channel, make sure I have the proper permissions!"
      )
      .then(m => {
        setTimeout(function() {
          m.delete();
        }, 10000);
      });
  }
  if (!permissions.has("SPEAK")) {
    return msg.channel
      .send(
        "I cannot speak in this voice channel, make sure I have the proper permissions!"
      )
      .then(m => {
        setTimeout(function() {
          m.delete();
        }, 10000);
      });
  }
  // URL Check

  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    const playlist = await youtube.getPlaylist(url);
    const videos = await playlist.getVideos();
    for (const video of Object.values(videos)) {
      const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
      await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
    }
    return msg.channel.send(
      `✅ Playlist: **${playlist.title}** has been added to the queue!`
    );
  } else {
    try {
      var video = await youtube.getVideo(url);
    } catch (error) {
      try {
        var videos = await youtube.searchVideos(searchString, 10);
        let index = 0;
        msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join("\n")}
Please provide a value to select one of the search results ranging from 1-10.
                    `);
        try {
          var response = await msg.channel.awaitMessages(
            msg2 => msg2.content > 0 && msg.content < 11,
            {
              maxMatches: 1,
              time: 10000,
              errors: ["time"]
            }
          );
        } catch (error) {
          console.error(error);
          return msg.channel.send(
            "No or invalid value entered, cancelling video selection."
          );
        }
        const videoIndex = parseInt(response.first().content);
        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
      } catch (err) {
        console.error(err);
        return msg.channel.send("🆘 I could not obtain any search results.");
      }
    }
    return handleVideo(Bot, video, msg, voiceChannel);
  }
  // Error Handling ^_^
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Play Music or search on youtube.",
  usage: "play [URL] | play [SEARCH STRING] i.e play despacito",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: true
};
