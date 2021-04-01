const UsersRepository = require("../repositories/users.repository");

const createUser = async (params) => {
    const response = await UsersRepository.createUser(params);
    return response;
};

const createAcforExistingUser = async (params) => {
    const response = await UsersRepository.createAcforExistingUser(params);
    return response;
};

module.exports = {
    createUser,
    createAcforExistingUser,
};
