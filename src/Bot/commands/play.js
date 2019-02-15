require("dotenv").config();
const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLE_API_KEY);
const handleVid = require("./../functions/music/handleVid.js");
const permChecking = require("./../functions/music/handlePerms.js");
exports.run = async (Bot, message, args) => {
  var serverqueue = Bot.serverConfig.get(message.guild.id, "queue");
  var guild = message.guild.id;
  const voiceChannel = message.member.voiceChannel;
  permChecking(guild, voiceChannel, permissions, message);

  Bot.serverConfig.ensure(message.guild.id, "queue");
  var url = args[0];
  var searchString = args.join(" ");
  console.log(url);
  console.log(searchString);
  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    const playlist = await youtube.getPlaylist(url);
    let video = await playlist.getVideos();
    for (var vid of Object.values(video)) {
      const Playlistvideo = await youtube.getVideoByID(vid.id);
      await handleVideo(video, message, voiceChannel);
    }
    return message.channel.send(
      `✅ Playlist: **${playlist.title}** has been added to the queue!`
    );
  } else {
    try {
      var video = await youtube.getVideoByID(url);
    } catch (e) {
      try {
        var videos = await youtube.searchVideos(searchString, 10);
        let index = 0;
        message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join("\n")}
Please provide a value to select one of the search results ranging from 1-10.
          `);
        var response = await message.channel.awaitMessages(msg => {
          msg.content > 0 && msg.content < 11,
            {
              maxMatches: 1,
              time: 10000,
              errors: ["time"]
            };
        });
      } catch (e) {
        console.log(e);
        return message.channel.send(
          "No or invalid value entered, cancelling video selection."
        );
      }
    }
    const videoIndex = parseInt(response.first().content);
    var video = await youtube.getVideoByID(video[videoIndex - 1].id);
  }
};
/* 
  const playlist = await youtube.getPlaylist(url);
    const videos = await playlist.getVideos();
    for (var vid of Object.values(videos)) {
      const video = await youtube.getVideoByID(vid.id);
      await handleVid(video, message, voiceChannel, true);
    }
    return message.channel.send(
      `✅ Playlist: **${playlist.title}** has been added to the queue!`
    );
  } else {
    try {
      var video = await youtube.getVideo(url);
    } catch (error) {
      try {
        var videos = await youtube.searchVideos(searchString, 10);
        let index = 0;
        message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join("\n")}
Please provide a value to select one of the search results ranging from 1-10.
          `);

        try {
          var response = await message.channel.awaitMessages(msg => {
            msg.content > 0 && msg.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              };
          });
        } catch (err) {
          console.log(err);
          return message.channel.send(
            "No or invalid value entered, cancelling video selection."
          );
        }
        const videoIndex = parseInt(response.first().content);
        var video = await youtube.getVideoByID(video[videoIndex - 1].id);
      } catch (err) {
        console.log(err);
        return message.channel.send(
          "🆘 I could not obtain any search results."
        );
      }
    }
    return handleVid(Bot, video, message, voiceChannel);
  }
*/
exports.help = {
  name: "play",
  category: "Music",
  description: "Play Music or search on youtube.",
  usage: "play [URL] | play [SEARCH STRING] i.e play despacito",
  permission: "None",
  alias: "None"
};
module.exports.settings = {
  disabled: false
};
