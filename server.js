const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors());

//mongoose
mongoose.connect("mongodb+srv://catalina-admin:fliaJUchyWudg52g@cluster0.xttdr.mongodb.net/groceriesDB?retryWrites=true&w=majority")

//data schema and model 
const grocerySchema = {
    item: String,
    amount: String,
    category: String,
}

const Grocery = mongoose.model("Grocery", grocerySchema);

//API routes
app.get('/groceries', function(req, res) {
    Grocery.find().then(groceries => res.json(groceries));
})

    //ADD GROCERY ITEM
app.post('/newgrocery', function(req, res) {
    const item = req.body.item;
    const amount = req.body.amount;
    const category = req.body.category;

    const newGrocery = new Grocery({
        item,
        amount,
        category
    })

    newGrocery.save();

})

    //DELETE ITEM
    app.delete('/delete/:id', function(req, res) {
         const id = req.params.id;
         Grocery.findByIdAndDelete({_id: id}, function(err) {
             if(!err) {
                 console.log("item removed");
             } else {
                 console.log(err)
            }
        })
    })

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, function() {
    console.log("EXPRESS SERVER is running");
})
