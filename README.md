### Express.js CRUD API (Todos)

A simple Express.js CRUD API with in-memory storage for a `todos` resource. Includes CORS, JSON parsing, logging, health check, and error handling.

### Requirements
- Node.js 18+

### Setup
```bash
npm install
```

### Run
- Development (auto-reload):
```bash
npm run dev
```
- Production:
```bash
npm start
```

Server: `http://localhost:3000`

### Health Check
```bash
curl http://localhost:3000/health
```

### Todos Endpoints (base: `/api/todos`)
- Create
```bash
curl -X POST http://localhost:3000/api/todos \
  -H 'Content-Type: application/json' \
  -d '{"title":"Hoc Express","completed":false}'
```
- List
```bash
curl http://localhost:3000/api/todos
```
- Get by id
```bash
curl http://localhost:3000/api/todos/1
```
- Update (PUT)
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H 'Content-Type: application/json' \
  -d '{"title":"Hoc Express nang cao","completed":true}'
```
- Patch (partial)
```bash
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H 'Content-Type: application/json' \
  -d '{"completed":true}'
```
- Delete
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

### Notes
- Data is in-memory and resets on restart. Use a DB for persistence.
- Env var `PORT` overrides default `3000`.

