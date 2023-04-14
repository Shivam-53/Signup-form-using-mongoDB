let express = require("express")
let bodyParser = require("body-parser")
let mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/mailData',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let gender = req.body.gender;
    let password = req.body.password;

    let data = {
        "name": name,
        "email" : email,
        "gender": gender,
        "password" : password
    }

    db.collection('mailingList').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    // res.set({
    //     "Allow-access-Allow-Origin": '*'
    // })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");