const geom = {};
{
    function dataFromPoint(startx, starty, endx, endy){
        let cx = (startx+endx)*0.5;
        return [cx, starty, cx, endy, endx, endy];
    }
    function dataFromPoints(points){
        let start = points[0];
        let end;
        let data = new Array(points.length-1);
        for(let i=1; i<points.length; i++){
            end = points[i];
            data[i-1] = dataFromPoint(start[0], start[1], end[0], end[1]);
            start = end;
        }
        return [data, [points[0], end]];
    }
    function path(data, [start, end], clamp=[0,0]){
        let path = new Path2D();
        if(!start || !end) return path;
        if((0 in clamp) && start){
            path.moveTo(start[0], clamp[0]);
            path.lineTo(start[0], start[1]);
        }
        for(let bezierData of data){
            path.bezierCurveTo(...bezierData);
        }
        if(end && (1 in clamp)){
            path.lineTo(end[0], clamp[1]);
        }
        return path;
    }
    function pathFromPoints(points, clamp=undefined){
        return path(...dataFromPoints(points), clamp);
    }
    geom.bezier = {
        smooth: {
            dataFromPoint: dataFromPoint,
            dataFromPoints: dataFromPoints,
            path: path,
            pathFromPoints: pathFromPoints
        }
    }
}
{
    function scalePoints(points, x, y){
        for(let i=0; i<points.length; i++){
            points[i][0] *= x;
            points[i][1] *= y;
        }
        return points;
    }
    function modify(points, {x, y}){
        if(x && y){
            for(let i=0; i<points.length; i++){
                points[i][0] = x(points[i][0]);
                points[i][1] = y(points[i][1]);
            }
        } else if(x){
            for(let i=0; i<points.length; i++){
                points[i][0] = x(points[i][0]);
            }
        } else if(y){
            for(let i=0; i<points.length; i++){
                points[i][1] = y(points[i][1]);
            }
        }
        return points;
    }
    function transition(points, {xt=0, yt=0, xs=1, ys=1}){
        for(let i=0; i<points.length; i++){
            points[i][0] = points[i][0]*xs+xt;
            points[i][1] = points[i][1]*ys+yt;
        }
        return points;
    }
    geom.points = {
        scale: scalePoints,
        modify: modify,
        transition: transition
    }
}

export default geom;
export const bezier = geom.bezier;
export const smoothBezier = geom.bezier.smooth;
export const points = geom.points;
