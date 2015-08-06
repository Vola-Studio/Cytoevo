var Event = require("../Event/Event.js");
// Wpcap, now I see coffee good.
describe('Event', function(){
    var gotData = false
    var bathImg = {}
	describe('#on()', function(){
		it ('should be able to set up an event', function(){
			Event.on("bath", "takePhoto", function(){
                gotData = !gotData
                bathImg = arguments
            })
		})
	})
    describe('#publish', function(){
        var theImg=["|O<-<|", "|----|"]
        it ('should take a bath photo and make gotData true', function(){
            Event.publish('bath', theImg)
            assert.strictEqual(gotData, true)
            assert.strictEqual(bathImg[1], TheImg[1])
        })
        it ('should drop the camera in bathtub and lose data', function(){
            Event.publish('bath')
            assert.strictEqual(gotData, false)
            assert.strictEqual(bathImg, {})
        })
    })
    describe('#cancel', function(){
        it ('should cancel the event', function(){
            Event.cancel('bath', 'takePhoto')
        })
    })
})