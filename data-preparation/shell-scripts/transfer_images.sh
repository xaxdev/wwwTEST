#!/bin/bash

SOURCE="projects/products/"
DESTINATION="projects/pd/"

PROCESS=0
PROCESS=`ps | grep transfer_images.sh |grep -v grep |wc -l`
echo $PROCESS
if [ $PROCESS -le 2 ]; then
  echo "Process is about to run."

  find $SOURCE -type f -ctime -2 | while read file
  do
    rsync -au $SOURCE $DESTINATION
    sum1=`sum $SOURCE`
    sum2=`sum $DESTINATION`

    if [ "$sum1" = "$sum2" ]; then
	    echo "Process is already running!."
	    exit 0
    fi
  done
else
  echo "Process is already running!."
fi
