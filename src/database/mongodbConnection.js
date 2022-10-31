const { MongoClient } = require("mongodb");
async function connectMongo(url){
    try {
        // Connect to the MongoDB cluster
        const client = new MongoClient(process.env.MONGO_URL);
        await client.connect();
        console.log('db connected!')
        await client.close();
    
    } catch (e) {
        console.error(e);
    }
}
module.exports=connectMongo