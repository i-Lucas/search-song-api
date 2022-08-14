import app from '../../src/app.js';
import supertest from 'supertest';
import userFactory from './user.js';

async function tokenGenerate() {

    const login = userFactory.signupGenerate();
    await userFactory.signinGenerate(login);

    let response = await supertest(app).post('/signin').send(login);
    return response.text;
};

const tokenFactory = { tokenGenerate };
export default tokenFactory;