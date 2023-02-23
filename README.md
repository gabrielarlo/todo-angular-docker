## Todo List FE

### Requirements
1. Node v16
2. Yarn Package Manager
3. Angular CLI v14

### Installation
1. `yanr install` to install the dependencies
2. `ng serve` to serve the localhost web

**Please make sure that the backend is running on http://localhost:90**

### Setup
1. Update the environment at `environments/environment.ts` ang change the host variable.

```
const host: String = 'http://localhost:90';

export const environment = {
  production: false,
  api: host + '/api',
};
```

### For Docker
1. run `docker build -t angular-nginx-docker:v1.0.0 -f ./Dockerfile .`
2. then `docker run -p 4280:80 -d angular-nginx-docker:v1.0.0`

or

1. run `docker-compose up --build -d angular-nginx-docker`

### Done!
