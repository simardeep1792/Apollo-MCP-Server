# Apollo MCP Server POC

A proof of concept implementation of Apollo MCP Server that exposes GraphQL operations as MCP tools for AI clients like Claude.

## Features

- GraphQL API with astronaut and space station data
- Apollo MCP Server integration
- Sample queries accessible as MCP tools
- Claude Desktop integration ready

## Setup

### Prerequisites

- Node.js v18+
- Rover CLI v0.37+

### Installation

1. Install dependencies:

```bash
npm install
```

1. Start the GraphQL server:

```bash
npm start
```

1. In a new terminal, start the MCP server:

```bash
npm run dev
```

### Claude Desktop Integration

Add the following to your Claude Desktop settings (claude-mcp-config.json):

```json
{
  "mcpServers": {
    "apollo-astronauts": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://127.0.0.1:8000/mcp"
      ]
    }
  }
}
```

## Available MCP Tools

- **GetAstronautsCurrentlyInSpace**: Get all astronauts currently in space
- **GetAstronautById**: Get details of a specific astronaut by ID
- **GetSpaceStations**: Get all space stations and their crew

## Testing

Once both servers are running and Claude is configured:

1. Ask Claude: "Show me the astronauts currently in space"
2. Ask Claude: "Get details for astronaut with ID 1"
3. Ask Claude: "What space stations are currently operational?"

## Project Structure

```text
├── schema.graphql           # GraphQL schema definition
├── index.js                 # GraphQL server implementation
├── supergraph.yaml         # Apollo Router configuration
├── .apollo/
│   └── mcp.local.yaml      # MCP server configuration
└── claude-mcp-config.json  # Claude Desktop integration config
```
