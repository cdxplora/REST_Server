import {MongoClient, ObjectId} from'mongodb';

const dbHost = "localhost:27017"
const dbUser = "chioma"
const dbPassword = "Chi_g0ld"
const dbName = "testi"
const dataCollection = "data"
const usersCollection = "users"

const destConnString = `mongodb://${dbUser}:${dbPassword}@${dbHost}?authSource=${dbName}`
const dbServer = new MongoClient(destConnString)


let db;

//let logonUsers = new Map();

// Method for connecting to the database
const openDbConn = async () => {
    try {
        await dbServer.connect();
        return dbServer.db(dbName)       
    } catch (error) {
		console.error("Failed to connect to the database", error)
        throw error;
    } 
};

// Close the database connection

const closeDbConnection = async () => {
    try{
        await dbServer.close()
        console.log("Database connection closed")
    } catch (error) {
        console.error("Failed to close the database connection", error)
    }
};

// Method for using a certain collection
// This Method gets collection reference
const connDbCollection = async (collection)  => {
    return db.collection(collection)
}

// This Method executes the querry
const sendQuery = async (query, toArray = false) => {
    try {
        const result = await query
        return toArray ? result.toArray() : result
        //if (toArray)
        //    return result.toArray()
        //else
        //    console.log("Should do something")

    } catch (err) {
        console.error("Query execution failed", err)
        throw err
    }
}

// This Method finds one user by username
const  findOneUser = async (username) => {
    const usersCol = await connDbCollection(usersCollection)
    return usersCol.findOne({username});
    // console.log(username)
    // const usersCol = await connDbCollection (usersCollection)
    // return sendQuery(usersCol.find(
    //    {username}
    // ))
};

// Method to find all users
const findAllUsers = async () => {
    const usersCol = await connDbCollection(usersCollection)
    return sendQuery(usersCol.find(), true)
}

// Initialize the database connection
openDbConn().catch(console.error);

// Handle server exit
process.on("SIGINT", async () => {
    await closeDbConnection();no
    process.exit(0);
});

export { findOneUser, findAllUsers, closeDbConnection };

/* Some code here */

// Connects to database when the application starts
// const db = await openDbConn()


    