const TranscationRepository = require("../repositories/transcation.repository");

const createTranscation = async (params) => {
    const response = await TranscationRepository.createTranscation(params);
    if (response) {
        return { status: 1, message: "Transcation completed successfully", data: response };
    } else {
        return { status: 0, message: "Transcation could not be completed" };
    }
};

module.exports = {
    createTranscation,
};
