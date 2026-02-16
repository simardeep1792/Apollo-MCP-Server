import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';

// Mock data for the POC
const mockData = {
  astronauts: [
    {
      id: '1',
      name: 'Alexander Gerst',
      nationality: 'German',
      currentMission: 'Expedition 70',
      launchDate: '2024-01-15',
      daysInSpace: 396,
      spaceStationId: '1'
    },
    {
      id: '2', 
      name: 'Sunita Williams',
      nationality: 'American',
      currentMission: 'Expedition 70',
      launchDate: '2024-01-15',
      daysInSpace: 396,
      spaceStationId: '1'
    },
    {
      id: '3',
      name: 'Yuki Tanaka',
      nationality: 'Japanese',
      currentMission: 'Expedition 70',
      launchDate: '2024-02-01',
      daysInSpace: 379,
      spaceStationId: '1'
    }
  ],
  spaceStations: [
    {
      id: '1',
      name: 'International Space Station',
      altitude: 408.0,
      capacity: 7
    }
  ]
};

const typeDefs = readFileSync('./schema.graphql', 'utf8');

const resolvers = {
  Query: {
    astronautsCurrentlyInSpace: () => mockData.astronauts,
    astronautById: (parent, { id }) => mockData.astronauts.find(a => a.id === id),
    spaceStations: () => mockData.spaceStations
  },
  Astronaut: {
    spaceStation: (parent) => mockData.spaceStations.find(s => s.id === parent.spaceStationId)
  },
  SpaceStation: {
    crew: (parent) => mockData.astronauts.filter(a => a.spaceStationId === parent.id)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`GraphQL server ready at ${url}`);