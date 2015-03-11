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
var world;
function WorldGenerator(opt){
    var Block = require("Block.js");
    //TODO 条件检查
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
function getBlock(x, y)){
    //TODO 条件检查
    if(world[x]){
        if(world[x][y]){
            return world[x][y];
        }
    }
    return null;
}

exports = {
    generator: WorldGenerator,
    getWorld: getWorld,
    getBlock: getBlock
}
