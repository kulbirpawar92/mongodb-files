const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.get('/', (req,res) => {
res.send('Welcome to REST API with Node.js Tuorial!!!');
});

app.get('/api/collections', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("customerdb");
  dbo.listCollections().toArray(function(err, result)  {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});
});
/*one GET Services by Kubir Kaur*/
app.get('/api/custInfo', (req,res) => {
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("customerdb");
	dbo.collection("custInfo").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
	});
	});
});




/*one PUT service by Kulbir Kaur */
app.put('/api/custInfo/update', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("customerdb");
  var myquery = { "firstName": "Rajan" };
  var newvalues = { $set: {"firstName": "Deep" } };
  dbo.collection("custInfo").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.send("1 document updated");
    db.close();
  });
});
});

/*One POST service by Kulbir Kaur */
app.post('/api/custInfo/insert', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("customerdb");
  var myobj = { "id": "121","firstName": "Gur", "lastName":"Kaur", "address":"55 dundas street", "city": "Surrey","PhoneNo":"765453234"};
  dbo.collection("custInfo").insertOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document inserted");
    console.log("1 document inserted");
    db.close();
  });
});
});

/*One DELETE service by Kulbir Kaur */
app.delete('/api/custInfo/delete', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("customerdb");
  var myobj = { "id": "121"};
  dbo.collection("custInfo").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));
