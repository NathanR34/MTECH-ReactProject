
import { useCanvas } from './Canvas.js';
import { smoothBezier } from '../../util/geom.js'; 
import { drawPath } from '../../util/draw.js';

export function SmoothBezierPath({points, style={fill:"#000000"}}){
    useCanvas(function(ctx){
        let path = smoothBezier.pathFromPoints(points, style.clamp);
        if(style.fill){
            ctx.fillStyle = style.fill;
            drawPath.fill.mix(ctx, path);
        }
        if(style.stroke){
            ctx.strokeStyle = style.stroke;
            drawPath.stroke.mix(ctx, path);
        }
    })
}