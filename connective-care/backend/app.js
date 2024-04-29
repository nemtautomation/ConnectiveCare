const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRouter = require("./routes/Middleman")

dotenv.config()

app.use(cors())
app.use(express.json())


// mondgodb account and db needs to be made for this to function properly, when made add it to an env folder so we can utilize it
const { MongoClient, ServerApiVersion } = require('mongodb');
// Actually URI is stored elsewhere
// const uri = process.env.MONGOLAB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
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
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // After we run "await client.connect()", we're in! Biw we cab read abd wrute data.
    // My recommendation would be to do something like --> const userCollection = await client.db().collection('Accounts.Users');
    // Same idea for 'Accounts.Providers'

    // It looks like this runs until (Finally) the client closes
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


//routes
app.use("/routes",userRouter)

//tests to see if we can connect to the db
app.get('/test',(req,res)=>{
    if(mongoose.connection.readyState===1){
        res.sendStatus(200)

    } 
    else{
        res.sendStatus(500)
    }
})




//to start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})