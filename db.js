
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbifeanyi:HMpX5I8FzRmMgEKW@cluster0.igzi1mt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    result = await client.db("sample_guides").collection('planets').find({},{name: 1, _id: 0, }).skip(5).limit(5).sort({orderFromSun:1}).toArray();
    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
