
import { useMemo, useReducer, useSyncExternalStore } from 'react'
import { produceWithPatches, produce } from 'immer'

export function usePatchImmerReducer(reducer, initialArg, init){
    const patchReducer = useMemo(function () {
        return (state, action)=>produceWithPatches(state[0], (draft)=>reducer(draft, action));
    }, [reducer]);
    const [state, dispatch] = useReducer(patchReducer, [initialArg, ()=>initialArg, ()=>initialArg], init);
    console.log(state);
    return [state, dispatch];
}

export function useDataBoundReducer(reducer, element){
    if(!element) element = {};
    const store = useMemo(()=>{
        if(!element) return {subscribe:()=>()=>undefined, getSnapshot:()=>undefined}
        if(!element.listeners) element.listeners = new Set();
        return {
            subscribe: (listener)=>{element.listeners.add(listener); return (l)=>{element.listeners.delete(l)}},
            getSnapshot: ()=>element.data
        }
    }, [element]);
    const data = useSyncExternalStore(store.subscribe, store.getSnapshot);
    const dispatch = useMemo(()=>function dispatch(action){
        // Uses immer
        let state = produce(element.data, (draft)=>reducer(draft, action));
        if(!Object.is(element.data, state)){
            element.data = state;
            // Updates react elements
            for(let listener of element.listeners){
                listener();
            }
        }
    }, [reducer, element]);
    return [data, dispatch];
  }