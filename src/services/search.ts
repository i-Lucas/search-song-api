import axios from "axios";
import errors from "../utils/error.js";
import musics from "../repositories/musics.js";

const key = process.env.API_KEY;

async function music(music: string) {

    let result = [];
    const link = `https://api.vagalume.com.br/search.excerpt?q=${music}&apikey=${key}`;

    await axios.get(link).then(res => result = [...res.data.response.docs])
        .catch(err => errors.InternalServerError(err))

    const musics = result.map(music => {
        return {
            id: music.id,
            title: music.title,
            band: music.band,
        }
    });

    return musics;
};

async function byId(id: string, increment: string = "increment | not_increment", user: number) {

    let music = {};
    let search_picture = {};

    const link = `https://api.vagalume.com.br/search.php?musid=${id}&apikey=${key}`;

    await axios.get(link).then(res => music = res.data)
        .catch(err => errors.InternalServerError('Error fetching the song by ID'));

    //@ts-ignore
    const artist_url = music.art.url;

    await axios.get(`${artist_url}/index.js`).then(res => search_picture = res.data)
        .catch(err => errors.InternalServerError('Error fetching artist by song ID'));

    //@ts-ignore
    let picture = "https://www.vagalume.com.br" + search_picture.artist.pic_medium;

    if (increment === "increment") { await musics.updateOrSave(id) };

    //@ts-ignore
    let saved = await musics.checkSavedMusic(user, music.mus[0].id) ? true : false;

    //@ts-ignore
    await musics.updateOrSaveBands(music.art.name);

    return {
        //@ts-ignore
        id: music.mus[0].id,
        //@ts-ignore
        title: music.mus[0].name,
        //@ts-ignore
        text: music.mus[0].text,
        //@ts-ignore
        band: music.art.name,
        picture,
        saved
    };
};

async function rank(userId: number) {

    const visited_musics = await musics.getRank();

    const musics_and_visits = visited_musics.map(async music => {
        let data = await byId(music.identifier, "not_increment", userId);
        return { ...data, id: music.identifier, visits: music.visits }
    });

    return Promise.all(musics_and_visits);
};

async function save(userId: number, identifier: string) {
    await musics.saveUserMusic(userId, identifier);
};

async function mySongs(userId: number) {

    const result = await musics.getAllSaved(userId);
    const musics_saved = result.map(async music => {
        return await byId(music.song_identifier, "not_increment", userId);
    });

    return Promise.all(musics_saved);
};

async function advanced(artist: string, music: string) {

    let result = [];
    const link = `https://api.vagalume.com.br/search.php?art=${artist}&mus=${music}&apikey=${key}`;

    await axios.get(link).then(response => result = response.data)
        .catch(error => errors.InternalServerError(error));

    return result;
};

async function rankBands(band: string) {

    await musics.updateOrSaveBands(band);
};

async function getRankBands() {
    return await musics.getRankBands();
};

const searchService = { music, byId, rank, save, mySongs, advanced, rankBands, getRankBands };
export default searchService;