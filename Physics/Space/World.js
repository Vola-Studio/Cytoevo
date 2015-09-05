/* World 世界生成器
 * 
 * WorldGenerator(opt) 生成新世界
 * 参数:
 * World(Object opt{
 *     unsigned int x,
 *     unsigned int y
 * })
 *
 * getWorld() 获取世界
 *
 * getBlock(x, y) 获取位于(x,y)的单位
 * 参数:
 * getBlock(unsigned int x, unsigned int y)
 *
 * 返回值:
 * 位于(x,y)的Block || null
 */
//当前世界和上一个世界
var world = null;
function WorldGenerator(opt){
    var Block = require("./Block.js");

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
