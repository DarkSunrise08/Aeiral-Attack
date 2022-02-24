class Box {
    constructor(x,y){
        var options = {
            isStatic:true,
            frictionAir : 0.01,
            mass:2
        }
        this.body = Bodies.rectangle(x,y,20,20,options);
        this.x = x;
        this.y = y;
        World.add(world,this.body);
    }

    remove(){
        Matter.World.remove(world,this.body);
    }

    shoot() {
       var newAngle = random(200,235);
       newAngle = newAngle *(3.14/180)
       var velocity = p5.Vector.fromAngle(newAngle);
       velocity.mult(0.45);
       Matter.Body.setStatic(this.body, false);
       Matter.Body.setVelocity(this.body, {
         x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
     }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        rotate(angle);
        translate(pos.x,pos.y);
        rectMode(CENTER);
        fill(255);
        rect(0,0,20,20);
        pop();
    }
}