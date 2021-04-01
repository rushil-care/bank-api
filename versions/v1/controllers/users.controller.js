const UserService = require("../../../services/users.service");

const createUser = async (req, res) => {
    try {
        const params = req.params;
        const queryParams = req.query;
        const bodyParams = req.body;
        const token = req.token;
        const response = await UserService.createUser({
            ...params,
            ...queryParams,
            ...bodyParams,
            ...token,
        });
        return res.status(200).send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const createAcforExistingUser = async (req, res) => {
    try {
        const params = req.params;
        const queryParams = req.query;
        const bodyParams = req.body;
        const token = req.token;
        const response = await UserService.createAcforExistingUser({
            ...params,
            ...queryParams,
            ...bodyParams,
            ...token,
        });
        return res.status(200).send(response);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

module.exports = {
    createUser,
    createAcforExistingUser,
};
