
const util = {timestamp: null};

if(window && window.performance && window.performance.now){
    util.timestamp = function(){return window.performance.now()};
} else if(Date && Date.now){
    util.timestamp = (function(){
        {
            let start = Date.now();
            return function(){return Date.now()-start};
        }
    })();
} else {
    console.error("No util.timestamp because there is no window.performance.now or Date.now");
}

export const timestamp = util.timestamp;

export default util;
