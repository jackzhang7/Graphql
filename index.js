const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const books = [
  {
    id: '1',
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    rating: '4.46',
  },
  {
    id: '2',
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    genre: 'Sci-Fi',
    rating: '3.98',
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Literary Fiction',
    rating: '4.25',
  },
  {
    id: '4',
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    genre: 'Sci-Fi',
    rating: '3.98',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { id: String, title: String, author: String, genre: String, rating: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

app.use(cors())

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});