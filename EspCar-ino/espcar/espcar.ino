/*
	Copyright (c) 2020  Marco Concepcion <Git: mayuk24 , Email: m4yuk24@gmail.com>
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/

#include <ESP8266WiFi.h>
#include <SocketIoClient.h>
#include <ArduinoJson.h>

const char* SSID = "YOUR-SSID";
const char* PASS = "YOUR-PASS";

const char* SERVER = "YOUR-HOST";
int SERVERPORT = YOUR-PORT;

WiFiClient espClient;
SocketIoClient webSocket;

const int in1 = D2 ;
const int in2 = D5;
const int in3 = D6;
const int in4 = D8;

void setup() {
 Serial.begin(115200);
 wifiSetup();
 webSocket.begin(SERVER, SERVERPORT);
 webSocket.on("connect",response);
 webSocket.on("moving", controlled);
}
void loop() {
 webSocket.loop();
}
void response(const char* message, size_t length){
 webSocket.emit("identify","\"esp\"");
}
void controlled(const char* message, size_t length){
 DynamicJsonDocument doc(1024);
 deserializeJson(doc, message);

 int dirgir = doc["dirgir"];
 int d = doc["d"];
 int i = doc["i"];

 Serial.print("d = ");
 Serial.print(d);
 Serial.print("\t i = ");
 Serial.println(i);
 Serial.print("direction = ");
 Serial.println(dirgir); 

 if( dirgir == 1 ){
	 
	 analogWrite(in1, d);
	 analogWrite(in3, i);
	 
	 analogWrite(in2, 0);
	 analogWrite(in4, 0);

 }
 else if(dirgir == 2 ){
	 analogWrite(in1, 0);
	 analogWrite(in3, 0);
	 
	 analogWrite(in2, d);
	 analogWrite(in4, i);
 }
 else{
	 analogWrite(in1, 0);
	 analogWrite(in3, 0);
	 
	 analogWrite(in2, 0);
	 analogWrite(in4, 0);
 }
}
void wifiSetup(){
delay(10);
 Serial.println();
 Serial.print("Connecting to ");
 Serial.println(SSID);
 WiFi.begin(SSID, PASS);
 while (WiFi.status() != WL_CONNECTED) {
	 delay(500);
	 Serial.print(".");
 }
 randomSeed(micros());
 Serial.println("");
 Serial.println("WiFi connected");
 Serial.println("IP address: ");
 Serial.println(WiFi.localIP());
}