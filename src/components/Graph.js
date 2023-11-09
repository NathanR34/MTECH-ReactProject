
import {useRef, useEffect, useState} from 'react';

import { smoothBezier } from '../util/geom'; 
import { drawPath } from '../util/draw';

let Graph;
{   
    function draw(ctx, data){
        if(ctx){
            let path = smoothBezier.path(...data);
            drawPath.fill.mix(ctx, path);
        }
    }
    Graph = function Graph({points}){
        const canvasRef = useRef(null);
        const [ctx, setCtx] = useState(null);
        const [data, setData] = useState(smoothBezier.dataFromPoints(points));

        useEffect(()=>{
            draw(ctx, data);
        }, [data, ctx]);

        useEffect(()=>{
            if(canvasRef.current){
                setCtx(canvasRef.current.getContext("2d"));
            } else {
                setCtx(null);
            }
        }, [canvasRef]);


        return <canvas onClick={toggleRender} ref={canvasRef}></canvas>;
    }
}

export default Graph;