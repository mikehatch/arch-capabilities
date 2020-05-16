var neo4j = require('neo4j-driver');

var graphenedbURL = "bolt://hobby-iagiodcaabamgbkehkddebel.dbs.graphenedb.com:24787";
                     //bolt://hobby-iagiodcaabamgbkehkddebel.dbs.graphenedb.com:24787
                     
                     
var graphenedbUser = "app171348509-tyuNjg";
var graphenedbPass = "b.LwDdnI5KFmjn.J5aFU9W2SApkRBKm";
//var graphenedbUser = "test";
//var graphenedbPass = "b.pLEoTI7SaOBx.qThtA65znqiDuMXR";
console.log(graphenedbURL);
var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));

var session = driver.session();

session
    .run("match (n}) RETURN n.name")
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });
        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });