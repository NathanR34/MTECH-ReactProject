
import { useState, useRef, useEffect, createContext, useContext } from 'react';

const CanvasContext = createContext({});

export function useCanvas(draw){
    const state = useContext(CanvasContext);
    const ctx = (state.updating && state.ctx) || null;
    const ref = useRef({});
    if(ctx && state.last !== ref.current){
        state.last = ref.current;
        draw(ctx, state.state);
        return true;
    }
    return false;
}

function InternalRun({callback}){
    const state = useContext(CanvasContext);
    callback(state);
}

const defaultCanvasSize = [300, 150];
Object.seal(defaultCanvasSize);
export default function Canvas({children, size=defaultCanvasSize, style={}}){
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const frame = useRef(new CanvasTopFrame());

    // Gets the context
    useEffect(()=>{
        if(!ctx){
            if(canvasRef.current){
                const canvas = canvasRef.current;
                setCtx(canvas.getContext("2d") || null);
            }
        }
    }, [ctx]);
    
    const state = {};
    
    return (
        <div ref={wrapperRef} style={{
            display: "flex",
            justifyContent: "stretch",
            alignItems: "stretch",
            ...style
        }}>
            <canvas ref={canvasRef} style={{
                flex: "1 1 auto",
                minWidth: 0,
                minHeight: 0
            }}>
                <CanvasContext.Provider value={{
                    ctx: ctx,
                    updating: true,
                    state: state
                }}>
                    <InternalRun callback={function postDraw(canvasState){
                        canvasState.updating = true;
                        if(canvasRef.current){
                            const canvas = canvasRef.current;
                            if(canvas.width !== size[0]) canvas.width = size[0];
                            if(canvas.height !== size[1]) canvas.height = size[1];
                        }
                        if(ctx){
                            ctx.resetTransform();
                            ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

                            // top frame for canvas element
                            frame.current.init(ctx);
                            state.frames = {'':frame.current};
                            state.frame = frame.current;
                        }
                    }}/>
                    {children}
                    <InternalRun callback={function afterDraw(canvasState){
                        canvasState.updating = false;
                    }}/>
                </CanvasContext.Provider>
            </canvas>
        </div>
    );
}


class CanvasAreaFrame {
    init(size, area, parent, frames, name){

        // size, area, globalArea

        this.size = parent.getAreaTemplate(size, frames, parent.area);
        this.width = this.size[2]-this.size[0];
        this.height = this.size[3] - this.size[1];

        this.area = this.getAreaTemplate(area, frames, this.size);
        this.areaWidth = this.area[2]-this.area[0];
        this.areaHeight = this.area[3]-this.area[1];
        this.scale = [this.areaWidth/this.width, this.areaHeight/this.height];
        this.delta = [this.area[0]-this.size[0], this.area[1]-this.size[1]];

        this.globalArea = parent.toGlobalArea(this.size);
        this.globalWidth = this.globalArea[2]-this.globalArea[0];
        this.globalHeight = this.globalArea[3]-this.globalArea[1];
        this.globalScale = [this.areaWidth/this.globalWidth, this.areaHeight/this.globalHeight];
        this.globalDelta = [this.area[0]-this.globalArea[0], this.area[1]-this.globalArea[1]];

        if(name){
            frames[name] = this;
        }
    }
    to(num, axis){
        return num*this.scale[axis]+this.delta[axis];
    }
    toPoint(point){
        return [
            this.to(point[0], 0),
            this.to(point[1], 1)
        ];
    }
    toArea(area){
        return [
            this.to(area[0], 0),
            this.to(area[1], 1),
            this.to(area[2], 0),
            this.to(area[3], 1)
        ];
    }
    from(num, axis){
        return (num-this.delta[axis])/this.scale[axis];
    }
    
