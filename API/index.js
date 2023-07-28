const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') 
require('dotenv').config()
const Transaction = require('./models/Transaction')
const app = express();
app.use(cors());  
app.use(express.json()); 




app.get('/api/test',(req,res)=>{
  res.json("test ok");
});
app.post('/api/transaction', async(req,res)=>{
  await mongoose.connect(process.env.MONGO_URL)
  const {name,price, description, datetime} = req.body
  const newTransaction = await Transaction.create({name,price, description, datetime})
  res.json(newTransaction);
});

app.get('/api/transactions',async (req,res)=>{
  await mongoose.connect(process.env.MONGO_URL)
    const transactions = await Transaction.find({}); 
    res.json(transactions)
})

app.listen(3001,(req,res)=>{
    console.log("Server Up")
});