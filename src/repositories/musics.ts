import prisma from "../config/db.js";

async function updateOrSave(identifier: string) {

    await prisma.musics.upsert({
        where: { identifier },
        update: { visits: { increment: 1 } },
        create: {
            identifier,
            visits: 1
        }
    });
};

async function saveUserMusic(userId: number, song_identifier: string) {

    const saved = await prisma.saved.findFirst({ where: { userId, song_identifier } });
    if (saved) {
        await prisma.$queryRaw`DELETE FROM saved WHERE "userId" = ${userId} AND song_identifier = ${song_identifier}`;
    } else {
        await prisma.saved.create({ data: { userId, song_identifier } })
    }
};

async function checkSavedMusic(userId: number, song_identifier: string) {
    return await prisma.saved.findFirst({ where: { userId, song_identifier } });
};

async function getAllSaved(userId: number) {
    return await prisma.saved.findMany({ where: { userId } });
};

async function getRank() {
    return await prisma.musics.findMany({ orderBy: { visits: "desc" } });
};

async function updateOrSaveBands(name: string) {

    await prisma.bands.upsert({
        where: { name },
        update: { visits: { increment: 1 } },
        create: {
            name,
            visits: 1
        }
    });
};

async function getRankBands() {
    return await prisma.bands.findMany({ orderBy: { visits: "desc" } });
};

const musics = {

    updateOrSave,
    saveUserMusic,
    checkSavedMusic,
    getRank,
    getAllSaved,
    updateOrSaveBands,
    getRankBands
};

export default musics;