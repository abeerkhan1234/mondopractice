const express = require("express");
const app = express();

const mongoose = require("mongoose");

app.set("view.engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const uri ="mongodb://mongo:RHjQvyz6RjKf90caamwm@containers-us-west-33.railway.app:5949"
const port = 3000

mongoose.connect(uri).then(()=>{
    console.log("Connected to database")
    }).catch((err)=>{
        console.log("Error",err)
})

const Laptop = require("./models/laptop")

app.get("/",async(req,res)=>{
    await Laptop.find()
    .then((data)=>{
        res.render("index.ejs",{
            laptops:data
        })
    })
})

app.get("/save",async(req,res)=>{
    res.render("form.ejs")
})
 
app.get("/edit/:id",async(req,res)=>{
    await Laptop.findById(req.params.id)
    .then(data=>{
        res.render("edit.ejs",{
            laptop:data
        })
    })
    .catch((err)=>console.log(err))    
})

app.post("/save",async(req,res)=>{
    const newLaptop = new Laptop(req.body)
    await newLaptop.save()
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>console.log(err))
})

//delete fuction
app.get("/delete/:id",async(req,res)=>{
    const id = req.params.id
    await Laptop.findByIdAndDelete(id)
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>console.log(err))
})

app.post("/update/:id",async(req,res)=>{
    await Laptop.findByIdAndUpdate(req.params.id,req.body)
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>console.log(err))
})



app.listen(port,()=>{
    console.log(`Server Running on http://localhost:${port}`)
})