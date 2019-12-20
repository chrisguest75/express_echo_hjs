#!/usr/bin/env bash
echo "Start"
echo $(pwd)
echo $(which cgget)
export MAX_MEMORY=$(cgget -n --values-only --variable memory.limit_in_bytes /)
echo "MAX_MEMORY=${MAX_MEMORY}"

pushd /app
echo "Run app in the background"
npm start &
popd 

if [[ -z $CYPRESS_KEY ]]; then
    echo "Run without CYPRESS recording"
    $(npm bin)/cypress run --browser chrome --headless
else
    echo "Run using CYPRESS server recording"
    $(npm bin)/cypress run --key ${CYPRESS_KEY} --browser chrome --headless
fi



