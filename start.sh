# START APPLICATION SCRIPT

clear

echo "Start the monster"

cd /srv/books/
service mongodb stop
nohup mongod &
nohup grunt start-server&
nohup node server /srv/githook/server.js&
