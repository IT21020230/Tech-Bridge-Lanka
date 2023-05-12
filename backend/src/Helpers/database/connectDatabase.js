const mongoose = require("mongoose")

const connectDatabase =async  () => {

    await mongoose.connect("mongodb+srv://wudeshp:1234@bogcluster.dtfkkon.mongodb.net/?retryWrites=true&w=majority" ,{useNewUrlParser : true})

    console.log("MongoDB Connection Successfully")

}

module.exports = connectDatabase
