let rot =  [-1, 1];
class PufferFish{
	
	constructor(){
		this.x = random(padding, width - padding);     
		this.y = random(20, height/2);                  		this.angle = random(0, TWO_PI);               
		this.direction = p5.Vector.fromAngle(this.angle, 2);   
		this.vel = random(0.3, 1);                           
		this.size = 0;                                     
		this.type = "false";                            
		this.count = int(random(0, 1000));               
		this.clr = pufferClr[int(random(0, 3))];            
		this.r = rot[int(random(0, 2))];                      
		this.tail = 1;                                       
	}
	
	move(){
		this.x = this.x + this.direction.x * this.vel;
		this.y = this.y + this.direction.y * this.vel;
	}
	
	display(){
		
		if(this.count < 500){
			this.type = "true";
		}else if (this.count >= 500){
			this.type = "false";
		}
		
		if(this.type == "true"){
			if(this.size < 10){
				this.size+=0.1;
			}
		}else{
			if(this.size > 0){
				this.size-=0.1;
			}
		}
		
		// pufferFishShape(this.x, this.y, this.size, this.type);
		let explore = this.size;
		push();
			translate(this.x, this.y);
			if(this.type == "true"){
				rotate(radians(frameCount)*this.r);
			}
			stroke("black");
		
			
			beginShape();
				vertex(45, -3);
				vertex(57, -7);
				vertex(57, 7);
				vertex(45, 5);
			endShape();
		
		
			fill(this.clr);
			beginShape();
				curveVertex(0, 0);
				curveVertex(0, 0);
				curveVertex(10, -10 - explore);
				curveVertex(40, -10 - explore);
				curveVertex(50, 0);
				curveVertex(40, 5);
				curveVertex(10, 5);
				curveVertex(0, 0);
				curveVertex(0, 0);
			endShape();

			
			fill("white");
			noStroke();
			ellipse(30, 0, 5, 5);
			ellipse(35, -3, 5, 5);

		
			fill("white");
			stroke("black");
			beginShape();
				curveVertex(0, 0);
				curveVertex(0, 0);
				curveVertex(10, 5);
				curveVertex(40, 5);
				curveVertex(50, 0);
				curveVertex(40, 15 + explore);
				curveVertex(10, 15 + explore);
				curveVertex(0, 0);
				curveVertex(0, 0);
			endShape();
		
		
			fill(this.clr);
			beginShape();
				vertex(20, 3);
				vertex(20, 3);
				vertex(30, 2);
				vertex(30, 13);
				vertex(20, 10);
				vertex(20, 10);
			endShape();

		
			fill("white");
			push();
				rotate(PI/8)
				ellipse(-3, -1, 10, 5);
			pop();
			push();
				rotate(-PI/8);
				ellipse(-3, 1, 10, 5);
			pop();

		
			if(this.type == "true"){
				ellipse(7, -10, 15);
				fill("black");
				ellipse(7, -10, 2);
			}else{
				fill("black");
				ellipse(10, -3, 2);		
			}
		pop();
		this.count = this.count%1000+1;
	}
	
	updateVel(){
		this.vel = this.vel*0.99;
	}
	
	changeVel(){
		this.vel = random(0.3,1);
	}
	
	changeDirection(){
		this.angle = random(0, TWO_PI);
		this.direction = p5.Vector.fromAngle(this.angle, 2)
	}
	
	isInside() {
		return this.x >= padding && this.x <= width - padding && this.y >= padding && this.y <= height - padding
	}
}