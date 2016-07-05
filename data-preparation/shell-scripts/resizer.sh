#!/bin/bash

SOURCE="/home/gadgeteer/mol/images/"
ORIGINAL="/home/gadgeteer/Workspace/mol/web/code/plugins/http/public/images/products/original"
THUMBNAIL="/home/gadgeteer/Workspace/mol/web/code/plugins/http/public/images/products/thumbnail"

PROCESS=0
PROCESS=`ps | grep resizer.sh |grep -v grep |wc -l`
echo $PROCESS
if [ $PROCESS -le 2 ]; then
  echo "Process is about to run."
  
  # sync folder structure
  # rsync -a -f "+ */" -f "- *" $SOURCE $ORIGINAL
  # rsync -a -f "+ */" -f "- *" $SOURCE $THUMBNAIL

  find $SOURCE -iname "*.jpg" | while read file
  do
    echo "Resizing file"
    mogrify -resize 250x -strip -format jpg -compress jpeg -verbose -path $THUMBNAIL $file
    mogrify -resize 500x -strip -format jpg -compress jpeg -verbose -path $ORIGINAL $file
  done
else
  echo "Process is already running!."
fi