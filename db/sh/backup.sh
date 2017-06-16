#!/bin/sh

ROOT="/data/backup/mongodb"
EXTENSION=".gz"

PATH=${ROOT}/$(date +"%Y/%m")
FILE=${PATH}/$(/bin/date +"%Y%m%d_%H%m")${EXTENSION}

/bin/mkdir ${PATH} -p

/usr/bin/mongodump -h 192.168.1.93:27017 -d mol_development --archive=${FILE} --gzip

aws s3 cp s3://mouawad/mol/backup/mongodb/data/ ./data/backup/mongodb/${FILE}
