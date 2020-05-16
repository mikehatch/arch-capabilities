var neo4j = require('neo4j-driver');

//var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbURL = "bolt://0.0.0.0:7475"; 
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;
console.log(graphenedbURL);
var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));

var session = driver.session();


session
    .run("CREATE (n:Person {name: 'Bob'}) RETURN n.name")
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });
        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });