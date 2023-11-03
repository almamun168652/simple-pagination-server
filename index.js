const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// paginationData
// Lu6YyJez2SGqnUJ6


const uri = "mongodb+srv://paginationData:Lu6YyJez2SGqnUJ6@cluster0.ywavnlw.mongodb.net/?retryWrites=true&w=majority";

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



        const postCollection = client.db('paginationDB').collection('paginateInfo');



        app.get('/posts', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);

            const result = await postCollection.find()
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        })

        app.get('/postsCounts', async (req, res) => {
            const count = await postCollection.estimatedDocumentCount();
            res.send({ count });
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Crud is running...");
});

app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
});