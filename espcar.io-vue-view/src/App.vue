<template>
	<div>
		<div class="d-flex justify-content-center" :class="flex" >
			<div :style="{width:width + 'px'}" class="d-flex" :class="justify">
				<h1>EspCar.io</h1> 
			</div>
			<Joystick @move="move" :width="width" />
			<div :style="{width:width + 'px'}" class="d-flex flex-column" :class="align">
				<ul class="list-group mt-1 mb-1" style="width:145px">
					<li class="list-group-item d-flex justify-content-center">
						<span>Degrees: {{Math.round(degrees)}}</span>
					</li>
					<li class="list-group-item d-flex justify-content-center">
						<span>Speed: {{speed}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div>
			<EspList @connection="connection"/>
		</div>
	</div>
</template>

<script>
import Joystick from "./components/Joystick";
import EspList from "./components/EspList";

export default {
	name: "app",
	components: {
		Joystick,
		EspList
	},
	data(){
		return{
			width:0,
			mobile:false,
			degrees:0,
			speed:0,
			connected:{state:false,index:0}
		}
	},
	computed:{
		flex(){
			return{
				'flex-column':this.mobile,
				'align-items-center':this.mobile,
				'justify-content-center':!this.mobile
			}
		},
		justify(){
			return{
				'justify-content-center':this.mobile,
				'justify-content-end':!this.mobile,
			}
		},
		align(){
			return{
				'align-items-center':this.mobile,
				'align-items-start':!this.mobile
			}
		}
	},
	beforeMount() {
		if(window.innerWidth<= 600){
			this.width = window.innerWidth/1.5
			this.mobile = true
		}
		else{
			this.width = window.innerWidth/3;
			this.mobile = false
		}
	},
	methods:{
		move(degrees,speed){
			this.degrees = degrees;
			this.speed = speed;
			if(this.connected.state) 
				this.$socket.emit('move',{index:this.connected.index,degrees:this.degrees,speed:this.speed});
		},
		connection(connected){
			this.connected = connected;
		}
	}
};
</script>

<style>
@media only screen and (max-width: 600px) {
	h1 {
    font-size: 2.4rem;
	}
}
</style>
