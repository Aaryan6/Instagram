const express = require("express")
const app = express();
const mongoose = require("mongoose")
const path = require("path")
const helmet = require("helmet")
const morgan = require("morgan")
const multer = require("multer")


mongoose.connect("mongodb://localhost:27017/instagram",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("DB is working..."))
.catch((err)=>console.log(err))

app.use("/images",express.static(path.join(__dirname,"public/images")))

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))



// multer
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/images");
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.name);
    }
});
const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    try {
        return res.status(200).json("file uploaded successfully")
    } catch (error) {
        console.log(error)
    }
})

app.use("/api/auth", require("./router/auth"))
app.use("/api/posts", require("./router/posts"))
app.use("/api/users", require("./router/users"))

app.listen(5000, () => {
    console.log("Backend server is running!");
  });
  