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
# ESLint
An ESLint config file have been added for those that want to use it. It is based on 
[Felix Geisendörfer's](http://felixge.de/)[Node.js Style Guide](https://github.com/felixge/node-style-guide)
with tweaks to the rules on indentation(4 Spaces instead of 2) and the allowed length of lines (100 instead of 80).  

Currently ESLint is not part of the project. To use it please install it globaly (or without
saving it in the package.json file).
