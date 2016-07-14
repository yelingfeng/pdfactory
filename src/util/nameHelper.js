import {getName} from "./componentStrategy"
import {getCharCode} from "./zUtil"


function getBoxName (type){
    var name = getName(type);

    var len  = me.getComponentTypeNum(type) ;
    var codekey = getCharCode(len + 1);

    codekey = Zlay.handlerCodekey(codekey);

    name += codekey ;

    return {
        name: name,
        num : len + 1
    }
}


