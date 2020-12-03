# User Service

  A user service that fetches users from [Kartoffel](https://github.com/rabiran/Kartoffel) using [Spike Proxy Service (Outgoing)](https://gitlab.com/yesodot/rnd/terminal-rabaz/shared/spike-proxy-service).

  The service should always be connected to a `Spike Proxy Service` service.
  If you want to run it with the `docker-compose.yml` make sure you have an image of `Spike Proxy Service`.

## API Endpoints
| Method 	| Endpoint          	        | Description                                   | Example           	          |
|--------	|-----------------------------  |-------------------------------------------- |------------------------------ |
| GET     | /api/users/:id                | Get user by ID                              | /api/users/1234567            |
| GET    	| /api/users/?partialName       | Find users by partial name (up to 20)       | /api/users/?partialName=nike	|
