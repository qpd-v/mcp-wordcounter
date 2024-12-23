# MCP Word Counter
[![smithery badge](https://smithery.ai/badge/mcp-wordcounter)](https://smithery.ai/server/mcp-wordcounter)

A Model Context Protocol server that provides tools for analyzing text documents, including counting words and characters. This server helps LLMs perform text analysis tasks by exposing simple document statistics functionality.

## Features

- Count words in documents
- Count total characters (including spaces)
- Count characters excluding spaces
- Process files directly without exposing content to LLMs

## Installation

### Installing via Smithery

To install Word Counter for Claude Desktop automatically via [Smithery](https://smithery.ai/server/mcp-wordcounter):

```bash
npx -y @smithery/cli install mcp-wordcounter --client claude
```

### Manual Installation
```bash
npm install mcp-wordcounter
```

## Usage

### As a CLI tool

```bash
npx mcp-wordcounter
```

### In Claude Desktop

Add to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "mcp-wordcounter": {
      "command": "npx",
      "args": ["-y", "mcp-wordcounter"],
      "alwaysAllow": ["analyze_text"]
    }
  }
}
```

### Available Tools

#### analyze_text

Counts words and characters in a text document.

Parameters:
- `filePath` (string, required): Path to the text file to analyze

Returns:
- Word count
- Character count (including spaces)
- Character count (excluding spaces)

Example response:
```json
{
  "content": [{
    "type": "text",
    "text": "Analysis Results:\n• Word count: 150\n• Character count (including spaces): 842\n• Character count (excluding spaces): 702"
  }]
}
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in watch mode during development
npm run watch

# Test with MCP Inspector
npm run inspector
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
