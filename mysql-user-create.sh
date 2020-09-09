#!/bin/bash
# Functions
ok() { echo -e $1; } # Green

EXPECTED_ARGS=2
E_BADARGS=65
MYSQL=`which mysql`
 
Q1="CREATE USER IF NOT EXISTS '$1'@'localhost' IDENTIFIED BY '$2';"
Q2="ALTER USER '$1'@'localhost' IDENTIFIED WITH mysql_native_password BY '$2';"
SQL="${Q1}${Q2}"
 
if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: $0 dbuser dbpass"
  exit $E_BADARGS
fi
 
$MYSQL -uroot -p -e "$SQL"

ok "User $1 created with a password $2"
