const
	{host,port,ssid,pass} = require('../../../config'),
	wsUrl = `'http://${host}:${port}/'`,
	jsTemplate = `(function(t){function e(e){for(var n,c,a=e[0],r=e[1],h=e[2],u=0,l=[];u<a.length;u++)c=a[u],Object.prototype.hasOwnProperty.call(i,c)&&i[c]&&l.push(i[c][0]),i[c]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);d&&d(e);while(l.length)l.shift()();return o.push.apply(o,h||[]),s()}function s(){for(var t,e=0;e<o.length;e++){for(var s=o[e],n=!0,a=1;a<s.length;a++){var r=s[a];0!==i[r]&&(n=!1)}n&&(o.splice(e--,1),t=c(c.s=s[0]))}return t}var n={},i={app:0},o=[];function c(e){if(n[e])return n[e].exports;var s=n[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,c),s.l=!0,s.exports}c.m=t,c.c=n,c.d=function(t,e,s){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(c.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(s,n,function(e){return t[e]}.bind(null,n));return s},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],r=a.push.bind(a);a.push=e,a=a.slice();for(var h=0;h<a.length;h++)e(a[h]);var d=r;o.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"034f":function(t,e,s){"use strict";var n=s("85ec"),i=s.n(n);i.a},1:function(t,e){},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var n=s("2b0e"),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"d-flex justify-content-center",class:t.flex},[s("div",{staticClass:"d-flex",class:t.justify,style:{width:t.width+"px"}},[s("h1",[t._v("EspCar.io")])]),s("Joystick",{attrs:{width:t.width},on:{move:t.move}}),s("div",{staticClass:"d-flex flex-column",class:t.align,style:{width:t.width+"px"}},[s("ul",{staticClass:"list-group mt-1 mb-1",staticStyle:{width:"145px"}},[s("li",{staticClass:"list-group-item d-flex justify-content-center"},[s("span",[t._v("Degrees: "+t._s(Math.round(t.degrees)))])]),s("li",{staticClass:"list-group-item d-flex justify-content-center"},[s("span",[t._v("Speed: "+t._s(t.speed))])])])])],1),s("div",[s("EspList",{on:{connection:t.connection}})],1)])},o=[],c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("canvas",{attrs:{id:t.idCanvas}})])},a=[],r=(s("cb29"),s("4160"),s("4057"),s("a9e3"),s("159b"),{props:{width:{type:Number,default:window.innerWidth/3},ratioJoystick:{type:Number,default:.2},joystickFillColor:{type:String,default:"#949494"},joystickLineWidth:{type:Number,default:1},joystickStrokeColor:{type:String,default:"#656565"},baseLineWidth:{type:Number,default:4},baseStrokeColor:{type:String,default:"#656565"},axes:{type:Boolean,default:!1}},data:function(){return{idCanvas:"joystick",changedTouches:null,canvas:null,context:null,pressed:!1,circumference:2*Math.PI,joystickRadius:0,baseRadius:0,rango:0,center:0,movedX:0,movedY:0,radians:0}},mounted:function(){this.canvas=document.getElementById(this.idCanvas),this.context=this.canvas.getContext("2d"),this.canvas.width=this.width,this.canvas.height=this.width,this.initData(),this.initEventCanvas()},methods:{initData:function(){this.joystickRadius=this.width*this.ratioJoystick,this.baseRadius=this.width/2-5,this.rango=this.baseRadius-this.joystickRadius,this.center=this.width/2,this.movedX=this.center,this.movedY=this.center,this.draw()},initEventCanvas:function(){this.canvas.addEventListener("touchstart",this.onMouseDown,!1),this.canvas.addEventListener("touchmove",this.onMouseMove,!1),this.canvas.addEventListener("touchend",this.onMouseUp,!1),this.canvas.addEventListener("mousedown",this.onMouseDown,!1),this.canvas.addEventListener("mousemove",this.onMouseMove,!1),this.canvas.addEventListener("mouseup",this.onMouseUp,!1)},move:function(){var t=Math.round(100*(this.movedX-this.center)/this.rango),e=Math.round(-100*(this.movedY-this.center)/this.rango);if(this.axes)this.$emit("move",t,e);else{var s=this.pressed?this.radians*(180/Math.PI)*-1:0,n=Math.round(Math.hypot(t,e));this.$emit("move",s,n)}},processEvent:function(t){var e=this;this.movedX=t.offsetX,this.movedY=t.offsetY,t.changedTouches&&(t.preventDefault(),t.changedTouches.forEach((function(s,n){s.target.id==e.idCanvas&&(e.changedTouches=t.changedTouches[n])})),this.movedX=this.changedTouches.pageX-this.changedTouches.target.offsetLeft,this.movedY=this.changedTouches.pageY-this.changedTouches.target.offsetTop);var s=this.movedX-this.center,n=this.movedY-this.center,i=Math.round(Math.hypot(s,n));if(this.radians=Math.atan2(n,s),i<this.rango-1&&(this.draw(),this.move()),i>=this.rango){var o=Math.cos(this.radians),c=Math.sin(this.radians);this.movedX=o*this.rango+this.center,this.movedY=c*this.rango+this.center,this.draw(),this.move()}},onMouseDown:function(t){this.pressed=!0,this.processEvent(t)},onMouseMove:function(t){this.pressed&&this.processEvent(t)},onMouseUp:function(){this.pressed=!1,this.movedX=this.center,this.movedY=this.center,this.draw(),this.move()},draw:function(){this.context.clearRect(0,0,this.width,this.width),this.context.beginPath(),this.context.arc(this.center,this.center,this.baseRadius,0,this.circumference),this.context.lineWidth=this.baseLineWidth,this.context.strokeStyle=this.baseStrokeColor,this.context.stroke(),this.context.beginPath(),this.context.arc(this.movedX,this.movedY,this.joystickRadius,0,this.circumference);var t=this.context.createRadialGradient(this.movedX,this.movedY,5,this.movedX,this.movedY,this.joystickRadius);t.addColorStop(0,this.joystickFillColor),t.addColorStop(1,this.joystickStrokeColor),this.context.fillStyle=t,this.context.fill(),this.context.lineWidth=this.joystickLineWidth,this.context.strokeStyle=this.joystickStrokeColor,this.context.stroke()}}}),h=r,d=s("2877"),u=Object(d["a"])(h,c,a,!1,null,null,null),l=u.exports,f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"esp-list container"},[s("ul",{staticClass:"list-group"},[t._m(0),t._l(t.esps,(function(e,n){return s("li",{key:n,staticClass:"no-select list-group-item d-flex justify-content-between align-items-center",class:e.hover,on:{click:function(e){!(t.connected.state||t.esps[n].useBy.length>4)&&t.selectEsp(n)}}},[t._v(" "+t._s(e.id)+" "),"No devices found"!==e.id?s("span",{staticClass:"badge badge-pill",class:e.class},[t._v(t._s(e.text))]):t._e()])}))],2),t.connected.state?s("button",{staticClass:"btn btn-danger btn-block",on:{click:function(e){return t.unselectEsp()}}},[t._v("disconnect")]):t._e()])},p=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"list-group-item d-flex justify-content-center "},[s("span",[t._v("ESPS:")])])}],v={props:{},data:function(){return{isEsps:!1,esps:[{id:"No devices found"}],clientId:"",connected:{state:!1,index:0}}},watch:{connected:function(){this.$emit("connection",this.connected)}},sockets:{connect:function(){this.$socket.emit("identify","joystick")},uEsps:function(t){var e=this;this.clientId=t.clientId,this.esps=t.esps;var s=!1;this.esps.length>0?(this.esps.forEach((function(t,n){t.useBy==e.clientId?(s=!0,e.connected={state:!0,index:n},e.esps[n].class={"badge-primary":!0},e.esps[n].text="connected"):"none"==t.useBy?(e.esps[n].hover={esp:!e.connected.state},e.esps[n].class={"badge-success":!0},e.esps[n].text="avalible"):(e.esps[n].class={"badge-danger":!0},e.esps[n].text="in use")})),s||(this.connected={state:!1,index:0})):(this.esps=[{id:"No devices found"}],this.connected={state:!1,index:0})},dEsp:function(){this.connected={state:!1,index:0}}},methods:{selectEsp:function(t){"none"!=this.esps[t].useBy||this.connected.state||(this.$socket.emit("selectEsp",t),this.connected={state:!0,index:t})},unselectEsp:function(){this.$socket.emit("unselectEsp",this.connected.index),this.connected={state:!1,index:0}}}},m=v,g=(s("68f4"),Object(d["a"])(m,f,p,!1,null,null,null)),y=g.exports,b={name:"app",components:{Joystick:l,EspList:y},data:function(){return{width:0,mobile:!1,degrees:0,speed:0,connected:{state:!1,index:0}}},computed:{flex:function(){return{"flex-column":this.mobile,"align-items-center":this.mobile,"justify-content-center":!this.mobile}},justify:function(){return{"justify-content-center":this.mobile,"justify-content-end":!this.mobile}},align:function(){return{"align-items-center":this.mobile,"align-items-start":!this.mobile}}},beforeMount:function(){window.innerWidth<=600?(this.width=window.innerWidth/1.5,this.mobile=!0):(this.width=window.innerWidth/3,this.mobile=!1)},methods:{move:function(t,e){this.degrees=t,this.speed=e,this.connected.state&&this.$socket.emit("move",{index:this.connected.index,degrees:this.degrees,speed:this.speed})},connection:function(t){this.connected=t}}},x=b,w=(s("034f"),Object(d["a"])(x,i,o,!1,null,null,null)),k=w.exports,j=s("5132"),E=s.n(j),C=s("8055"),M=s.n(C);n["a"].config.productionTip=!1,n["a"].use(new E.a({debug:!0,connection:M()(${wsUrl})})),new n["a"]({render:function(t){return t(k)}}).$mount("#app")},"68f4":function(t,e,s){"use strict";var n=s("d02d"),i=s.n(n);i.a},"85ec":function(t,e,s){},d02d:function(t,e,s){}});
//# sourceMappingURL=app.js.map`,
	inoTemplate = `/*
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

const char* SSID = "${ssid}";
const char* PASS = "${pass}";

const char* SERVER = "${host}";
int SERVERPORT = ${port};

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
 webSocket.emit("identify","\\"esp\\"");
}
void controlled(const char* message, size_t length){
 DynamicJsonDocument doc(1024);
 deserializeJson(doc, message);

 int dirgir = doc["dirgir"];
 int d = doc["d"];
 int i = doc["i"];

 Serial.print("d = ");
 Serial.print(d);
 Serial.print("\\t i = ");
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
}`;

module.exports = {jsTemplate,inoTemplate}; 