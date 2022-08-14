import { Router } from 'express';
import searchControllers from '../controllers/search.js';

const searchRouter = Router();

searchRouter.post('/search', searchControllers.searchByName);
searchRouter.get('/lyrics/:musicId', searchControllers.SearchById);
searchRouter.get('/rank/songs', searchControllers.rankMusics);
searchRouter.post('/save/:musicId', searchControllers.saveMusic);
searchRouter.get('/mysongs', searchControllers.mySongs);

export default searchRouter;

/*

advanced search


async function searchByAristAndMusic(artist: string, music: string) {

    console.log(`Searching for ${artist} - ${music}`);

    let result = "";
    const link = `https://api.vagalume.com.br/search.php?art=${artist}&mus=${music}&apikey=${key}`;

    await axios.get(link)

        .then(response => {
            result = response.data
        }).catch(error => {
            result = error
        });

    return result;
};

async function searchArtistByName(name: string) {

    console.log(`Searching for ${name}`);

    let result = "";
    const link = `https://api.vagalume.com.br/search.art?q=${name}&apikey=${key}`;

    await axios.get(link)

        .then(response => {
            result = response.data.response.docs
        }).catch(error => {
            result = error
        });

    return result;
};

*/