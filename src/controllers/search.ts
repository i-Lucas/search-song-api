import { Request, Response } from 'express';
import search from '../services/search.js';
import errors from '../utils/error.js';

async function searchByName(req: Request, res: Response) {

    if (req.body.music == null) return errors.BadRequest('Invalid parameters');
    const result = await search.music(req.body.music);
    res.send(result);
};

async function SearchById(req: Request, res: Response) {

    const musicId = req.params.musicId;
    const userId = parseInt(req.query.user as string);
    const increment = req.query.increment === "true" ? "increment" : "not_increment";

    if (musicId == null || increment == null || userId == null) return errors.BadRequest('Invalid parameters');
    const result = await search.byId(musicId, increment, userId);
    res.send(result);
};

async function rankMusics(req: Request, res: Response) {

    const userId = parseInt(req.query.user as string);
    if (userId == null) return errors.BadRequest('Invalid parameters');
    const result = await search.rank(userId);
    res.send(result);
};

async function saveMusic(req: Request, res: Response) {

    const musicId = req.params.musicId;
    const userId = req.body.userId;
    if (musicId == null || userId == null) return errors.BadRequest('Invalid parameters');

    await search.save(parseInt(userId), musicId);
    res.sendStatus(200);
};

async function mySongs(req: Request, res: Response) {

    const user = req.query.user;
    if (user == null) return errors.BadRequest('Invalid parameters');
    const userId = parseInt(req.query.user as string);
    const result = await search.mySongs(userId);
    return res.send(result);
};

const researches = {
    searchByName,
    SearchById,
    rankMusics,
    saveMusic,
    mySongs
};

export default researches;