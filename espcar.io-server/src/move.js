class Move{
	constructor(data,io,{ eventName = 'moving', debug = false , base = 300 , base2 = 200 ,offset = 5 }){
		this.degrees = data.degrees;
		this.speed = data.speed;
		this.index = data.index;
		this.io = io;
		this.eventName = eventName;
		this.debug = debug;
		this.base = base;
		this.base2 = base2;
		this.offset = 90 + offset;
		this.offset2 = 90 - offset;
		this.espId = '';
		this.speedD = 0;
		this.speedI = 0;
		this.dirgir = 0;
	};
	map(x, inMin, inMax, outMin,  outMax){
		return Math.round((x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
	};
	movementJ(){
		const movement = {dirgir:this.dirgir, d:this.speedD, i:this.speedI};
		if(this.debug) console.log(movement);
		this.io.to(this.espId).emit(this.eventName,movement);
	};
	move(){
		if(this.speed == 0)this.movementJ();
		else if( this.degrees > 0 ){
			if (this.degrees < this.offset && this.degrees > this.offset2){
				this.speedD = this.map(this.speed,0,100,this.base,1023);
				this.speedI = this.speedD;
				this.dirgir = 1;
				this.movementJ();
			}
			else if (this.degrees < this.offset2){
				this.speedI = this.map(this.speed,0,100,this.base,1023);
				this.speedD = this.map(this.degrees,this.offset2,0,this.speedI,this.base2);
				this.dirgir = 1;
				this.movementJ();
			}
			else if(this.degrees > this.offset){
		
				this.speedD = this.map(this.speed,0,100,this.base,1023);
				this.speedI = this.map(this.degrees,this.offset,180,this.speedD,this.base2);
				this.dirgir = 1;
				this.movementJ();
			}
		}
		else if( this.degrees < 0  ){
		
			if (this.degrees > -this.offset && this.degrees < -this.offset2){
				this.speedD = this.map(this.speed,0,100,this.base,1023);
				this.speedI = this.speedD;
				this.dirgir = 2;
				this.movementJ();
			}
			else if (this.degrees > -this.offset2){
				this.speedD = this.map(this.speed,0,100,this.base,1023);
				this.speedI = this.map(this.degrees,-this.offset2,0,this.speedD,this.base2);
				this.dirgir = 2;
				this.movementJ();
			}
			else if(this.degrees < -this.offset){
				this.speedI = this.map(this.speed,0,100,this.base,1023);
				this.speedD = this.map(this.degrees,-this.offset,-180,this.speedI,this.base2);
				this.dirgir = 2;
				this.movementJ();
			}
		}
	};
	init(esps,socketId){
		if (esps[this.index].useBy == socketId ){
			this.espId = esps[this.index].id;
			this.move();
		}
	};
};

module.exports = Move;