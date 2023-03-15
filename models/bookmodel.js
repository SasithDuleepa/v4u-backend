const mongoose = require("mongoose");


const Book=mongoose.Schema({
    user_id:{
        type:String,
    },
    book_name:{
        type:String,
    },
    author:{
        type:String,
    },
    catergory:{
        type:Object
    },
    description:{
        type:String
    },
    pages:{
        type:String
    }

})

module.exports = mongoose.model("Book", Book)