import { Router } from 'express';
import searchControllers from '../controllers/search.js';

const searchRouter = Router();

searchRouter.post('/search', searchControllers.searchByName);
searchRouter.get('/lyrics/:musicId', searchControllers.SearchById);
searchRouter.get('/rank/songs', searchControllers.rankMusics);
searchRouter.post('/save/:musicId', searchControllers.saveMusic);
searchRouter.get('/mysongs', searchControllers.mySongs);
searchRouter.post('/advanced', searchControllers.advancedSearch);
searchRouter.post('/rank/bands', searchControllers.rankBands);
searchRouter.get('/rank/bands', searchControllers.getRankBands);

export default searchRouter;