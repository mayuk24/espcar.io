<p align="center">
  <br>
  <img  src="https://mayuk24.github.io/img/mayukhex180name.png" alt="logo of vue-awesome repository">
  <br>
<p>
	
# EspCar.io
![](https://mayuk24.github.io/img/espcar/espcar-view.jpg)

EspCar.io is an application that will allow you to control a car made with esp8266 and an H bridge  with a virtual joystick through socket.io
### Features

- Supports multiple web clients and esp clients.
- Distinguish between web clients and esp clients.
- Each web client can control an esp car.
- Each web client can see the status of each esp car.

## Installation & Usage

```bash
$ git clone https://github.com/mayuk24/espcar.io
```

#### Edit  config.js

Edit the config.js file located in the root directory with your host, port number and the credentials of your wifi network.

```javascript
const
	host	= (process.env.HOST || 'YOUR-HOST'),
	port	= (process.env.PORT || 'YOUR-PORT'),
	ssid	= (process.env.SSID || 'YOUR-SSID'),
	pass	= (process.env.PASS || 'YOUR-PASS');
```

Make sure you do not use "localhost", instead use your local ip address otherwise the Esp will not be able to connect to the server websocket.

#### Npm Install

Go to the directory espcar.io-server and run the command: "npm install" to download the repository's dependencies

```bash
$ cd  /espcar.io/espcar.io-server
```

```bash
$ npm install
```

#### Update files

Go to the espcar.io-server directory and run the script: "npm run build" to update the client's app.js file and the espcar.ino file with the data you previously added in the config.js file.

```bash
$ cd  /espcar.io/espcar.io-server
```

```bash
$ npm run build
```

You will see the following confirmation message in the terminal

```bash
espcar.ino updated
app.js updated
```


#### Arduino dependencies

Use the Arduino Library Manager.
1. Go to Sketch > Include Library > Manage Libraries.
2. Install [WebSockets](https://github.com/Links2004/arduinoWebSockets) by Markus Sattler
3. Install [SocketIoClient](https://github.com/timum-viw/socket.io-client/) by Vincent Wyszynski

If you don't have the arduino IDE configured to work with esp8266 boards yet, this [link](https://randomnerdtutorials.com/how-to-install-esp8266-board-arduino-ide/) will help you.

After completing the above just upload the Sketch to esp8266.

#### Run the server

Finally all that remains is to run the script : "npm start"  in the espcar.io/espcar.io-server directory.

```bash
$ cd  /espcar.io/espcar.io-server
```

```bash
$ npm start
```


Now you should be ready to go.

## Optional
#### Edit vue project

If you want to edit the Vue project just go to the directory espcar.io/espcar-vue and run the command "npm install"

```bash
cd /espcar.io/espcar.io-vue
```

```bash
$ npm install 
```
Then edit the main.js file inside the src directory with your host and port

```javascript
Vue.use(new VueSocketIO({
	debug: true,
	connection: io('http://YOUR-HOST:YOUR-PORT/')
}));
```
# Hardware requirements
The main components you need for the esp car are an esp8266 and an h-bridge with 4 inputs and 4 outputs.

In another moment I will add a more detailed guide for the assembly of the esp car and share the stl files.

# License
copyright &copy; 2020 Marco Concepcion. Licensed under the MIT license.
