const geom = {};
{
    function data(startx, starty, endx, endy){
        let cx = (startx+endx)*0.5;
        return [cx, starty, cx, endy, endx, endy];
    }
    function dataFromPoints(points){
        let start = points[0];
        let end;
        let data = new Array(points.length-1);
        for(let i=1; i<points.length; i++){
            let end = points[i];
            data[i-1] = bezierData(start[0], start[1], end[0], end[1]);
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
            data: data,
            dataFromPoints: dataFromPoints,
            path: path,
            pathFromPoints: pathFromPoints
        }
    }
}

export default geom;
export const bezier = geom.bezier;
export const smoothBezier = geom.bezier.smooth;

