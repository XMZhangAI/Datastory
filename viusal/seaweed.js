class SeaWeed{
	constructor(){
		this.x = random(padding, width - padding);
		this.y = random((height*4)/5, height-padding);
	}
	
	display(){
		push();
			translate(this.x, this.y);
			stroke("green");
			strokeWeight(3);
			line(0, 0, 0, -100);
		pop();
	}
}