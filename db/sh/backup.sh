#!/bin/sh

ROOT="./data/backup/mongodb"
EXTENSION=".gz"

FOLDER=$(/bin/date +"%Y/%m")
PATH=${ROOT}/${FOLDER}
FILE=${PATH}/$(/bin/date +"%Y%m%d_%H%m")${EXTENSION}

/bin/mkdir ${PATH} -p

/usr/bin/mongodump -h 10.128.133.78:27017 -d mol_development --archive=${FILE} --gzip
#/usr/bin/mongodump -h 192.168.1.93:27017 -d mol_development --archive=${FILE} --gzip

/usr/bin/aws s3 cp ${FILE} s3://mouawad/mol/backup/mongodb/data/${FOLDER}/
