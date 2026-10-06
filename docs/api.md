# API Reference

Base URL: `/api/v1`. All responses use one envelope:

```json
{ "success": true, "data": {}, "message": "Success", "timestamp": "2026-01-18T12:00:00.000Z" }
```

## Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Liveness check |

## Contacts

| Method | Path | Description |
|--------|------|-------------|
| GET | `/contact/list` | List contacts |
| GET | `/contact/:id` | Get one |
| POST | `/contact` | Create |
| PUT | `/contact/:id` | Update |
| DELETE | `/contact/:id` | Delete |

## Tasks

| Method | Path | Description |
|--------|------|-------------|
| GET | `/task/list` | List tasks |
| GET | `/task/:id` | Get one |
| POST | `/task/create` | Create |
| PUT | `/task/:id` | Update |
| PATCH | `/task/:id/status` | Change status only |
| DELETE | `/task/:id` | Delete |

## Projects

| Method | Path | Description |
|--------|------|-------------|
| GET | `/project/list` | List projects |
| GET | `/project/:id` | Get one |
| POST | `/project/create` | Create |
| PUT | `/project/:id` | Update |
| DELETE | `/project/:id` | Delete |
| GET | `/project/:id/members` | List members |
| POST | `/project/:id/members` | Add a contact as member |
| DELETE | `/project/:id/members/:contactId` | Remove member |

## Try it

```bash
curl http://localhost:8080/api/v1/contact/list
```

Request bodies are validated with [celebrate](https://github.com/arb/celebrate) (Joi); see
`src/server/middleware/validate.js` and the schemas at the top of each route file.
