import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoID) => {
  const videoURL = `https://www.youtube.com/shorts/` + videoID
  console.log(videoID)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" }).on(
    "info",
    (info) => {
      const seconds = info.formats[0].approxDurationMS /1000
      console.log(info)

      if(seconds > 60) {
        throw new Error("Aduração desse vídeo é maior do que 60 segundos")
      }
    }
  ).on("end", () => {
    console.log("Download do vídeo finalizado.")
  }).on('error',(error) => {
    console.log("não foi possivel fazer o download do vídeo. Detalhes do erro:", error) 
  }).pipe(fs.createWriteStream('./tmp/audio.mp4'))
}
