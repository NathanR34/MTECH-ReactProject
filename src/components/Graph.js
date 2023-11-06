
import {useRef, useEffect, useState} from 'react';

let c = 0;
function count(){
    console.log(++c);
}

function Graph(){
    const [canvas, setCanvas] = useState(null);
    const [ctx, setCtx] = useState(null);
    const canvasRef = useRef(null);

    function draw(){
        ctx.fillRect(50,50,50,50);
        count();
    }
    useEffect(()=>{
        if(canvasRef.current){
            let canvasElement = canvasRef.current;
            setCanvas(canvasElement);
            setCtx(canvasElement.getContext("2d"));
        } else {
            setCanvas(null);
            setCtx(null);
        }
    }, [canvasRef]);
    useEffect(()=>{
        if(ctx){
            draw();
        }
    }, [ctx]);


    return <canvas onClick={toggleRender} ref={canvasRef}></canvas>;
}

export default Graph;