const transactionModel=require("../models/transaction.models")
const ledgerModel=require("../models/ledger.models")
const accountModel=require("../models/account.model")















async function createTransaction(req,res){
    const {fromAccount,toAccount,amount,idempotencyKey}=req.body;
    if(!fromAccount||!toAccount||!amount||!idempotencyKey){
        return res.status(400).json({
            message:"FromAccount, toAccount, amount and idempotency are required"
        })
    }

    const fromUserAccount=await accountModel.findOne({
        _id:fromAccount,
    })
    const toUserAccount=await accountModel.findOne({
        _id:toAccount,
    })

    if(!fromUserAccount||!toUserAccount){
        return res.status(400).json({
            message:"Invalid fromAccount or toAccount"
        })
    }

}