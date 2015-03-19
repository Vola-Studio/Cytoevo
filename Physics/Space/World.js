/* World 世界生成器
 * 
 * WorldGenerator(opt) 生成新世界
 * 参数:
 * World(Object opt{
 *     unsigned int x,
 *     unsigned int y
 * })
 *
 * 抛出错误:
 * TypeError: opt is not a object
 * TypeError: opt.x is not a unsigned int
 * TypeError: opt.y is not a unsigned int
 *     x和y应该是大于等于0的整数
 *
 * getWorld() 获取世界
 *
 * getBlock(x, y) 获取位于(x,y)的单位
 * 参数:
 * getBlock(unsigned int x, unsigned int y)
 *
 * 抛出错误:
 * TypeError: x is not a unsigned int
 * TypeError: y is not a unsigned int
 *     x和y应该是大于等于0的整数
 *
 * 返回值:
 * 位于(x,y)的Block || null
 */
//当前世界和上一个世界
var world = null;
var vaild = require("../../Utils/vaild.js");
function WorldGenerator(opt){
    var Block = require("./Block.js");
    //条件检查
    if(!vaild(opt, Object)){
        console.log(opt);
        throw "TypeError: opt is not a object";
    }
    if(!vaild(opt.x, "unsigned int")){
        console.log(opt.x);
        throw "TypeError: opt.x is not a unsigned int";
    }
    if(!vaild(opt.y, "unsigned int")){
        console.log(opt.y);
        throw "TypeError: opt.y is not a unsigned int";
    }

    //删除旧世界
    world = [];
    
    //开始建立大小为x,y的世界
    for (var i = 0; i < opt.x; i++) {
        //第x行
        var thisLine = [];
        for (var j = 0; j < opt.y; j++) {
            //第y格
            thisLine.push(new Block({
                "x": i,
                "y": j
            }));
        }
        world.push(thisLine);
    }
}
function getWorld(){
    return world;
}
function getBlock(x, y){
    //条件检查
    if(!vaild(x, "unsigned int")){
        console.log(opt.x);
        throw "TypeError: x is not a unsigned int";
    }
    if(!vaild(y, "unsigned int")){
        console.log(opt.y);
        throw "TypeError: y is not a unsigned int";
    }

    //获取网格
    if(world[x]){
        if(world[x][y]){
            return world[x][y];
        }
    }
    return null;
}

module.exports = {
    generator: WorldGenerator,
    getWorld: getWorld,
    getBlock: getBlock
}
