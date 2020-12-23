Configuration, 

Enable replication: first you need to stop the mongo server, then find the conf file,
in windows: "C:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg"
in linux "/etc/mongod.conf"

and add:

replication:
  replSetName: "rs0"

then start the mongo server again, open mongo shell in a cmd and run:

rs.initiate()

then you should post some data in the database database_iot.sensors
with the following structure:

{"time":1607283006838,"sound":100,"light":25,"temperature":5}

then you can start the backend, to run it open a cmd and run:

node app.js

if it gives some errors about missing packages just install them:

npm install name_of_the_package --save