    fromPoint(point){
        return [
            this.from(point[0], 0),
            this.from(point[1], 1)
        ];
    }
    fromArea(area){
        return [
            this.from(area[0], 0),
            this.from(area[1], 1),
            this.from(area[2], 0),
            this.from(area[3], 1)
        ];
    }
    toGlobal(num, axis){
        return this.globalArea[axis]+num/this.globalScale[axis];
    }
    toGlobalPoint(point){
        return [
            this.toGlobal(point[0], 0),
            this.toGlobal(point[1], 1)
        ];
    }
    toGlobalArea(area){
        return [
            this.toGlobal(area[0], 0),
            this.toGlobal(area[1], 1),
            this.toGlobal(area[2], 0),
            this.toGlobal(area[3], 1)
        ];
    }
    fromGlobal(num, axis){
        return (num-this.globalArea[axis])*this.globalScale[axis];
    }
    fromGlobalPoint(point){
        return [
            this.fromGlobal(point[0], 0),
            this.fromGlobal(point[1], 1)
        ]
    }
    fromGlobalArea(area){
        return [
            this.fromGlobal(area[0], 0),
            this.fromGlobal(area[1], 1),
            this.fromGlobal(area[2], 0),
            this.fromGlobal(area[3], 1)
        ];
    }
    getNumTemplate(num, index=0, frames, alt){
        let type = typeof num;
        switch(type){
            case 'number':
                return num;
            case 'object':
                if(num){
                    let frame = frames[num[1]||""];
                    if(!frame){
                        frame = frames[""];
                        if(!frame) frame = this;
                    }
                    return this.fromGlobal(frame.toGlobal(frame.getNumTemplate(num[0], frames), index%2), index%2);
                }
            default:
                return alt;
        }
    }
    getPointTemplate(point, index=0, frames, alt){
        if(!point){
            if(!alt) alt = this.area;
            return [alt[0], alt[1]];
        }
        return [
            this.getNumTemplate(point[0], index, frames, alt[0]),
            this.getNumTemplate(point[1], index+1, frames, alt[1])
        ];
    }
    getAreaTemplate(area, frames, alt){
        if(!area) return [alt[0], alt[1], alt[2], alt[3]];
        return [
            this.getNumTemplate(area[0], 0, frames, alt[0]),
            this.getNumTemplate(area[1], 1, frames, alt[1]),
            this.getNumTemplate(area[2], 2, frames, alt[2]),
            this.getNumTemplate(area[3], 3, frames, alt[3])
        ];
    }
}

class CanvasTopFrame extends CanvasAreaFrame {
    init(ctx, frames){
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        let size = [0, 0, width, height];

        this.size = size;
        this.width = width;
        this.height = height;

        this.area = size;
        this.areaWidth = width;
        this.areaHeight = height;
        this.scale = [1, 1];
        this.delta = [0, 0];

        this.globalArea = size;
        this.globalWidth = width;
        this.globalHeight = height;
        this.globalScale = [1, 1];
        this.globalDelta = [0, 0];

        if(frames){
            frames[''] = this;
        }
    }
    // same no matter what
    to(num){
        return num;
    }
    toPoint(point){
        return [point[0], point[1]];
    }
    toArea(area){
        return [area[0], area[1], area[2], area[3]];
    }

    from(num){
        return num;
    }
    fromPoint(point){
        return [point[0], point[1]];
    }
    fromArea(area){
        return [area[0], area[1], area[2], area[3]];
    }

    toGlobal(num){
        return num;
    }
    toGlobalPoint(point){
        return [point[0], point[1]];
    }
    toGlobalArea(area){
        return [area[0], area[1], area[2], area[3]];
    }

    fromGlobal(num){
        return num;
    }
    fromGlobalPoint(point){
        return [point[0], point[1]];
    }
    fromGlobalArea(area){
        return [area[0], area[1], area[2], area[3]];
    }
}

let logged = new Set();

export function AreaFrame({children, size, area, name}){
    const save = useRef({});
    const frame = useRef(new CanvasAreaFrame());
    useCanvas(function(ctx, state){
        save.current.state = {frame: state.frame};
        frame.current.init(size, area, state.frame, state.frames, name);
        
        if(!logged.has(frame.current)){
            console.log(frame.current, state.frame);
            logged.add(frame.current);
        }

        ctx.scale(1/frame.current.scale[0], 1/frame.current.scale[1]);
        ctx.translate(-frame.current.delta[0], -frame.current.delta[1]);

        state.frame = frame.current;
    });
    return <Restore save={save}>{children}</Restore>
}

function InternalRestore({save}){
    useCanvas(function(ctx, state){
        ctx.restore();
        if(save){
            if(save.state){
                Object.assign(state, save.state);
                save.state = null;
            };
            if(save.restore){
                save.restore(state, save);
                save.restore = null;
            }
        }
    });
}

export function Restore({children, save}){
    useCanvas(function(ctx){
        ctx.save();
    });
    return <>{children}<InternalRestore save={save}/></>
}