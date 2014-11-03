if (window.SlippyD == undefined)
	SlippyD = {};

if (SlippyD.support == undefined)
	SlippyD.support = {};

SlippyD.logo = {
	_layers: {
		r: null,
		g: null,
		b: null,
	},
	_targets: {
		r: 0,
		g: 0,
		b: 0,
	},
	_vels: {
		r: 0,
		g: 0,
		b: 0,
	},
	_transitioning: false,
	transition: function() {
		// early out if already transitioning
		if (this._transitioning)
			return;
		
		this._transitioning = true;
		setTimeout('SlippyD.logo._step();', 10);
	},
	_step: function() {
		var atTarget = true;
		
		var currR = this.rLayer().offsetTop;
		var deltaR = this._targets.r - currR;
		var dirR = (deltaR > 0) ? 1 : -1;
		var lastDirR = (this._vels.r > 0) ? 1 : -1;
		var accelR = (this._vels.r + dirR) * ((dirR == lastDirR) ? 2 : 0.5);
		var decelR = deltaR * 0.5;
		this._vels.r = (Math.abs(accelR) < Math.abs(decelR)) ? accelR : decelR;
		var newR = currR + this._vels.r;
		if (newR != currR) {
			atTarget = false;
			newR = Math.round(newR * 0.5) * 2; // round to even
			this.rLayer().setStyle({top: newR + 'px'});
		}
		
		var currG = this.gLayer().offsetTop;
		var deltaG = this._targets.g - currG;
		var dirG = (deltaG > 0) ? 1 : -1;
		var lastDirG = (this._vels.g > 0) ? 1 : -1;
		var accelG = (this._vels.g + dirG) * ((dirG == lastDirG) ? 2 : 0.5);
		var decelG = deltaG * 0.5;
		this._vels.g = (Math.abs(accelG) < Math.abs(decelG)) ? accelG : decelG;
		var newG = currG + this._vels.g;
		if (newG != currG) {
			atTarget = false;
			newG = Math.round(newG * 0.5) * 2; // round to even
			this.gLayer().setStyle({top: newG + 'px'});
		}
		
		var currB = this.bLayer().offsetTop;
		var deltaB = this._targets.b - currB;
		var dirB = (deltaB > 0) ? 1 : -1;
		var lastDirB = (this._vels.b > 0) ? 1 : -1;
		var accelB = (this._vels.b + dirB) * ((dirB == lastDirB) ? 2 : 0.5);
		var decelB = deltaB * 0.5;
		this._vels.b = (Math.abs(accelB) < Math.abs(decelB)) ? accelB : decelB;
		var newB = currB + this._vels.b;
		if (newB != currB) {
			atTarget = false;
			newB = Math.round(newB * 0.5) * 2; // round to even
			this.bLayer().setStyle({top: newB + 'px'});
		}
		
		if (!atTarget)
			setTimeout('SlippyD.logo._step();', 10);
		else
			this._transitioning = false;
	},
	rLayer: function() {
		if (this._layers.r == null)
			this._layers.r = $('logo').down('.r');
		return this._layers.r;
	},
	gLayer: function() {
		if (this._layers.g == null)
			this._layers.g = $('logo').down('.g');
		return this._layers.g;
	},
	bLayer: function() {
		if (this._layers.b == null)
			this._layers.b = $('logo').down('.b');
		return this._layers.b;
	},
	scrollChanged: function() {
		if (SlippyD.support.fixedPositioning == undefined)
			return;
		
		var fixed = SlippyD.support.fixedPositioning();
		var scrollOffsetTop = document.viewport.getScrollOffsets().top;
		
		this._targets.b = fixed ?
			(-scrollOffsetTop) :
			0;
		this._targets.b = Math.round(this._targets.b * 0.5) * 2; // round to even
		
		this._targets.g = fixed ?
			(this._targets.b * 0.667) : // equivalent to: -scrollOffsetTop * 0.667
			(scrollOffsetTop * 0.333);
		this._targets.g = Math.round(this._targets.g * 0.5) * 2; // round to even
		
		this._targets.r = fixed ?
			(this._targets.g * 0.5) : // equivalent to: -scrollOffsetTop * 0.333
			(scrollOffsetTop * 0.667);
		this._targets.r = Math.round(this._targets.r * 0.5) * 2; // round to even
		
		this.transition();
	},
	setup: function() {
		SlippyD.logo.scrollChanged();
	}
};
Event.observe(window, 'scroll', function() {
	SlippyD.logo.scrollChanged();
});
document.observe('SlippyD:window:loaded', function() {
	SlippyD.logo.setup();
});


Event.observe(window, 'load', function() {
	SlippyD.support.fixedPositioning = function() {
		if (this._fixedPositioning == undefined)
			this._fixedPositioning = _calc();
		
		return this._fixedPositioning;
		
		function _calc() {
			var isSupported = null;
			if (document.createElement) {
				var el = document.createElement('div');
				if (el && el.style) {
					el.style.position = 'fixed';
					el.style.top = '1px';
					
					if (document.body && document.body.appendChild && document.body.removeChild) {
						var atTop = (document.viewport.getScrollOffsets().top == 0);
						
						if (atTop)
							window.scrollTo(0, 1);
						
						document.body.appendChild(el);
						isSupported = ($(el).cumulativeScrollOffset().top != 0);
						document.body.removeChild(el);
						
						if (atTop)
							window.scrollTo(0, 0);
					}
				}
			}
			return isSupported;
		}
	};
	
	document.fire('SlippyD:window:loaded');
});
