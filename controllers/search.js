var express = require("express");
var app = express();
var morgan = require("morgan");
const axios = require("axios");

app.use(express.json());
app.use(morgan("dev"));

const abc =()=>{
    app.get("/search/:q", (req, res, next) => {
        const id = req.params.q;
        const options = {
          method: "GET",
          url: "https://spotify23.p.rapidapi.com/search/",
          params: {
            q: id,
            type: "multi",
            offset: "0",
            limit: "10",
            numberOfTopResults: "5",
          },
          headers: {
            "X-RapidAPI-Key": "3e251c9ce4msh2d232efa3221ad6p13b3d1jsn411a385e98e8",
            "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
          },
        };
        const handler_idsong = async () => {
          await axios
            .request(options)
            .then(function (response) {
              const ID = response.data.tracks.items;
              const NAME_SONG = response.data.tracks.items;
              const NAME_ART = response.data.tracks.items;
              const AVT = response.data.tracks.items;
              for (var i = 0; i < ID.length; i++) {
                id_song.push(ID[i].data.albumOfTrack.id);
                name_song.push(NAME_SONG[i].data.name);
                art_name.push(NAME_ART[i].data.artists.items[0].profile.name);
                art_song.push(AVT[i].data.albumOfTrack.coverArt.sources[0].url);
              }
              for (var i = 0; i < ID.length; i++) {
                haha = {
                  id: id_song[i],
                  name: name_song[i],
                  artname: art_name[i],
                  artsong: art_song[i],
                };
                all.push(haha);
              }
              res.status(200).json(all);
              id_song.splice(0,all.length);
              name_song.splice(0,all.length);
              art_name.splice(0,all.length);
              art_song.splice(0,all.length);
              all.splice(0,all.length);
            })
            .catch(function (error) {
              console.error(error);
            });
              
        };
        handler_idsong();
      });
    
}

module.exports = abc;
 
