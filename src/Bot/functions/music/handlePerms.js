if (!voiceChannel)
  return message.reply("You need to be in a voice channel to play music!"); // TODO: Remove message after 10secs
const permissions = voiceChannel.permissionsFor(Bot.user);
if (!permissions.has("CONNECT")) {
  return message.channel.send(
    "I can't connect to the channel! Please make sure I have proper permissions!"
  );
}
if (!permissions.has("SPEAK")) {
  return message.channel.send(
    "I can't speak! Please make sure I have proper permissions!"
  );
}
