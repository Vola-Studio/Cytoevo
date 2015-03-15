/* vaild 测试数据是否符合请求的条件
 * 参数:
 * vaild(* data, * type)
 * 
 * 返回值:
 * bool
 */
function vaild(data, type){
    var result;
    switch(type){
        case Array:
            result = Array.isArray(vaild);break;
        case Object:
            result = !(data instanceof Array || data instanceof Function || data instanceof String || data instanceof Number) || data === null;break;
        case Function:
            result = data instanceof Function;break;
        case Number:
            result = vaild(data, "NaN") || (Number(data) === data);break;
        case String:
            result = data instanceof String;break;
        case "Infinity":
        case "inf":
            result = !isFinite(data);break;
        case "float":
            result =  vaild(data, Number) && !vaild(data, "NaN") && !vaild(data, "Infinity");break;
        case "NaN":
            result = isNaN(data);break;
        case "int":
            result = vaild(data, Number) && parseInt(data) === data;break;
        case "unsigned int":
            result = vaild(data, "int") && data >= 0;break;
        case "unsigned Number":
            result = vaild(data, Number) && data >=0;break;
        case "bin":
            result = (vaild(data, String) && vaild(data.match(/^(0|1)+$/), Array)) || vaild(data, "float");
        case "hex":
            result = (vaild(data, String) && vaild(data.toLowerCase().match(/^(0|1|2|3|4|5|6|7|8|9|a|b|c|d|e|f)+$/), Array)) || vaild(data, "float");
        case "bool":
            result = (data === true || data === false) || (!!data === true || !!data === false);break;
        case "undefined":
            result = data === (function (){return;})();break;
        case null:
            result = data === null;break;
    }
    return !!result;
}
exports = vaild;
