const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app=express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
  const firstName= req.body.fName;
  const lastName= req.body.lName;
  const mail= req.body.email;

  const data={
    members:[
    {
      email_address:mail,
      status:"subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName

      }
    }
  ]
  };

  const jsondata= JSON.stringify(data);
  const url="https://us10.api.mailchimp.com/3.0/lists/b2ae7c54b9";

  const options= {
    method:"POST",
    auth: "sakshi10:a1618b5088f5df1abe41add6e19a4d5d-us10"
  }

  const request=https.request(url, options, function(response){

    if(response.statusCode===200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsondata);
  request.end();


});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
})





// API Key
// a1618b5088f5df1abe41add6e19a4d5d-us10

// List id
// b2ae7c54b9
