# Ranked-Vote

A ranked voting system with github authentication.

# Local testing

Install the dependencies:
```bash
npm install
```

Run the server:
```bash
# The github client id and secret can be found on the integration page
GITHUB_CLIENT_ID=... GITHUB_CLIENT_SECRET=... npm start
```

Additional options that can be set via enviroment variables:
```
PORT        -  the port node listens on (defaults to 3000)
NODE_ENV    -  the enviroment node runs on (development, production and test) 
               and defaults to development
```
