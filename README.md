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

### Done!
