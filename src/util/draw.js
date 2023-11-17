
const draw = {};
draw.path = {};
{
    function mix(ctx, path){
        ctx.globalAlpha = 0.5;
        ctx.globalCompositeOperation = "source-atop";
        ctx.fill(path);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "destination-over";
        ctx.fill(path);
    }
    draw.path.fill = {
        mix: mix
    }
}
{
    function mix(ctx, path){
        ctx.globalAlpha = 0.5;
        ctx.globalCompositeOperation = "source-atop";
        ctx.stroke(path);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "destination-over";
        ctx.stroke(path);
    }
    draw.path.stroke = {
        mix: mix
    }
}

export default draw;
export const drawPath = draw.path;
