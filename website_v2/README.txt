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

{"_id":{"$oid":"5ffa051be0bbe14d8098ef7e"},"time":1610220827495,"sound":31.156737760636094,"light":333.89071213070866,"temperature":28.268844547523557,"humidity":40.06975705634385,"air":{"co2":247.9267737201285,"pm10":11.64099441703846,"no2":45.51175105378767}}

then you can start the backend, to run it open a cmd and run:

node app.js

if it gives some errors about missing packages just install them:

npm install name_of_the_package --save

