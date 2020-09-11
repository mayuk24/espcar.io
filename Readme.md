![](https://mayuk24.github.io/img/mayukhex180name.png)

# EspCar.io
![](https://mayuk24.github.io/img/espcar/espcar-view.jpg)

EspCar.io is an application that will allow you to control a car made with esp8266 and an H bridge  with a virtual joystick through socket.io
### Features

- Supports multiple web clients and esp clients.
- Distinguish between web clients and esp clients.
- Each web client can control an esp car.
- Each web client can see the status of each esp car.

## Installation

```bash
$ git clone https://github.com/mayuk24/espcar.io
```
Or 
```bash
$ npm install espcar.io
```
And then extract the folder espcar.io from node_modules folder to the project main directory

#### Edit  index.js
Edit the host variable in line 7 for your host.
```javascript
const
	express = require('express'),
	app     = express(),
	server  = require('http').createServer(app),
	io      = require('socket.io')(server),
	Move    = require('./move');
	host    = (process.env.HOST || 'YOUR-HOST'),
	port    = (process.env.PORT || '3000'),
	pbl    = './public',
	msg    = () =>
	{
		console.log(`Server running at http://${host}:${port}/`);
	};
```
#### Edit  public/js/app.js
Use your code editor to find 'YOUR-HOST' in app.js and change it to your host.
```javascript
(new E.a({debug:!0,connection:M()("http://YOUR-HOST:3000/")}))
```
#### Edit  EspCar-ino/espcar.ino
Add your wifi credentials and your server host to the ino file.
```c++
const char* ssid = "YOUR-SSID";
const char* pass = "YOUR-PASS";

const char* SERVER = "YOUR-HOST";
int SERVERPORT = 3000;
```
Now you should be ready to go.

## Optional
#### Edit vue project
If you want to edit the vue project simply start the project inside the espcar.io-vue-view folder.

```bash
cd YOUR-ROOT/espcar.io/espcar.io-vue-view
$ npm install 
```
#### Edit espcar.io-vue-view/src/main.js
The same thing edit YOUR-HOST with your host lol.

```javascript
Vue.use(new VueSocketIO({
	debug: true,
	connection: io('http://YOUR-HOST:3000/')
}));
```
# Hardware requirements
The main components you need for the esp car are an esp8266 and an h-bridge with 4 inputs and 4 outputs.

In another moment I will add a more detailed guide for the assembly of the esp car and share the stl files.

# License
copyright &copy; 2020 Marco Concepcion. Licensed under the MIT license.
