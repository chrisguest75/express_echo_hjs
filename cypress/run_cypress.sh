#!/usr/bin/env /bin/bash
pushd /app
echo "Run app in the background"
npm start &
popd 

if [[ -z $CYPRESS_KEY ]]; then
    echo "Run without CYPRESS recording"
    $(npm bin)/cypress run 
else
    echo "Run using CYPRESS server recording"
    $(npm bin)/cypress run --key ${CYPRESS_KEY}
fi



