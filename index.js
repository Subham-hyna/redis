import express from "express";
import axios from "axios"
import { createClient } from 'redis';

const app = express();

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

app.get("/",async(req,res)=>{
    
    const cachedValue = await client.get("todos");
    if(cachedValue) return res.json(JSON.parse(cachedValue));

    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");

    await client.set("todos",JSON.stringify(data));
    await client.expire("todos",30);

    res.status(200).json(data);
})

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is connected at port ${PORT}`);
})