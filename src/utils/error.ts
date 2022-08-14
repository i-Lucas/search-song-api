const NotFound = (message: string) => { throw { status: 404, message } };
const BadRequest = (message: string) => { throw { status: 400, message } };
const Conflict = (message: string) => { throw { status: 409, message } };
const Unauthorized = (message: string) => { throw { status: 401, message } };
const InternalServerError = (message: string) => { throw { status: 500, message } };

const errors = {

    NotFound,
    BadRequest,
    Conflict,
    Unauthorized,
    InternalServerError
};

export default errors;