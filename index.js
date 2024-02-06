import express from "express";
import axios from "axios"
import { createClient } from 'redis';
import NodeCache from "node-cache" ;
const myCache = new NodeCache();

const app = express();

// const client = createClient({
    
//     password: "Z9GvJgDrNQbm7sJxgHVl5kJwZUga3IZK",
//     socket: {
//         host: "redis-17978.c274.us-east-1-3.ec2.cloud.redislabs.com",
//         port: 17978
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

app.get("/",async(req,res)=>{
    
    // const cachedValue = await client.get("todos");
    // if(cachedValue) return res.json(JSON.parse(cachedValue));

    const cachedValue = myCache.get("todos");
    if(cachedValue) return res.json({message:"cac"});

    const { data1 } = await axios.get("https://jsonplaceholder.typicode.com/todos");
    const { data2 } = await axios.get("https://jsonplaceholder.typicode.com/todos");
    const { data3 } = await axios.get("https://jsonplaceholder.typicode.com/todos");

    const todos = {
        data1,
        data2,
        data3
    }

    myCache.set("todos",todos,10);

    // await client.set("todos",JSON.stringify(data));
    // await client.expire("todos",30);

    res.status(200).json({success: true});
})

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is connected at port ${PORT}`);
})