#!/usr/bin/env bash
echo "Start"
echo $(pwd)
echo $(which cgget)
export MAX_MEMORY=$(cgget -n --values-only --variable memory.limit_in_bytes /)
echo "MAX_MEMORY=${MAX_MEMORY}"
npm $1
exit $?