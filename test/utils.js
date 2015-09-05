require("../Utils/format.js");
var assert = require("assert");

describe('String.prototype.format()', function(){
    it('should replace positional parameters', function(){
        assert.equal("Hello, World!", "%1%2%3%4%5, %6%7%8%9d!".format("H", "e", "l", "l", "o", "W", "o", "r", "l"));
    })
})