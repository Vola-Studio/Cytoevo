function vaild(data, type){
    if(type in [Array, Object, Function, Number, String]){
        if((isNaN(data) && type == Number) ||//NaN视为数字
           (type == Number && Number(data) == data) ||//数字检测(包括Infinity)
           (type == Object && !(data instanceof Array || data instanceof Function || data instanceof String || data instanceof Number)) ||//检测Obj
           (data == null && type == Object)){//null视为Object
               return true;
        }else{
            if(data instanceof type){
                return true;
            }else{
                return false;
            }
        }
    }else if(type in "int,unsigned int,unsigned Number,bin,hex,bool".split(",")){
        //TODO
    }
}
