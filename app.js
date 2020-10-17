const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
// const client = require("mailchimp_marketing");
// const client = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){

  res.sendFile(__dirname +"/signup.html");
})

app.post("/", function(req, res){

  // const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const email = req.body.Email;
  const phone = req.body.Phone;

  const data = {
    members: [
      {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            // FNAME: firstName,
            LNAME: lastName,
            PHONE: phone
          }
      }
    ]

  };
const jsonData = JSON.stringify(data);



const url = "https://us17.api.mailchimp.com/3.0/lists/98deb86b3a";

const options = {
    method : "POST",
    auth: "sayan:20f624a79ab4bb3a55fda6e357ef8fe0-us17"
}


const request =  https.request(url, options, function(response){
  console.log(response.statusCode);           //****status"C"ode.

    if(response.statusCode === 200){
      res.sendFile(__dirname +"/sucess.html");
    }
    else{
          res.sendFile(__dirname +"/failure.html");
    }
    // console.log(response);
    response.on("data", function(data){

      console.log(JSON.parse(data));
    })

  })
request.write(jsonData);
request.end();

})


app.post("/failure", function(req, res){

  res.redirect("/");
})







app.listen(process.env.PORT || 3000, function(){        //note down the changes.

  console.log("server is running on port 3000");
})






// Api keys
// 20f624a79ab4bb3a55fda6e357ef8fe0-us17
// list
// 98deb86b3a
