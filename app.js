const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Port = 4444;
require('dotenv').config();
async function connectMongoose () {
    await mongoose.connect(process.env.URL)
    .then(() => {
        console.log("Mbrouk rak connect m3a MongoDB");
      }) .catch(err => {
        console.error("Wa s9a3 chooof ach drti", err);
      });
}
connectMongoose();

const productschema = new mongoose.Schema({
    name: String,
    price: Number,
    availability: Boolean,
    data: {type: Date, default: Date.now}
});

const Product = mongoose.model('Produit', productschema);

// const produit = new Product ({ //create new product work great
//     name: 'iphone 13',
//     price: 10000,
//     availability: false,
// });
// produit.save() save in mng succes
//   .then(() => {
//     console.log("Product saved successfully.");
//   })
//   .catch(err => {
//     console.error("Error saving the product:", err);
//   });
app.get('/', async (req,res) =>{
try{
const Products = await Product.find({});
return res.json(Products);
}catch(err){
    return res.status(500).json({ error: 'An error occurred while fetching data.' });
}
})
app.post('/', async (req,res) =>{
    try{
        const NewProduit = new Product ({
                 name: 'Pixel',
                 price: 5000,
                 availability: true,
        })
        const saved = NewProduit.save();  
        return res.status(201).json(saved)   
        }catch(err){
            return res.status(500).json({ error: 'la walo matsavach' });
        }
})
app.put('/',async (req,res) =>{
    try{
        const Products = await Product.updateOne({name:""},{$set:{name:"Redmi",price:4500}})
        return res.json(Products);
    }catch(err){
        return res.status(500).json({ error: 'La dmg ma kyn la Update la walo ' });
    }
})
app.delete('/',async(req,res) =>{
    try{
        const Products = await Product.deleteOne({
            name:"Iphone 15",
        })
        return res.status(204).json(Products);
    }catch(err){
        return res.status(500).json({ error: 'La dmg ma kyn la Delete la walo ' });
    }
})

app.listen(Port, () => {
    console.log(`server on port : ${Port}`);
  });