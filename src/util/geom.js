class Geom {
    constructor(){
        this.geom = [];
    }
    add(geom){
        this.geom.push(geom);
    }
    render(ctx, render){
        for(let geom of this.geom){
            render(geom, ctx);
        }
    }
}

class Path extends Geom {
    render(ctx, render){
        if(!head) ctx.beginPath();
        super.render(ctx, render, head);
    }
}