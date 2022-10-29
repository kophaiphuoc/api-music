var express = require("express");
var app = express();
var morgan = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();


const favorutie = require("./routers/favourite");
const register = require("./routers/user");
const { application, request } = require("express");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


try {
  mongoose.connect(process.env.mongodb_url,() => {
      console.log("connect to mongoose");
  });
} catch (error) {
  console.error(error);
}

app.use("/music",favorutie);
app.use("/user",register);
app.use("/user",register)

const id_song = [];
const name_song = [];
const art_song = [];
const art_name = [];
const all =[] ;

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
        console.log(all[0].id);
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

app.get("/thesong/:id",(req,res,next)=>{
  const id = req.params.id;
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/albums/',
    params: {ids: id},
    headers: {
      'X-RapidAPI-Key': '3e251c9ce4msh2d232efa3221ad6p13b3d1jsn411a385e98e8',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };
  axios.request(options).then(function (response) {
    const id_song = response.data.albums[0].id;
    const name_song = response.data.albums[0].name;
    const art_song = response.data.albums[0].images[1].url;
    const art_name = response.data.albums[0].tracks.items[0].artists[0].name;
    const link_song = response.data.albums[0].tracks.items[0].preview_url;
    const all =[] ;
    all.push(id_song,name_song,art_song,art_name,link_song);
    res.status(200).json(all); 
  }).catch(function (error) {
    console.error(error);
  });
})


app.listen(process.env.PORT || 9999, () => {
  console.log("listening on port ");
});
