var neo4j = require('neo4j-driver');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;
console.log(graphenedbURL);
var driver = neo4j.driver(
    graphenedbURL, 
    neo4j.auth.basic(graphenedbUser, graphenedbPass),
    { encrypted : true}
    );

var session = driver.session();

express()
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.get('/', (req,res) => res.render('pages/index'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))

// session
//     .run("CREATE (n:Person {name: 'Bob'}) RETURN n.name")
//     .then(function(result) {
//         result.records.forEach(function(record) {
//             console.log(record)
//         });
//         session.close();
//     })
//     .catch(function(error) {
//         console.log(error);
//     });