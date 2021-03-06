/**
 * Generated by Apache Flex Cross-Compiler from org/apache/flex/effects/Tween.as
 * org.apache.flex.effects.Tween
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('org.apache.flex.effects.Tween');

goog.require('org.apache.flex.effects.Effect');



/**
 *  Constructor.
 *
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 * @constructor
 * @extends {org.apache.flex.effects.Effect}
 */
org.apache.flex.effects.Tween = function() {
  org.apache.flex.effects.Tween.base(this, 'constructor');
};
goog.inherits(org.apache.flex.effects.Tween, org.apache.flex.effects.Effect);


/**
 * @export
 * @const
 * @type {string}
 */
org.apache.flex.effects.Tween.TWEEN_END = "tweenEnd";


/**
 * @export
 * @const
 * @type {string}
 */
org.apache.flex.effects.Tween.TWEEN_START = "tweenStart";


/**
 * @export
 * @const
 * @type {string}
 */
org.apache.flex.effects.Tween.TWEEN_UPDATE = "tweenUpdate";


/**
 * @export
 * @type {Object}
 */
org.apache.flex.effects.Tween.activeTweens = {};


/**
 * @private
 * @type {org.apache.flex.core.IEffectTimer}
 */
org.apache.flex.effects.Tween.timer;


/**
 * @private
 * @type {number}
 */
org.apache.flex.effects.Tween.currentID = 1;


/**
 * @export
 * @type {number}
 */
org.apache.flex.effects.Tween.currentTime = NaN;


/**
 *  @asprivate
 * @private
 * @param {org.apache.flex.effects.Tween} tween
 */
org.apache.flex.effects.Tween.addTween = function(tween) {
  tween.id = org.apache.flex.effects.Tween.currentID++;
  org.apache.flex.effects.Tween.activeTweens[tween.id] = tween;
  if (!org.apache.flex.effects.Tween.timer) {
    org.apache.flex.effects.Tween.timer = org.apache.flex.utils.Language.as(org.apache.flex.core.ValuesManager.valuesImpl.newInstance(tween, "iEffectTimer"), org.apache.flex.core.IEffectTimer);
    org.apache.flex.effects.Tween.timer.addEventListener("update", org.apache.flex.effects.Tween.updateHandler);
  }
  org.apache.flex.effects.Tween.currentTime = org.apache.flex.effects.Tween.timer.start();
  tween.startTime = tween.previousUpdateTime = org.apache.flex.effects.Tween.currentTime;
};


/**
 *  @asprivate
 * @private
 * @param {org.apache.flex.effects.Tween} tween
 */
org.apache.flex.effects.Tween.removeTween = function(tween) {
  delete org.apache.flex.effects.Tween.activeTweens[tween.id];
  if (org.apache.flex.effects.Tween.activeTweens.length == 0)
    org.apache.flex.effects.Tween.timer.stop();
};


/**
 *  @asprivate
 * @private
 * @param {org.apache.flex.events.ValueEvent} event
 */
org.apache.flex.effects.Tween.updateHandler = function(event) {
  var /** @type {number} */ oldTime = org.apache.flex.effects.Tween.currentTime;
  org.apache.flex.effects.Tween.currentTime = org.apache.flex.utils.Language.as(event.value, Number);
  for (var /** @type {string} */ id in org.apache.flex.effects.Tween.activeTweens) {
    var /** @type {org.apache.flex.effects.Tween} */ tween = org.apache.flex.utils.Language.as(org.apache.flex.effects.Tween.activeTweens[id], org.apache.flex.effects.Tween, true);
    tween.update();
  }
};


/**
 * @private
 * @type {number}
 */
org.apache.flex.effects.Tween.prototype.id = -1;


/**
 * @private
 * @type {boolean}
 */
org.apache.flex.effects.Tween.prototype._doSeek = false;


/**
 * @private
 * @type {boolean}
 */
org.apache.flex.effects.Tween.prototype._isPlaying = true;


/**
 * @private
 * @type {boolean}
 */
org.apache.flex.effects.Tween.prototype._doReverse = false;


/**
 * @private
 * @type {number}
 */
org.apache.flex.effects.Tween.prototype.startTime;


/**
 * @private
 * @type {number}
 */
org.apache.flex.effects.Tween.prototype.previousUpdateTime;


/**
 * @private
 * @type {Function}
 */
org.apache.flex.effects.Tween.prototype.userEquation;


/**
 * @export
 * @type {number}
 */
org.apache.flex.effects.Tween.prototype.endValue;


/**
 * @export
 * @type {number}
 */
org.apache.flex.effects.Tween.prototype.startValue;


/**
 * @private
 * @type {boolean}
 */
org.apache.flex.effects.Tween.prototype.started = false;


/**
 * @export
 * @type {Object}
 */
org.apache.flex.effects.Tween.prototype.listener;


/**
 * @private
 * @type {number}
 */
org.apache.flex.effects.Tween.prototype._playheadTime = 0;


/**
 * @private
 * @type {boolean}
 */
org.apache.flex.effects.Tween.prototype._invertValues = false;


/**
 *  Interrupt the tween, jump immediately to the end of the tween, 
 *  and invoke the <code>onTweenEnd()</code> callback function.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 * @export
 */
org.apache.flex.effects.Tween.prototype.endTween = function() {
  var /** @type {org.apache.flex.events.ValueEvent} */ event = new org.apache.flex.events.ValueEvent(org.apache.flex.effects.Tween.TWEEN_END);
  var /** @type {Object} */ value = this.getCurrentValue(this.duration);
  event.value = value;
  this.dispatchEvent(event);
  this.listener.onTweenEnd(value);
  this.dispatchEvent(new org.apache.flex.events.Event(org.apache.flex.effects.Effect.EFFECT_END));
  if (this.id >= 0) {
    org.apache.flex.effects.Tween.removeTween(this);
    this.id = -1;
  }
};


