const mongoose=require('mongoose')
const connetMongoose =async()=>{
    try {

        await mongoose.connect(process.env.MONGO_URL)
        console.log(`successFully Connect mongoDb ${process.env.MONGO_URL}`);
    } catch (error) {
        console.log(`Not Connect mongoDb ${process.env.MONGO_URL}`);
        console.log(error.message);
       
        
    }
}

module.exports= connetMongoose