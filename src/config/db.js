const mongoose=require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGO_URL)
      .then(()=>{
        console.log("server connected to Db successfully")

      })
      .catch(err=>{
        console.log("Error while Connecting to Db")
      })
}

module.exports=connectToDb