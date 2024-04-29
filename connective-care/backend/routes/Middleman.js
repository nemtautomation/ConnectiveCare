const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');


dotenv.config()

//=============================================================================================================================================================
//================= connection and establishing names of db and collections====================================================================================
//=============================================================================================================================================================

// Database Name, change the name to what the appropriate db name should be
const DbName= 'test'; 

// collections, change the names to what the appropriate collection names should be
const userCollection = 'users' 
const providerCollection = 'companies' 
const driverCollection = 'drivers'
const AideCollection = 'aides'

// a connection is going to be needed everytime we make a http request with mongodb
async function connection(dbName) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    }
  });  
  try {
      await client.connect();

      //connect to database name
      const db = client.db(dbName);
      return db;
  } catch (error) {
      console.error(error);
  }
}

//=============================================================================================================================================================
//================= For user side of database==================================================================================================================
//=============================================================================================================================================================

//create user
router.post("/createUser", async(req,res)=>{
    const {username,password} = req.body
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const hash = await bcrypt.hash(password, 10);

    const db = await connection(DbName)
    try{
      const Collection = db.collection(userCollection);

      const user = await Collection.findOne({username:username})

      if (user){
        return res.status(400).json("user already exists")
      }

      // Create the user document

      const result = await Collection.insertOne( 
        {
          username: username,
          password: hash,
          address:null,
          city:null,
          state:null
        }
      );    
      res.json(result);
    }
    catch(error){
      res.status(500).json({ error: "Internal server error" })
    }
    finally{
      // closing connection once done
      await db.client.close()
    }
    
    
})

// user login
router.post("/userLogin",async(req,res)=>{
  const { username, password } = req.body;
  const db = await connection(DbName)
  const Collection = db.collection('users')


  const user = await Collection.findOne({username:username})

  if (user) {
      bcrypt.compare(password, user.password).then((same) => {
          if (!same) {
              return res.json({ error: "Incorrect password" });
          }
          const Token = sign({username:username,password:password},"importantToken")
          return res.json(Token);
      });
  } else {
      return res.json({ error: "Username Does Not Exist" });
  }

  
})

// update user Address and other fields based on user REQUEST
router.post("/updateUser", async (req,res) =>{
  const {username,address,city,state,destinationAddress,destinationCity,destinationState,medical,mobility,obstacle,weight,communication,caregiver,other} = req.body
  const db = await connection(DbName)
  const Collection = db.collection('users')

  try{
    const user = await Collection.findOne({username:username})
    if(!user){
      return res.status(404).json({ error: "User not found" })
    }
    const result = await Collection.updateOne(
      {username:username},
      {
        $set:{
          address:address,
          city:city,
          state:state,
          destinationAddress:destinationAddress,
          destinationCity:destinationCity,
          destinationState:destinationState,
          medical:medical,
          mobility:mobility,
          obstacle:obstacle,
          weight:weight,
          communication:communication,
          caregiver:caregiver,
          other:other
        }
      }
    )
    res.json(result)
  }
  catch(error){
    res.status(500).json({ error: "Internal server error" });
  }
})

//=============================================================================================================================================================
//================= For provider side of database===============================================================================================================
//=============================================================================================================================================================

// create provider
router.post("/createProvider",async(req,res)=>{
  const {username,password} = req.body
  bcrypt.hash(password,10).then(async (hash)=>{
    const db = await connection(DbName)
    try{
      const Collection = db.collection(providerCollection)
      const result = await Collection.insertOne({
        username: username,
        password: hash,
        drivers:[],
        driverAides:[],
      })
      return res.json(result)


    }
    catch(error){
      res.status(500).json({ error: "Internal server error" })
    }
    finally{
      await db.client.close()
    }
    
    
  })
 
})

// provider login
router.post("/providerLogin", async (req, res) => {
  const { username, password } = req.body;
  const db = await connection(DbName);

  try{
    const Collection = db.collection(providerCollection);

    const provider = await Collection.findOne({username:username});


    if (provider) {
        bcrypt.compare(password, provider.password).then((same) => {
            if (!same) {
                return res.json({ error: "Incorrect password" });
            }
            const Token = sign({username:username,password:password},"importantToken");
            return res.json(Token);
        });
    } else {
        return res.json({ error: "provider Username Does Not Exist" });
    }
  }
  catch(error){
    res.status(500).json({ error: "Internal server error" });
  }
  finally{
    await db.client.close();
  }
  
});

//=============================================================================================================================================================
//================= For Driver side of database================================================================================================================
//=============================================================================================================================================================

