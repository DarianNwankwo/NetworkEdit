#!/bin/bash

# Functions
ok() { echo -e $1; } # Green

EXPECTED_ARGS=2
E_BADARGS=65
MYSQL=`which mysql`
 
Q1="CREATE DATABASE IF NOT EXISTS $1;"
Q2="GRANT ALL PRIVILEGES ON *.* TO '$2'@localhost;"
Q3="FLUSH PRIVILEGES;"
SQL="${Q1}${Q2}${Q3}"
 
if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: $0 dbname dbuser dbpass"
  exit $E_BADARGS
fi
 
$MYSQL -u $2 -p -e "$SQL"

ok "Database $1 created. Privileges have been granted to $2"