/**
 *  @asprivate
 *  Returns true if the tween has ended.
 * @protected
 * @return {boolean}
 */
org.apache.flex.effects.Tween.prototype.update = function() {
  var /** @type {boolean} */ tweenEnded = false;
  this.previousUpdateTime = org.apache.flex.effects.Tween.currentTime;
  if (this._isPlaying || this._doSeek) {
    var /** @type {number} */ elapsedTime = org.apache.flex.effects.Tween.currentTime - this.startTime;
    this._playheadTime = elapsedTime;
    var /** @type {Object} */ currentValue = this.getCurrentValue(elapsedTime);
    if (elapsedTime >= this.duration && !this._doSeek) {
      this.endTween();
      tweenEnded = true;
    } else {
      if (!this.started) {
        var /** @type {org.apache.flex.events.ValueEvent} */ startEvent = new org.apache.flex.events.ValueEvent(org.apache.flex.effects.Tween.TWEEN_START);
        this.dispatchEvent(startEvent);
        this.started = true;
      }
      var /** @type {org.apache.flex.events.ValueEvent} */ event = new org.apache.flex.events.ValueEvent(org.apache.flex.effects.Tween.TWEEN_UPDATE);
      event.value = currentValue;
      this.dispatchEvent(event);
      this.listener.onTweenUpdate(currentValue);
    }
    this._doSeek = false;
  }
  return tweenEnded;
};


/**
 *  @asprivate
 * @protected
 * @param {number} currentTime
 * @return {Object}
 */
org.apache.flex.effects.Tween.prototype.getCurrentValue = function(currentTime) {
  if (this.duration == 0) {
    return this.endValue;
  }
  if (this._invertValues)
    currentTime = this.duration - currentTime;
  return this.userEquation(currentTime, this.startValue, this.endValue - this.startValue, this.duration);
};


/**
 *  @asprivate
 * @private
 * @param {number} t
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @return {number}
 */
org.apache.flex.effects.Tween.prototype.defaultEasingFunction = function(t, b, c, d) {
  return c / 2 * (Math.sin(Math.PI * (t / d - 0.5)) + 1) + b;
};


/**
 *  Advances the tween effect to the specified position. 
 *
 *  @asparam playheadTime The position, in milliseconds, between 0
 *  and the value of the <code>duration</code> property.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 * @export
 * @param {number} playheadTime
 */
org.apache.flex.effects.Tween.prototype.seek = function(playheadTime) {
  var /** @type {number} */ clockTime = org.apache.flex.effects.Tween.currentTime;
  this.previousUpdateTime = clockTime;
  this.startTime = clockTime - playheadTime;
  this._doSeek = true;
  this.update();
};


/**
 *  Plays the effect in reverse,
 *  starting from the current position of the effect.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 * @export
 * @override
 */
org.apache.flex.effects.Tween.prototype.reverse = function() {
  if (this._isPlaying) {
    this._doReverse = false;
    this.seek(this.duration - this._playheadTime);
    this._invertValues = !this._invertValues;
  } else {
    this._doReverse = !this._doReverse;
  }
};


/**
 *  Pauses the effect until you call the <code>resume()</code> method.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 * @export
 * @override
 */
org.apache.flex.effects.Tween.prototype.pause = function() {
  this._isPlaying = false;
};


/**
 *  Stops the tween, ending it without dispatching an event or calling
 *  the Tween's endFunction or <code>onTweenEnd()</code>. 
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 * @export
 * @override
 */
org.apache.flex.effects.Tween.prototype.play = function() {
  if (this.userEquation == null)
    this.userEquation = org.apache.flex.utils.Language.closure(this.defaultEasingFunction, this, 'defaultEasingFunction');
  org.apache.flex.effects.Tween.addTween(this);
};


/**
 *  Stops the tween, ending it without dispatching an event or calling
 *  the Tween's endFunction or <code>onTweenEnd()</code>. 
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 * @export
 * @override
 */
org.apache.flex.effects.Tween.prototype.stop = function() {
  if (this.id >= 0) {
    org.apache.flex.effects.Tween.removeTween(this);
    this.id = -1;
  }
};


/**
 *  Resumes the effect after it has been paused 
 *  by a call to the <code>pause()</code> method. 
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 * @export
 * @override
 */
org.apache.flex.effects.Tween.prototype.resume = function() {
  this._isPlaying = true;
  this.startTime = org.apache.flex.effects.Tween.currentTime - this._playheadTime;
  if (this._doReverse) {
    this.reverse();
    this._doReverse = false;
  }
};


Object.defineProperties(org.apache.flex.effects.Tween.prototype, /** @lends {org.apache.flex.effects.Tween.prototype} */ {
/** @export */
playReversed: {
get: /** @this {org.apache.flex.effects.Tween} */ function() {
  return this._invertValues;
},
set: /** @this {org.apache.flex.effects.Tween} */ function(value) {
  this._invertValues = value;
}},
/** @export */
playheadTime: {
get: /** @this {org.apache.flex.effects.Tween} */ function() {
  return this._playheadTime;
}},
/** @export */
easingFunction: {
set: /** @this {org.apache.flex.effects.Tween} */ function(value) {
  this.userEquation = value;
}}}
);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.effects.Tween.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'Tween', qName: 'org.apache.flex.effects.Tween'}] };
