var express = require("express");
var app = express();


var http = require('http');
var bodyParser = require("body-parser");
var fs = require('fs');

app.use(express.static("views")); // Allow access to content of views folder
app.use(express.static("scripts")); // Allow access to scripts folder
app.use(express.static("images")); // Allow access to images folder

app.set("view engine", "jade"); // This line sets the default view wngine 

var products = require("./model/products.json"); // allow the app to access the products.json file

// This function calls the index viwe when somebody goes to the site route.
app.get('/', function(req, res) {
  res.render("index");
  console.log("Home page now rendered"); // the log function is used to output data to the terminal. 
  });


// This function calls the products page when somebody calls the products page
app.get('/products' , function(req, res){
  res.render("products.jade", 
             {products:products} // Inside the {} option we call the products variable from line 10 above 
            ); 
  console.log("Products Page is rendered");
  
  
})


// This function calls the show individual products page
app.get('/show/:name' , function(req, res){
	
	
	// create a function to filter the products data
	function findProd(which) {
    return which.name === req.params.name;
}
	
	console.log(products.filter(findProd)); // log the split filter based on the check age function 
 indi = products.filter(findProd); // filter the products and declare the filtered data as a sepreate variable
	
  res.render("show",
             {indi:indi} // Inside the {} option we call the products variable from line 10 above
						); 
	
	
  console.log("Individual page now loaded");
  
  
})








// This function gets the application up and running on the development server.
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Yippee its running");
  
})

