<template>
	<div>
		<canvas :id="idCanvas" ></canvas>
	</div>
</template>

<script>

export default {
	props: {
		width:{
			type:Number,
			default:window.innerWidth/3
		},
		ratioJoystick: {
			type: Number,
			default: 0.2
		},
		joystickFillColor: {
			type: String,
			default: "#949494"
		},
		joystickLineWidth: {
			type: Number,
			default: 1
		},
		joystickStrokeColor: {
			type: String,
			default: "#656565"
		},
		baseLineWidth: {
			type: Number,
			default: 4
		},
		baseStrokeColor: {
			type: String,
			default: "#656565"
		},
		axes:{
			type:Boolean,
			default: false
		}
	},
	data(){
		return {
			//width:0,
			idCanvas: "joystick",
			changedTouches: null,
			canvas: null,
			context: null,
			pressed: false,
			circumference: 2 * Math.PI,
			joystickRadius: 0,
			baseRadius: 0,
			rango:0,
			center: 0,
			movedX: 0,
			movedY: 0,
			radians:0,
		};
	},
	/*
	beforeMount() {
		this.width = (window.innerWidth<= 600)? 
		window.innerWidth/1.5:
		window.innerWidth/3;
	},
	*/
	mounted() {
		this.canvas = document.getElementById(this.idCanvas);
		this.context = this.canvas.getContext("2d");
		this.canvas.width = this.width;
		this.canvas.height = this.width;
		this.initData();
		this.initEventCanvas();
	},
	methods: {
		initData() {
			this.joystickRadius = this.width * this.ratioJoystick;
			this.baseRadius = this.width/ 2 - 5;
			this.rango =( this.baseRadius - this.joystickRadius);
			this.center = this.width / 2;
			this.movedX = this.center;
			this.movedY = this.center;
			this.draw();
		},
		initEventCanvas() {
			this.canvas.addEventListener("touchstart",this.onMouseDown,false);
			this.canvas.addEventListener("touchmove",this.onMouseMove,false);
			this.canvas.addEventListener("touchend",this.onMouseUp, false);
			this.canvas.addEventListener("mousedown",this.onMouseDown,false);
			this.canvas.addEventListener("mousemove",this.onMouseMove,false);
			this.canvas.addEventListener("mouseup", this.onMouseUp, false);
		},
		move() {
			let 
				x       = Math.round(100 * (this.movedX-this.center) /this.rango),
				y       = Math.round(-(100 * (this.movedY-this.center) /this.rango));
			if(this.axes)this.$emit("move",x,y);
			else{
				let
					degrees =(this.pressed)? -1*(this.radians * (180/Math.PI)): 0 ,
					speed   = Math.round( Math.hypot(x,y));
				this.$emit("move",degrees,speed);
			}
		},
		processEvent(event){
			this.movedX = event.offsetX;
			this.movedY = event.offsetY;

			if(event.changedTouches){
				event.preventDefault();
				event.changedTouches.forEach((element,index) => {
					if (element.target.id == this.idCanvas) this.changedTouches = event.changedTouches[index];
				});
				this.movedX = this.changedTouches.pageX - this.changedTouches.target.offsetLeft;
				this.movedY = this.changedTouches.pageY - this.changedTouches.target.offsetTop;
			}
			let 
				x     = this.movedX - this.center,
				y     = this.movedY - this.center,
				hypot = Math.round( Math.hypot(x,y));
			this.radians = Math.atan2(y,x);
			if(hypot < (this.rango-1))
			{
				this.draw();
				this.move();
			}
			if(hypot >= (this.rango)){

				let 
					cos = Math.cos(this.radians),
					sin = Math.sin(this.radians);
				this.movedX = cos * this.rango + this.center;
				this.movedY = sin * this.rango + this.center ;
				this.draw();
				this.move();
			}
		},
		onMouseDown(event) {
			this.pressed = true;
			this.processEvent(event);
		},
		onMouseMove(event) {
			if (this.pressed) this.processEvent(event);
		},
		onMouseUp() {
			this.pressed = false;
			this.movedX = this.center;
			this.movedY = this.center;
			this.draw();
			this.move();
		},
		draw() {
			this.context.clearRect(0, 0, this.width, this.width);
			this.context.beginPath();
			this.context.arc(this.center, this.center, this.baseRadius, 0, this.circumference);
			this.context.lineWidth = this.baseLineWidth;
			this.context.strokeStyle = this.baseStrokeColor;
			this.context.stroke();
			this.context.beginPath();
			this.context.arc(this.movedX ,this.movedY,this.joystickRadius,0,this.circumference);
			let grd = this.context.createRadialGradient(this.movedX,this.movedY,5,this.movedX,this.movedY,this.joystickRadius);
			grd.addColorStop(0, this.joystickFillColor);
			grd.addColorStop(1, this.joystickStrokeColor);
			this.context.fillStyle = grd;
			this.context.fill();
			this.context.lineWidth = this.joystickLineWidth;
			this.context.strokeStyle = this.joystickStrokeColor;
			this.context.stroke();
		}
	}
};
</script>

<style>
</style>