#!/usr/bin/env bash 
#Use !/bin/bash -x  for debugging 

readonly SCRIPT_NAME=$(basename "$0")
readonly SCRIPT_PATH=${0:A}
readonly SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

if [ ! -z "${DEBUG_ENVIRONMENT}" ];then 
    env
    export
fi
#****************************************************************************
#** Print out usage
#****************************************************************************

function help() {
    local EXITCODE=0

    cat <<- EOF
usage: $SCRIPT_NAME options

Clean, Build or Test

OPTIONS:
    -a --action              [clean|build|test]
    
    -h --help                show this help

Examples:
    $SCRIPT_NAME --action=clean 

EOF

    return ${EXITCODE}
}

#****************************************************************************
#** Main script 
#****************************************************************************

function main() {
    local EXITCODE=0
    local DEBUG=false  

    for i in "$@"
    do
    case $i in
        -a=*|--action=*)
            local -r ACTION="${i#*=}"
            shift # past argument=value
        ;;           
        --debug)
            set -x
            local -r DEBUG=true   
            #SKAFFOLD_DEBUG="--verbosity debug"          
            shift # past argument=value
        ;;          
        -h|--help)
            local -r HELP=true            
            shift # past argument=value
        ;;
        *)
            echo "Unrecognised ${i}"
        ;;
    esac
    done    

    #if [ -f .env ]; then
    #    echo "Importing .env file"
    #    source "./.env"
    #fi
    #if [ -z ${SEMVER} ]; then
    #    echo "SEMVER not defined"
    #fi 
    #if [ -z ${REPOSITORY_PATH} ]; then
    #    echo "REPOSITORY_PATH not defined"
    #fi

    if [ "${HELP}" = true ] ; then
        EXITCODE=1
        help
    else
        if [ "${ACTION}" ]; then
            case "${ACTION}" in
                help)
                    help
                ;;
                clean)
                    docker rmi express-echo-prod               
                    docker rmi express-echo-unittest
                    docker rmi express-echo-integrationtest
                ;;
                build)
                    docker build --target prod -t express-echo-prod .
                    docker build --target unittest -t express-echo-unittest .
                    docker build --target integrationtest -t express-echo-integrationtest .
                ;;
                test)
                    echo "********************"
                    echo "** Run unittests  **"
                    echo "********************"
                    docker run -it --rm express-echo-unittest
                    echo "********************"
                    echo "** Run integration tests  **"
                    echo "********************"
                    docker run -it --rm express-echo-integrationtest
                ;;                
                *)
                    echo "Unrecognised ${ACTION}"; 
                ;;
            esac
        else
            EXITCODE=1
            echo "No action specified use --action=<action>"
        fi
    fi
    return ${EXITCODE}
}

main "$@"








