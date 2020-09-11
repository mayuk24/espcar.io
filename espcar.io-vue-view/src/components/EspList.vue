<template>
	<div class="esp-list container">
		<ul class="list-group">
			<li class="list-group-item d-flex justify-content-center ">
				<span>ESPS:</span>
			</li>
			<li v-for="(item,index) of esps" :key="index" @click="(connected.state || esps[index].useBy.length > 4 ) ? null : selectEsp(index)" :class="item.hover" class="no-select list-group-item d-flex justify-content-between align-items-center">
				{{item.id}}
				<span v-if="item.id !== 'No devices found'" class="badge badge-pill" :class="item.class" >{{item.text}}</span>
			</li>
		</ul>
		<button v-if="connected.state" @click="unselectEsp()" class="btn btn-danger btn-block">disconnect</button>
	</div>
</template>

<script>

export default {
	props: {
	},
	data() {
		return {
			isEsps:false,
			esps:[{id:'No devices found'}],
			clientId:'',
			connected:{state:false,index:0},
		};
	},
	watch:{
		connected(){
			this.$emit("connection",this.connected);
		}
	},
	sockets: {
		connect() {
			this.$socket.emit('identify','joystick')
		},
		uEsps(data){
			this.clientId = data.clientId;
			this.esps     = data.esps;
			let connected = false;
			if(this.esps.length > 0 ){
				this.esps.forEach((item,index) => {
					if(item.useBy == this.clientId){
						connected = true;
						this.connected = {state:true,index:index};
						this.esps[index].class = {'badge-primary': true };
						this.esps[index].text  = 'connected';
					}
					else if(item.useBy == 'none'){
						this.esps[index].hover = {esp:!this.connected.state};
						this.esps[index].class = {'badge-success': true};
						this.esps[index].text  = 'avalible';
					}
					else{
						this.esps[index].class = {'badge-danger': true};
						this.esps[index].text  = 'in use';
					}
				});
				if(!connected)this.connected = {state:false,index:0};
			}
			else{
				this.esps      = [{id:'No devices found'}];
				this.connected = {state:false,index:0};
			}
		},
		dEsp(){
			this.connected = {state:false,index:0};
		}
	},
	methods: {
		selectEsp(index){
			if( this.esps[index].useBy == 'none' && !this.connected.state){
				this.$socket.emit('selectEsp', index);
				this.connected = {state:true,index:index};
			}
		},
		unselectEsp(){
			this.$socket.emit('unselectEsp', this.connected.index);
			this.connected = {state:false,index:0};
		},
	}
};

</script>

<style>
.esp-list{
	width: 600px;
}

.no-select{
	user-select: none;
}
.esp{
	transition: 0.3s;
	cursor: pointer;
}
.esp:hover{	
 background-color: #007bff;
}

@media only screen and (max-width: 600px) {
	.esp-list{
		width: 350px;
	}

	.esp{
		transition: 0.1s,0.3s;
	}

	.esp:hover{	
		background-color: #ffffff;
	}

	.esp:active{
		background-color: #007bff;
	}
}
</style>