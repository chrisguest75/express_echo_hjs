# README.md

## TODO
A list of TODOs
- Add some unittests
- Add codecoverage ability.
- Fix HTML
- Improve the design
- Add an OOM endpoint
- Is there a better way of handling accept header? 

## Build

```
npm install
. ./.env
npm start
nodemon 
```

## Tests 

Running the unittests
```
mocha tests
```

Running the integration tests
```
nodemon
$(npm bin)/cypress run
```

Run in interactive mode.
```
$(npm bin)/cypress open
```

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
Some tasks have been added for vscode.  

# Docker
Building a local container and running locally for testing.  
Run server in docker
```
docker build --target prod -t express-echo .
docker run -p 3000:3000 -it --rm express-echo
open http://localhost:3000
```

Run unittests in docker
```
docker build --target unittest -t express-echo-unittest .
docker run -it --rm express-echo-unittest
open http://localhost:3000
```

Run integrationtests in docker
```
docker build --target integrationtest -t express-echo-integrationtest .
docker run -it --rm express-echo-integrationtest
open http://localhost:3000
```

# Deploy to Kind with Cloud Code
You'll need to install Kind and the VSCode Cloud Code Extension

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

# CloudBuild integration 
Create a cloudbuild trigger 
```
gcloud beta builds triggers create github --repo-name=express_echo_hjs  --repo-owner=chrisguest75 --branch-pattern=".*" --build-config=cloudbuild.yaml --project open-source-01
```

```
gcloud builds submit --project open-source-01 --substitutions=COMMIT_SHA=test,REPO_NAME=express_echo_hjs,_IMAGE_NAME=express_echo_hjs,BRANCH_NAME=master
```