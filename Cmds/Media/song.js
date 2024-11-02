module.exports = async context => {
  const {
    client,
    m: message,
    text: query
  } = context;
  const ytSearch = require("yt-search");
  const fetch = require("node-fetch");

  try {
    // Check if the query is present
    if (!query || query.trim().length === 0) {
      return message.reply("What song do you want to download?");
    }

    // Use query directly as a search string
    const videoResults = await ytSearch(query);

    // Check if any videos were found
    if (videoResults && videoResults.videos.length > 0) {
      const video = videoResults.videos[0];  // Take the first video result
      const videoUrl = video.url;
      const chatId = message.chat;
      
      // Fetch video download data
      const response = await fetch(`https://api.ibrahimadams.us.kg/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=cracker`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;
        
        // Send initial message indicating download is in progress
        await client.sendMessage(chatId, { text: "*Downloading...*" }, { quoted: message });

        // Send video info message with thumbnail and details
        const videoInfoMessage = {
          image: { url: video.thumbnail },
          caption: `*ALPHA-MD VIDEO PLAYER*\n
╭───────────────◆
│ *Title:* ${jsonResponse.result.title}
│ *Duration:* ${video.timestamp}
│ *Artist:* ${video.author.name}
╰────────────────◆`
        };
        await client.sendMessage(chatId, { text: "*Downloading wait*" }, { quoted: ms });
let downloadedLength = 0;
        await client.sendMessage(chatId, messageData, { quoted: ms });
        await client.sendMessage(chatId, { audio: { url: downloadUrl }, mimetype: "audio/mp4" }, { quoted: ms });

         await client.sendMessage(chatId, { document: { url: downloadUrl }, mimetype: "audio/mp4" }, { quoted: ms });
        message.reply(` * ${jsonResponse.result.title}*\n\n*Downloaded successfully. Keep using Alpha md*`);
      } else {
        message.reply("Failed to download audio. Please try again later.");
      }
    } else {
      message.reply("No audio found.");
    }
  } catch (error) {
    // Catch and report errors
    message.reply("Download failed\n" + error);
  }
};