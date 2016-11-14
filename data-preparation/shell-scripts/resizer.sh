#!/bin/bash

SOURCE="/media/mol/"
ORIGINAL="/var/www/mol/web/code/plugins/http/public/images/products/original"
THUMBNAIL="/var/www/mol/web/code/plugins/http/public/images/products/thumbnail"

PROCESS=0
PROCESS=`ps | grep resizer.sh |grep -v grep |wc -l`
echo $PROCESS
if [ $PROCESS -le 2 ]; then
  echo "Process is about to run."

  # sync folder structure
  # rsync -a -f "+ */" -f "- *" $SOURCE $ORIGINAL
  # rsync -a -f "+ */" -f "- *" $SOURCE $THUMBNAIL

  find $SOURCE -iname "*.jpg" -or -iname "*.jpeg" -type f -ctime -2 | while read file
  do
    echo "Resizing file"
    mogrify -resize 120x -strip -format jpg -compress jpeg -verbose -path $THUMBNAIL "$file"
    mogrify -resize 500x -strip -format jpg -compress jpeg -verbose -path $ORIGINAL "$file"
  done
else
  echo "Process is already running!."
fi