//create driver
router.post("/createDriver", async(req,res)=>{
  const {firstName,lastName,driverID,picture,address,city,state,providerUsername} = req.body
  const db = await(connection(DbName))

  try{
    const Collection = db.collection(driverCollection)
    const driver = await Collection.findOne({driverID:driverID})
    if(driver){
      return res.status(400).json("Driver already exists")
    }

    // Adding the new driver to our provider
    const PCollection = db.collection(providerCollection)
    const provider = await PCollection.findOne({username:providerUsername})

    await PCollection.updateOne(
        { username: providerUsername },
        {
          $push: {
              drivers: {
                  firstName: firstName,
                  lastName: lastName,
                  driverID: driverID,
                  picture: picture,
                  address: address,
                  city: city,
                  state: state,
                  provider:providerUsername
              }
          }
        }
    )
    if (!provider) {
      return res.status(404).json({ error: "Provider not found" });
    }


    const result = await Collection.insertOne({
      firstName:firstName,
      lastName:lastName,
      driverID:driverID,
      picture:picture,
      address:address,
      city:city,
      state:state,
      provider:providerUsername

    })
    res.json(result)
  }
  catch(error){
    res.status(500).json(error)
  }
  finally{
    await db.client.close()
  }
})

// gets the drivers info
router.get("/getDriver/:driverId", async(req, res) => {
  const driverId = req.params.driverId;
  const db = await connection(DbName);

  try {
      const Collection = db.collection(driverCollection);
      const driver = await Collection.findOne({ driverId: driverId });

      if (!driver) {
          return res.status(404).json({ error: "Driver not found" });
      }

      res.json(driver);
  } 
  catch(error) {
      res.status(500).json({ error: "Internal server error" });
  } 
  finally {
      await db.client.close();
  }
});

//get all drivers from driver db specifically
router.get('/getDrivers', async (req, res) => {
  console.log("in get drivers");
  try {
      const db = await connection(DbName);
      const Collection = db.collection(driverCollection);
      const drivers = await Collection.find({}).toArray();
      res.json(drivers);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

// gets all drivers
router.get('/getAllDrivers', async (req, res) => {
  const {username} = req.query;
  console.log(username)
  const db = await connection(DbName); 
  try {
      const PCollection = db.collection(providerCollection); 
      
      
      const provider = await PCollection.findOne({ username: username });
      //console.log(provider);

      
      if (!provider) {
          return res.status(404).json({ error: 'Provider not found' });
      }

      return res.json(provider.drivers)

      
  } 
  catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
  }

  finally{
    await db.client.close();
  }
});


//=============================================================================================================================================================
//================= For Driver Aide side of database================================================================================================================
//=============================================================================================================================================================

//create driver Aide
router.post("/createDriverAide", async(req,res)=>{
  const {firstName,lastName,driverID,picture,address,city,state,providerUsername} = req.body
  const db = await(connection(DbName))

  try{
    const Collection = db.collection(AideCollection)
    const driver = await Collection.findOne({driverID:driverID})
    if(driver){
      return res.status(400).json("Driver Aide already exists")
    }


    const PCollection = db.collection(providerCollection)
    const provider = await PCollection.findOne({username:providerUsername})

    await PCollection.updateOne(
        { username: providerUsername },
        {
          $push: {
              driverAides: {
                  firstName: firstName,
                  lastName: lastName,
                  driverID: driverID,
                  picture: picture,
                  address: address,
                  city: city,
                  state: state
              }
          }
        }
    )
    if (!provider) {
      return res.status(404).json({ error: "Provider not found" });
    }


    const result = await Collection.insertOne({
      firstName:firstName,
      lastName:lastName,
      driverID:driverID,
      picture:picture,
      address:address,
      city:city,
      state:state,
      provider:providerUsername

    })
    res.json(result)
  }
  catch(error){
    res.status(500).json(error)
  }
  finally{
    await db.client.close()
  }
})

// gets the Driver Aides info
router.get("/getDriverAide/:driverId", async(req, res) => {
  const driverId = req.params.driverId;
  const db = await connection(DbName);

  try {
      const Collection = db.collection(AideCollection);
      const driver = await Collection.findOne({ driverId: driverId });

      if (!driver) {
          return res.status(404).json({ error: "Driver not found" });
      }

      res.json(driver);
  } 
  catch(error) {
      res.status(500).json({ error: "Internal server error" });
  } 
  finally {
      await db.client.close();
  }
});

//get all drivers specifically from driver aides db
router.get('/getDriverAides', async (req, res) => {
  try {
      const db = await connection(DbName);
      const Collection = db.collection(AideCollection);
      const drivers = await Collection.find({}).toArray();
      res.json(drivers);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

// get all driver aides
router.get('/getAllDriverAides', async (req, res) => {
  const {username} = req.query;
  const db = await connection(DbName);
  try {
      const PCollection = db.collection(providerCollection); 
      
      
      const provider = await PCollection.findOne({ username: username });

      
      if (!provider) {
          return res.status(404).json({ error: 'Provider not found' });
      }

      return res.json(provider.driverAides);

      
  } 
  catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
  }

  finally{
    await db.client.close();
  }
});
module.exports = router