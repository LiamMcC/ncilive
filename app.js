var express = require("express");
var app = express();


var http = require('http');
var bodyParser = require("body-parser");
var fs = require('fs');


app.use(express.static("views")); // Allow access to content of views folder
app.use(express.static("scripts")); // Allow access to scripts folder
app.use(express.static("images")); // Allow access to images folder

app.set("view engine", "jade"); // This line sets the default view wngine 

app.use(bodyParser.urlencoded({extended:true}));

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

// Function to call the add product page

app.get('/add', function(req, res){
			 res.render("add");
	     console.log("Ray wants this add page rendered");
			 
			 });


// Function to create a new product

app.post('/add', function(req, res){
	var count = Object.keys(products).length; // Tells us how many products we have
	console.log(count);
	
	// This will look for the current largest id
	
	function getMax(products , id) {
		var max
		for (var i=0; i<products.length; i++) {
			if(!max || parseInt(products[i][id]) > parseInt(max[id]))
				max = products[i];
			
		}
		return max;
	}
	
	var maxPpg = getMax(products, "id");
	newId = maxPpg.id + 1;
	console.log(newId);
	
	// create a new product based on what we have in our form on the add page 
	
	var product = {
		name: req.body.name, 
		id: newId, // this is the variable created above
		activity: req.body.sport,
		price: req.body.price,
		image: req.body.image
	};
	
	var json  = JSON.stringify(products); // Convert from object to string
	
	fs.readFile('./model/products.json', 'utf8', function readFileCallback(err, data){
							if (err){
		console.log("Something Went Wrong");
	 }else {
		products.push(product); // add the information from the above variable
		json = JSON.stringify(products, null , 4); // converted back to JSON
		fs.writeFile('./model/products.json', json, 'utf8'); // Write the file back
		
	}});
	res.redirect("/products")
});

// code to render the edit product pageXOffset

app.get('/edit/:name', function(req, res){
	
	console.log("Edit page Shown");
		
	function chooseProd(indOne){
		return indOne.name === req.params.name;	
		}
	
	var indOne = products.filter(chooseProd);
	
	res.render("edit",
						{indOne:indOne}
						);
	
	console.log(indOne);
	});


app.post('/edit/:name', function(req, res){
	var json = JSON.stringify(products);
	
	var keyToFind = req.params.name; // call name from the url
			
			// var str = products;
			
			var data = products;
			var index = data.map(function(product) {return product.name;}).indexOf(keyToFind)
			
			var x = req.body.newname;
			var y = req.body.newactivity;
			var z = req.body.newprice;
			var w = req.body.newimage;
			
			products.splice(index, 1 , {name: x, activity: y, price: z , image: w} );
			
			json = JSON.stringify(products, null, 4);
			
			fs.writeFile('./model/products.json', json, 'utf8'); // Writing the data back to the file
	
	
// 	fs.readFile('./model/products.json', 'utf8', function readFileCallback(err, data1){
// 		if (err){
// 			console.log("something Went Wrong");
// 		} else {
			
			
			
// 		}
		
// 	})
	res.redirect("/products");
});



// This function gets the application up and running on the development server.
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Yippee its running");
  
})

