var  neo4jgraphqljs = require('neo4j-graphql-js');
var  ApolloServer = require('apollo-server-express');
var express = require('express');
var neo4j = require('neo4j-driver');
var router = express.Router();


var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;
var driver = neo4j.driver(
    graphenedbURL, 
    neo4j.auth.basic(graphenedbUser, graphenedbPass),
    { encrypted : "ENCRYPTION_ON", trust: "TRUST_ALL_CERTIFICATES"}
    );
console.log(process.env.GRAPHENEDB_BOLT_URL);

var session = driver.session();
//console.log(session);
// session.run('MATCH (n:Domain) return n')
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




const typeDefs = `
    type Capability {
        name: String
        description: String
    }
    type Domain {
        name: String
        capabilities: [Capability] @relation(name: "contains", direction: "OUT")
    }

`;

const schema = neo4jgraphqljs.makeAugmentedSchema({typeDefs});

const server = new ApolloServer.ApolloServer({schema, context: {driver}, playground:true});


// router.get('/', function(req, res) {
//     res.send(apollo.listen(3003, '0.0.0.0').then(({url}) => {
//         console.log(`GraphQL API ready at ${url}`);
//     }));
// });


module.exports = server;