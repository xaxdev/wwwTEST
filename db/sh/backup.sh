#!/bin/sh

ROOT="./data/backup/mongodb"
EXTENSION=".gz"

# configure AWS CLI (e.g. use IAM role for S3 access)
export AWS_CONFIG_FILE=/home/mol/.aws/config

CMD_AWS=$(which aws)
CMD_DATE=$(which date)
CMD_MKDIR=$(which mkdir)
CMD_MONGODUMP=$(which mongodump)

FOLDER=$(${CMD_DATE}  +"%Y/%m")
PATH=${ROOT}/${FOLDER}
FILE=${PATH}/$(${CMD_DATE} +"%Y%m%d_%H%M%S")${EXTENSION}

${CMD_MKDIR} ${PATH} -p

${CMD_MONGODUMP} -h 10.128.133.78:27017 -d mol_development --archive=${FILE} --gzip
#${CMD_MONGODUMP} -h 192.168.1.93:27017 -d mol_development --archive=${FILE} --gzip

${CMD_AWS} s3 cp ${FILE} s3://mouawad/mol/backup/mongodb/data/${FOLDER}/
