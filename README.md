# Letta Bare Proxy

A lightweight, authentication-free proxy server for the Letta API. This proxy handles CORS, request forwarding, and API key management while maintaining a minimal footprint.

## Features

- 🔄 Request forwarding to Letta API
- 🌐 CORS support
- 📝 Request logging
- 🐳 Docker support
- 🏥 Health check endpoint

## Prerequisites

- Node.js >= 20.0.0
- Docker (optional)

## Environment Variables

```env
# Required
LETTA_API_URL=http://your-letta-api-url
# Optional
LETTA_API_KEY=your-letta-api-key

# Optional
PORT=3000
ENABLE_LOGGING=true
ALLOWED_ORIGINS=*
ALLOWED_METHODS=*
ALLOWED_HEADERS=*
EXPOSE_HEADERS=*
CORS_MAX_AGE=86400
```

## Quick Start

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmedrowaihi/letta-bare-proxy.js.git
   cd letta-bare-proxy.js
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:

   ```env
   LETTA_API_URL=http://your-letta-api-url
   LETTA_API_KEY=your-letta-api-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Docker

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

## API

### Health Check

```http
GET /health
```

Response:

```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

## License

MIT

```
open http://localhost:3000
```
