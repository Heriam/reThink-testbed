#!/bin/sh

cd ${0%/*}
DIR=`pwd`
echo "DIR is " $DIR

echo "starting hyperty toolkit ... linking dev-hyperty-toolkit and dev-hyperty as volumes into one container"
docker ps | grep toolkit

if [ $? -eq 0 ]; then
	echo "hyperty toolkit container already started ... "
else 
	echo "starting hyperty toolkit container in a screen session ..." 
	screen -d -m -S toolkit $DIR/dockerStart.sh
	echo DONE!
fi
