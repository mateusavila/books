# START APPLICATION SCRIPT

clear

echo "Start the monster"

cd /srv/books/
service mongodb stop
mongod&
forever start -c nodemon /srv/books/server.js
