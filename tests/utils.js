require("../../Utils/format.js");
require("../../Utils/valid.js");

describe('Utils', function() {
    describe('#valid()', function() {
        var typeList = {
            "Array": Array,
            "Object": Object,
            "Function": Function,
            "String": String,
            "Number": Number,
            "RegExp": RegExp,
            "Infinity": "Infinity",
            "float": "float",
            "NaN": "NaN",
            "int": "int",
            "unsigned int": "unsigned int",
            "unsigned Number": "unsigned Number",
            "bin": "bin",
            "hex": "hex",
            "bool": "bool",
            "undefined": "undefined",
            "null": null
        }
        var accessList = {
            "Array": [new Array(1), Array(2), [3]],
            "Object": [{
                obj: ""
            }, null, new Object()],
            "Function": [function() {}, new Function()],
            "String": ["string", new String()],
            "Number": [1, -1, 3.14, -3.14, Infinity],
            "RegExp": [/RegExp/, new RegExp(/new RegExp/)],
            "Infinity": [Infinity],
            "float": [3.1415],
            "NaN": [NaN],
            "int": [-2],
            "unsigned int": [2],
            "unsigned Number": [450.12],
            "bin": ["10010", 450],
            "hex": ["123456789", "abcdef", "ABCDEF", "2B", "2b", 0x2b],
            "bool": [true, false, 0, 1, undefined, null],
            "undefined": [(function() {
                return;
            })()],
            "null": [null]
        };
        for (var typeIndex in typeList) {
            for (var accessListIndex in accessList[typeIndex]) {
                var accessed = accessList[typeIndex][accessListIndex];
                it('should give' + typeIndex + 'for' + JSON.stringify(accessed), function(){
                    assert.strictEqual(vaild(accessed, typeList[typeIndex]))
                })
            }
        }
    })
})

describe('String.prototype.format()', function(){
    it('should replace positional parameters', function(){
        assert.equal("%1%23%4%56%%78%9".format("Wow", "!", "Hello ", "World", "!", "20", "time is", "wasted", "!"), "Wow! Hello World! 20%time is wasted!")
    })
})