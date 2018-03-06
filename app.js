var express = require("express");
var app = express();

app.use(express.static("views")); // Allow access to content of views folder
app.use(express.static("scripts")); // Allow access to scripts folder
app.use(express.static("images")); // Allow access to images folder


app.get('/', function(req, res) {
  res.render("index.jade");
  console.log("Home page now rendered");
  });


app.get('/products' , function(req, res){
  res.render("products.jade");
  console.log("Products Page is rendered");
  
  
})


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Yippee its running");
  
})

