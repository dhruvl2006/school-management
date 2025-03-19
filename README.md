# School Management API

This API provides endpoints to manage school data and retrieve schools sorted by proximity to a given location.

## Base URL

The API is deployed and accessible at: `https://school-management-udky.onrender.com`

## API Endpoints

### Add School

- **Endpoint:** POST `/addSchool`
- **Full URL:** `https://school-management-udky.onrender.com/addSchool`
- **Payload:**
  ```json
  {
  	"name": "Example School",
  	"address": "123 Education St",
  	"latitude": 40.7128,
  	"longitude": -74.006
  }
  ```

### List Schools

- **Endpoint:** GET `/listSchools`
- **Full URL:** `https://school-management-udky.onrender.com/listSchools`
- **Query Parameters:**
  - `latitude`: User's latitude (float)
  - `longitude`: User's longitude (float)
- **Example:** `/listSchools?latitude=40.7128&longitude=-74.0060`

### Health Check

- **Endpoint:** GET `/health`
- **Full URL:** `https://school-management-udky.onrender.com/health`
- **Description:** Returns status of the API

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
					"raw": "https://school-management-udky.onrender.com/addSchool",
					"protocol": "https",
					"host": ["school-management-udky", "onrender", "com"],
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
					"raw": "https://school-management-udky.onrender.com/listSchools?latitude=40.7128&longitude=-74.0060",
					"protocol": "https",
					"host": ["school-management-udky", "onrender", "com"],
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
		},
		{
			"name": "Health Check",
			"request": {
				"method": "GET",
				"url": {
					"raw": "https://school-management-udky.onrender.com/health",
					"protocol": "https",
					"host": ["school-management-udky", "onrender", "com"],
					"path": ["health"]
				}
			}
		}
	]
}
```
