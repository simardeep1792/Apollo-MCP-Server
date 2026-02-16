#!/bin/bash

# Start the Apollo MCP Server POC

echo "Starting Apollo MCP Server POC..."

# Start GraphQL server in background
echo "Starting GraphQL server on port 4001..."
npm start &
GRAPHQL_PID=$!

# Wait for GraphQL server to be ready
sleep 3

# Start MCP server
echo "Starting MCP server on port 8000..."
npm run dev

# Cleanup on exit
trap "echo 'Stopping servers...'; kill $GRAPHQL_PID 2>/dev/null; exit" INT TERM

wait