#include <math.h>
#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>

//Sensors
const int B = 4275;               // B value of the thermistor
const int R0 = 100000;            // R0 = 100k
const int pinTempSensor = A0;     // Grove - Temperature Sensor connect to A0
const int pinSound = A1;               // pin of Sound Sensor
const int pinLight = A2;          // pin of Sound Sensor

String temp_str; //see last code block below use these to convert the float that you get back from DHT to a string =str
String light_str;
String sound_str;
char temp[50];
char light[50];
char sound[50];

#if defined(ARDUINO_ARCH_AVR)
#define debug  Serial
#elif defined(ARDUINO_ARCH_SAMD) ||  defined(ARDUINO_ARCH_SAM)
#define debug  SerialUSB
#else
#define debug  Serial
#endif

// Update these with values suitable for your network.
byte mac[]    = {0x90, 0xA2, 0xDA, 0x10, 0x82, 0x91};
IPAddress ip(192, 168, 15, 10);
IPAddress server(192, 168, 15, 1);

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i=0;i<length;i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

EthernetClient ethClient;
PubSubClient client(ethClient);

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("arduinoClient")) {
      Serial.println("connected");
      client.publish("test", "Connected");
      //client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup()
{
  Serial.begin(57600);
  client.setServer(server, 1883);
  client.setCallback(callback);

  Ethernet.begin(mac, ip);
  // Allow the hardware to sort itself out
  delay(1500);
}

void loop()
{
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  int a = analogRead(pinTempSensor);
  int soundValue = analogRead(pinSound);
  int lightvalue = analogRead(pinLight);
  float R = 1023.0/a-1.0;
  R = R0*R;
  float temperature = 1.0/(log(R/R0)/B+1/298.15)-273.15; // convert to temperature via datasheet

  temp_str = String(temperature); //converting ftemp (the float variable above) to a string 
  temp_str.toCharArray(temp, temp_str.length() + 1); //packaging up the data to publish to mqtt whoa...

  light_str = String(lightvalue); //converting ftemp (the float variable above) to a string 
  light_str.toCharArray(light, light_str.length() + 1); //packaging up the data to publish to mqtt whoa...

  sound_str = String(soundValue); //converting ftemp (the float variable above) to a string 
  sound_str.toCharArray(sound, sound_str.length() + 1); //packaging up the data to publish to mqtt whoa...
     
  client.publish("AIP/S108/temperature", temp);
  client.publish("AIP/S108/light", light);
  client.publish("AIP/S108/sound", sound);
  
  Serial.print("temperature = ");
  Serial.println(temperature);
  Serial.print("light = ");
  Serial.println(light);
  Serial.print("sound = ");
  Serial.println(sound);

  delay(10000);
}
