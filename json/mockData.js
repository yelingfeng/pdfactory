/**
 * Created by yelingfeng on 2016/8/1.
 */

var Mock  = require("mockjs");
var Random = Mock.Random;


module.exports = function() {

    var datas = [];

    for(var i = 0 ; i< 10 ; i++){
        var content = Random.cparagraph(0,10);
        datas.push({
            id : i ,
            title : Random.cword(8,20),
            desc : content.substr(0,20),
            num : Random.integer(100,500)
        })
    }

    return {
        news : datas
    }
}
