const { Userschema } = require("../models/users.model");
const {
    SavingsSchema,
    CurrentSchema,
    BasicSavingsSchema,
    GlobalACSchema,
} = require("./../models/accounts.model");

const openAcs = async (account_type, user_id, acc_no, amount) => {
    try {
        let AccountSchema = SavingsSchema;

        // Check for account type
        if (account_type === "C") AccountSchema = CurrentSchema;
        if (account_type === "BS") AccountSchema = BasicSavingsSchema;

        let create_acc_params = {
            account_no: acc_no,
            amount: parseInt(amount),
        };

        await AccountSchema.create({ ...create_acc_params });

        let global_acc_params = {
            account_no: acc_no,
            ac_type: account_type,
            user_id: user_id,
        };

        // Add the created account to global account
        await GlobalACSchema.create({ ...global_acc_params });

        return { status: 200 };
    } catch (error) {
        return { status: 500 };
    }
};

const createUser = async (data) => {
    let { account_type, amount } = data;

    if (account_type === "BS" && amount > 50000)
        return { status: 0, msg: "Basic Saving ac cannot have amount greater than 50,000" };

    try {
        let time = new Date().getTime();
        let acc_no = account_type + time;
        let user_id = time;
        //Create user params
        let create_user_params = {
            user_id: user_id,
            accounts: [account_type],
            acc_nos: [acc_no],
        };

        await Userschema.create({ ...create_user_params });

        let response = await openAcs(account_type, user_id, acc_no, amount);

        if (response["status"] === 500) return { status: 0, msg: "Account could not be created" };

        return { status: 1, msg: "Account created successfully" };
    } catch (error) {
        return { status: 0, msg: "Account could not be created" };
    }
};

const createAcforExistingUser = async (data) => {
    let { account_type, amount, user_id } = data;

    try {
        let time = new Date().getTime();
        let acc_no = account_type + time;

        let response = await openAcs(account_type, user_id, acc_no, amount);

        if (response["status"] === 500) return { status: 0, msg: "Account could not be opened" };

        await Userschema.findOneAndUpdate(
            { user_id: user_id },
            {
                $push: {
                    accounts: account_type,
                    acc_nos: acc_no,
                },
            }
        );

        return { status: 1, msg: "Account opened successfully" };
    } catch (error) {
        return { status: 0, msg: "Account could not be created" };
    }
};

module.exports = {
    createUser,
    createAcforExistingUser,
};
