var Event = require("../Event/Event.js");
var assert = require("assert");

describe("Event - 事件订阅器", function (){
    var data = false;
    var args = [];
    
    describe("#on()", function (){
        it("should be able to set up an event - 订阅事件", function (){
           Event.on("testEvent", "testInstance", function (arg){
               data = true;
               args.push(arg);
           });
        });
    });
    
    describe("#publish()", function(){
        it("should publish a event - 发布事件", function (){
            Event.publish("testEvent", ["this is data"]);
        });
    });
    
    describe("receive message", function (){
        it("should receive message - 收到事件订阅", function (){
            assert(data, true);
            assert(args[0], "this is data");
        });
    });
});