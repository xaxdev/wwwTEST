#!/bin/bash

SOURCE="/media/oldmol/"
ORIGINAL="/home/mol/www/projects/mol/web/code/plugins/http/public/images/products/original"
THUMBNAIL="/home/mol/www/projects/mol/web/code/plugins/http/public/images/products/thumbnail"

PROCESS=0
PROCESS=`ps | grep resizer.sh |grep -v grep |wc -l`
echo $PROCESS
if [ $PROCESS -le 2 ]; then
    echo "Process is about to run."

    # sync folder structure
    # rsync -a -f "+ */" -f "- *" $SOURCE $ORIGINAL
    # rsync -a -f "+ */" -f "- *" $SOURCE $THUMBNAIL

    find $SOURCE -iname "*.jpg" -or -iname "*.jpeg" -or -iname "*.JPG" -type f -ctime -2 | while read file
    do
        echo "Resizing file"
        mogrify -resize 120x -strip -compress jpeg -verbose -path $THUMBNAIL "$file"
        mogrify -resize 500x -strip -compress jpeg -verbose -path $ORIGINAL "$file"

        fname=$(echo "$file" | awk -F'/' '{print $NF}')
        fbname="${fname%.*}"
        ext="${file##*.}"
        len=${#ext}
        reg="\.[^.]*[A-Z][^.]*$"
        if [[ $file =~ $reg ]]; then
            echo "Found incorrect extension"
            if [[ $len == 3 ]]; then
                mogrify -format jpg -path $THUMBNAIL $THUMBNAIL/$fbname.$ext
                mogrify -format jpg -path $ORIGINAL $ORIGINAL/$fbname.$ext
                rm -rf $THUMBNAIL/$fbname.$ext
                rm -rf $ORIGINAL/$fbname.$ext
            else
                mogrify -format jpeg -path $THUMBNAIL $THUMBNAIL/$fbname.$ext
                mogrify -format jpeg -path $ORIGINAL $ORIGINAL/$fbname.$ext
                rm -rf $THUMBNAIL/$fbname.$ext
                rm -rf $ORIGINAL/$fbname.$ext
            fi
        fi
    done
else
    echo "Process is already running!."
fi
