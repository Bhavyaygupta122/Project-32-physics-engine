class Banana{
    constructor(x,y,r) {
        var options = {
            isStatic:true,
            restitution :0.4,
            friction :0.0          
        }

        this.image = loadImage("banana.png");
        this.body = Bodies.circle(x, y,r, options);
        this.r=r;
        World.add(world, this.body);
        
      }
      display(){
         var angle = this.body.angle;
         var pos= this.body.position;
         push();
         translate(pos.x, pos.y);
         rotate(angle);
         imageMode(CENTER);
         image(this.image,0,0,this.r*2, this.r*2);
         console.log(this.body.isStatic);
         pop();
         
        }  
      score(){
        if (this.Visiblity < 0 && this.Visiblity > -1005){
             score++;
        }
      }  
    }
     

