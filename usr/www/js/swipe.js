function Swipe(elem, focusTable, callback) {
	var self = this;
	this.callback = callback;

//	function handleEvent(e) {
//		self.touchHandler(e);
//	}

//	elem.addEventListener('touchstart', this.handleEvent, false);
//	elem.addEventListener('touchmove', this.handleEvent, false);
//	elem.addEventListener('touchend', this.handleEvent, false);
    this.handleEvent = function (e){
		self.touchHandler(e);
	}
    this.cid = elem;
    self.hookEventListener(elem, this);
    if(null != focusTable)
        self.hookTableEventListener(focusTable, this);
}

Swipe.prototype.hookTableEventListener = function (elem, objSwipe) {
	elem.addEventListener('touchstart', function(){ objSwipe.unhookEventListener(objSwipe.cid, objSwipe);}, false);
	elem.addEventListener('touchend', function(){ objSwipe.hookEventListener(objSwipe.cid, objSwipe);}, false);    
}

Swipe.prototype.hookEventListener = function (elem, objSwipe) {
	elem.addEventListener('touchstart', objSwipe.handleEvent, false);
	elem.addEventListener('touchmove', objSwipe.handleEvent, false);
	elem.addEventListener('touchend', objSwipe.handleEvent, false);    
}
Swipe.prototype.unhookEventListener = function (elem, objSwipe) {
	elem.removeEventListener('touchstart', objSwipe.handleEvent);
	elem.removeEventListener('touchmove', objSwipe.handleEvent);
	elem.removeEventListener('touchend', objSwipe.handleEvent);    
}

Swipe.prototype.touches = {
	"touchstart": {"x":-1, "y":-1},
	"touchmove" : {"x":-1, "y":-1},
	"touchend"  : false,
	"direction" : "undetermined"
};
Swipe.prototype.reset = function() {
    this.touches.touchstart.x = this.touches.touchstart.y = this.touches.touchmove.x = this.touches.touchmove.y = -1;
}
Swipe.prototype.touchHandler = function (event) {
	var touch;
	if (typeof event !== 'undefined'){
		if (typeof event.touches !== 'undefined') {
			touch = event.touches[0];
			switch (event.type) {
				case 'touchstart':
				case 'touchmove':
					this.touches[event.type].x = touch.pageX;
					this.touches[event.type].y = touch.pageY;
					break;
				case 'touchend':
					this.touches[event.type] = true;
					var x = (this.touches.touchstart.x - this.touches.touchmove.x),
						y = (this.touches.touchstart.y - this.touches.touchmove.y);
					if (x < 0) x /= -1;
					if (y < 0) y /= -1;
                    if((this.touches.touchmove.x == -1) || (this.touches.touchmove.y == -1)
                        || (x < 100) || (y > 50))
                    {
                        this.reset();    
                        break;
                    }
					if (x > y)
						this.touches.direction = this.touches.touchstart.x < this.touches.touchmove.x ? "right" : "left";
					else
						this.touches.direction = this.touches.touchstart.y < this.touches.touchmove.y ? "down" : "up";
                    this.reset();
					this.callback(event, this.touches.direction);
					break;
			}
		}
	}
};