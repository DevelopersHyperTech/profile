const express = require("express");
const app = express();
const request  = require("request");
const bodyParser = require("body-parser");
const https = require("https");


app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.get("/", function (req,res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {
   const firstName = req.body.fName
   const lastName = req.body.lName
   const email = req.body.email

   const data = {
     members:[
       {
         email_address:email,
         status: "subscribed",
         merge_fields:{
           FNAME: firstName,
           LNAME:lastName,
         }
       }
     ]
   }

 var jsonData = JSON.stringify(data);
 const url =  "https://us17.api.mailchimp.com/3.0/lists/1042b0f20f"
 const options = {
   method: "POST",
   auth:"angela:58f7f52eff0c0db13b487b84e3421cb5-us17"
 }

const request = https.request(url, options, function (response) {
  if (response.statusCode === 200) {
       res.sendFile(__dirname + "index.html");
       // res.send("Success")

  } else {
       res.sendFile(__dirname + "/failure.html");
       res.send("failed")
  }

      response.on("data", function (data) {
        console.log(JSON.parse(data));
      });

 });
 request.write(jsonData);
 request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
  console.log("server is working");
})
// Api Key
// 3b4f6c656ebfe68cdd5396db444e9dcd-us17

// 1042b0f20f
