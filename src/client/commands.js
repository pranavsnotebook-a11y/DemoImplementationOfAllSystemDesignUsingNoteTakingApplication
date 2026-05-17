class DrawStrokeCommand{
    constructor(points){
        this.points=points
     
    }
    execute(ctx) {

        ctx.beginPath();
        ctx.moveTo(this.points[0].x,this.points[0].y)
        for (let i=1;i<this.points.length;i++){
            ctx.lineTo(this.points[i].x,this.points[i].y)
            
            
        }
        ctx.stroke()


    }
}