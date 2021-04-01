const { Userschema } = require("../models/users.model");
const {
    SavingsSchema,
    CurrentSchema,
    BasicSavingsSchema,
    GlobalACSchema,
} = require("./../models/accounts.model");

const checkAcSchema = (ac_type) => {
    let account_schema = SavingsSchema;
    if (ac_type === "C") account_schema = CurrentSchema;
    if (ac_type === "BS") account_schema = BasicSavingsSchema;
    return account_schema;
};

const createTranscation = async (data) => {
    let { fromAccountId, toAccountId, amount } = data;
    amount = parseInt(amount);

    let response = await GlobalACSchema.aggregate([
        {
            $facet: {
                fromAc: [{ $match: { account_no: fromAccountId } }],
                toAc: [{ $match: { account_no: toAccountId } }],
            },
        },
    ]);

    let { fromAc, toAc } = response[0];

    // Check for the existence of the account in DB
    if (fromAc.length === 0 || toAc.length === 0)
        return { status: 0, msg: "The account no. provided does not exists" };

    // Extracting Objects
    fromAc = fromAc[0];
    toAc = toAc[0];

    //@@ 3. Transfer money from same user account is not allowed
    if (toAc["user_id"] === fromAc["user_id"])
        return { status: 0, msg: "Transfer money from same user account is not allowed" };

    // Check for the sufficient funds present in payee account
    let payee_ac_type = fromAc["ac_type"];
    let payee_ac_schema = checkAcSchema(payee_ac_type);

    let payee_balance = await payee_ac_schema.findOne(
        { account_no: fromAccountId },
        { _id: 0, amount: 1 }
    );

    // Condition to check for payee balance
    if (payee_balance["amount"] < amount)
        return { status: 0, msg: "Insuffient funds at Payee account, Pls try again" };

    //@@ 4. Check for reciever account type

    let reciever_ac_type = toAc["ac_type"];
    let reciever_ac_schema = checkAcSchema(reciever_ac_type);

    let reciever_balance = await reciever_ac_schema.findOne(
        { account_no: toAccountId },
        { _id: 0, amount: 1 }
    );

    let final_amount = reciever_balance["amount"] + amount;
    final_amount = final_amount.toFixed(2);

    if (reciever_ac_type === "BS" && final_amount > 50000)
        return { status: 0, msg: "BasicSavings ac cannot exceed amount 50,000" };

    let final_payee_amount = payee_balance["amount"] - amount;
    final_payee_amount = final_payee_amount.toFixed(2);

    // Update payee account
    await payee_ac_schema.findOneAndUpdate(
        { account_no: fromAccountId },
        {
            $set: {
                amount: final_payee_amount,
            },
        }
    );

    await reciever_ac_schema.findOneAndUpdate(
        { account_no: toAccountId },
        {
            $set: {
                amount: final_amount,
            },
        }
    );

    let user_details = await Userschema.findOne({
        user_id: toAc["user_id"],
    });

    console.log(user_details);

    return {
        status: 1,
        newSrcBalance: final_payee_amount,
        totalDestBalance: final_amount,
        transferedAt: new Date().getTime(),
    };
};

module.exports = {
    createTranscation,
};
