# README.md

## TODO
A list of TODOs
- Add some unittests
- Dockerise it
- Improve the design
- Add a wait loop
- Content types - application/json text/html..
- Inputs for query values
- Verbs - GET, POST, DELETE, UPDATE.


## Build

```
npm install
. ./.env
npm start
nodemon 
```

## Tests 




## Debug

```
        {
            "type": "node",
            "request": "launch",
            "name": "Launch via NPM",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run-script",
                "debug"
            ],
            "port": 9229,
            "skipFiles": [
                "<node_internals>/**"
            ]
        },

```

# Docker

```
docker build -t express-echo .
```