# Cozy_Room_App
the aim of this IoT school project is to provide the "coziness" of the classrom by:
1.-Sensing data using arduino in this case Temperature, Light, Sound + some emulated data (pm2.5, CO2, NO, Humidity) due to hardware limitations
2.-Publish it in a local MQTT broker
3.-Suscribe to the broker using Node-Red 
4.-Posting it in MongoDB
5.-Provide a website where some indexes are calculated according to the preferences of the user
6.-Provide a REST API where the user can get the latest or history data and used for his own app 

The hardware used for the project was arduino uno and raspberry pi 3

Dependencies: Mosquitto Broker, MongoDB, NodeJS, Arduino
