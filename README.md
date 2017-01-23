# Ranked-Vote

A ranked voting system with github authentication.

# Local testing

You need to have node.js installed ([Download](https://nodejs.org/en/)), then restart, after restarting call `npm update`.

Install the dependencies:
```bash
npm install
```

Now you need to get your github client id and secret id so I would suggest create an OAuth just for Ranked-Vote.  Go to github settings (personal settings), then go to `OAuth applications` then click `Register a new application`.  Then make sure your application settings look like this:
![image](https://cloud.githubusercontent.com/assets/22880786/22193369/f222d1c0-e18e-11e6-8e5e-fe10f6d235eb.png)

Now you can choose to run the server:
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
