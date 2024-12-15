#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { WordCounter } from "./wordCounter.js";

// Initialize the server and word counter
const server = new Server(
  {
    name: "mcp-wordcounter",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const wordCounter = new WordCounter();

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "analyze_text",
      description: "Count words and characters in a text document",
      inputSchema: {
        type: "object",
        properties: {
          filePath: {
            type: "string",
            description: "Path to the text file to analyze"
          }
        },
        required: ["filePath"]
      }
    }
  ]
}));

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "analyze_text") {
    throw new McpError(
      ErrorCode.MethodNotFound,
      `Unknown tool: ${request.params.name}`
    );
  }

  const filePath = request.params.arguments?.filePath;
  if (!filePath || typeof filePath !== "string") {
    throw new McpError(
      ErrorCode.InvalidParams,
      "File path parameter is required and must be a string"
    );
  }

  try {
    const stats = await wordCounter.analyzeFile(filePath);
    return {
      content: [
        {
          type: "text",
          text: `Analysis Results:
• Word count: ${stats.words}
• Character count (including spaces): ${stats.characters}
• Character count (excluding spaces): ${stats.charactersNoSpaces}`
        }
      ]
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Error analyzing file: ${error instanceof Error ? error.message : String(error)}`
        }
      ]
    };
  }
});

// Run the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Word Counter MCP server running on stdio");
}

main().catch(console.error);
