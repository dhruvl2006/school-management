# School Management API

This API provides endpoints to manage school data and retrieve schools sorted by proximity to a given location.

## API Endpoints

### Add School
- **Endpoint:** POST `/addSchool`
- **Payload:**
  ```json
  {
    "name": "Example School",
    "address": "123 Education St",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```

### List Schools
- **Endpoint:** GET `/listSchools`
- **Query Parameters:**
  - `latitude`: User's latitude (float)
  - `longitude`: User's longitude (float)
- **Example:** `/listSchools?latitude=40.7128&longitude=-74.0060`

## Postman Collection

```json
{
  "info": {
    "name": "School Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Add School",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/addSchool",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["addSchool"]
        },
        "body": {
          "mode": "raw",
          "raw": "{\n    \"name\": \"Example School\",\n    \"address\": \"123 Education St\",\n    \"latitude\": 40.7128,\n    \"longitude\": -74.0060\n}"
        }
      }
    },
    {
      "name": "List Schools",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:3000/listSchools?latitude=40.7128&longitude=-74.0060",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["listSchools"],
          "query": [
            {
              "key": "latitude",
              "value": "40.7128"
            },
            {
              "key": "longitude",
              "value": "-74.0060"
            }
          ]
        }
      }
    }
  ]
}
```