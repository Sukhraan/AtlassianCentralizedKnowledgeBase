var express = require('express'); 
var app = express();

var MongoClient = require('mongodb').MongoClient;

var dburl = 'mongodb://atlassianUser:abc123@localhost:27017/atlassian'


MongoClient.connect(dburl, { useNewUrlParser: true },function(err,client){
    console.log("MongoDB connection works fine");
    client.close();
});



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var cors = require('cors');


// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));
//app.use(bodyParser.json());





var globalHeader = {'Authorization': 'Basic amlyYWFkbWluOlBBJCR3b3JkMQ==', 'Content-Type': 'application/json'}



app.get('/searchterms', function(req, res) { 
    
    var currentDate = new Date();
    var arrTimestamp =  currentDate.toISOString().split("-");
    var currentYear = arrTimestamp[0];
    var currentMonth = arrTimestamp[1];

    let resultArr = [];

    MongoClient.connect(dburl, { useNewUrlParser: true },function(err, client){
        console.log("search terms are: ");
        var db = client.db('atlassian');

        // Get the documents collection
        var collection = db.collection('searchterms');

        //We have a cursor now with our find criteria
        var cursor = collection.find({
            date: {"$gte": new Date(currentYear+"-"+currentMonth+"-01T00:00:00.000Z") , "$lt": new Date(currentYear+"-"+currentMonth+"-28T16:17:36.470Z") }});

        //We need to sort by age descending
        cursor.sort({count: -1,date: -1});

        
        //Limit to max 10 records
        cursor.limit(10);
        //Skip specified records. 0 for skipping 0 records.
        cursor.skip(0);
        console.log("test1");
        //Lets iterate on the result
        cursor.each(function (err, doc) {
            if(err) {
                console.log(err);
            }else{
                console.log('Fetched:', doc);
                if(doc !== null){ 
                    //console.log(doc.name);
                    resultArr.push(doc.name);
                }else{
                    client.close();
                    res.send(resultArr);
                
                }
            }
        });
        console.log("test2");
        
    });

    console.log("test3");
});





app.get('/search/:search_term', function(req, res) { 
    
    var searchTerm =  req.params.search_term;
    searchTerm = searchTerm.toLowerCase();

    MongoClient.connect(dburl, { useNewUrlParser: true },function(err, client){

            var db = client.db('atlassian');


            db.collection('searchterms').updateOne(
                {name: searchTerm},
                {$set:{ date: new Date(Date.now())},$inc:{count:1}},
                {upsert: true}
            );

            client.close();

        });
    
});

app.get('/jira/:jira_search', function(req, res) { 
    
    var jiraSearchTerm =  req.params.jira_search;
    console.log('searchTerm = '+ jiraSearchTerm);

    var request = require('request');
   
   
    var options = {
    // JIRA server running on http://192.168.56.141:8080
     url: 'http://192.168.56.141:8080/rest/api/2/search?jql=summary~\"' + jiraSearchTerm +'\\u002a' +'\"',
     headers: globalHeader
     
    };
 
  
    request(options, function(error, response, body) {
     if (error) {
     return console.error(error);
     } else {
     console.log('data from API call = ' +JSON.stringify(body));
     res.send(body);
    }

    });
});


app.get('/bitbucket/:bitbucket_search', function(req, res) { 
    
    var bitbucketSearchTerm =  req.params.bitbucket_search;
    console.log('searchTerm = '+ bitbucketSearchTerm);

    var request = require('request');

    var request = require('request');
   
   
    var options = {
    //Bitbucket Server running on http://192.168.56.143:7990
     url: 'http://192.168.56.143:7990/rest/api/1.0/repos?name=' + bitbucketSearchTerm  ,
     headers: globalHeader
     
    };
 
  
    request(options, function(error, response, body) {
     if (error) {
     return console.error(error);
     } else {
     console.log('data from API call = ' +JSON.stringify(body));
     res.send(body);
    }

    });
});


app.get('/confluence/:confluence_search', function(req, res) { 
    
    var confluenceSearchTerm =  req.params.confluence_search;
    console.log('searchTerm = '+ confluenceSearchTerm);

    var request = require('request');

    var request = require('request');
   
   
   
    var options = {
     
    //confluence server running on http://192.168.56.142:8090
     url: 'http://192.168.56.142:8090/rest/api/content/search?expand=space,body,version,container,history&'+'cql=(type=page)and(title ~ "'+ confluenceSearchTerm +'*"' +' OR '+ 'text ~ "' + confluenceSearchTerm + '*"'+ ' ) ' ,
     headers: globalHeader
     
    };
 
 
  
    request(options, function(error, response, body) {
     if (error) {
     return console.error(error);
     } else {
     console.log('data from API call = ' +JSON.stringify(body));
     res.send(body);
    }

    });
});



app.listen(3002, function() {
console.log('Server running at http://localhost:3002/');
});