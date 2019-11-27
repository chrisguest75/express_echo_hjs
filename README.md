# README.md

## TODO
A list of TODOs
- Add some unittests
- Fix HTML
- Improve the design
- Verbs - GET, POST, DELETE, UPDATE.


## Build

```
npm install
. ./.env
npm start
nodemon 
```

## Tests 




## VSCode
### Debug
To debug in VSCode please add the following to the launch.json
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
### Tasks


# Docker

```
docker build -t express-echo .
docker run -p 3000:3000 -it --rm express-echo
```

# Deploy to Kind

Deploy Kind cluster
```
kind create cluster --name mykind --wait 1m
```

Merge the Kind config 
```
cp ~/.kube/config ~/.kube/old-config
KUBECONFIG=/Users/[name]/.kube/kind-config-mykind:/Users/[name]/.kube/config kubectl config view --flatten > config.txt
cp ./config.txt ~/.kube/config
kubectl config get-contexts
kubectl get pods --all-namespaces
```
