//var neo4j = require('neo4j-driver');
var ArchGraphServer = require('./ArchGraph.js');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

// var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
// var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
// var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;
// var driver = neo4j.driver(
//     graphenedbURL, 
//     neo4j.auth.basic(
//         graphenedbUser, 
//         graphenedbPass),
//         { encrypted : "ENCRYPTION_ON", trust: "TRUST_ALL_CERTIFICATES"}
//     );
//     driver.onError = (error) => {console.log(error); };
//console.log(process.env.GRAPHENEDB_BOLT_URL);


//playing with popoto - doesn't use bolt driver
//var session = driver.session();

const app = express();
ArchGraphServer.applyMiddleware({app});

app
.use(express.static(path.join(__dirname, '/')))
//.use('/graph', ArchGraph)
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req,res) => res.render('pages/index'))
.listen(PORT, () => console.log(`Listening on ${ PORT } and apollo at ${ArchGraphServer.graphqlPath}`))

// var session = driver.session();

// session.run('MATCH (n:Domain) return n.name')
// .subscribe({
//     onKeys: keys => {
//         console.log(keys)
//       },
//       onNext: record => {
//         console.log(record.get('name'))
//       },
//       onCompleted: () => {
//         session.close() // returns a Promise
//       },
//       onError: error => {
//         console.log(error)
//       }
// })