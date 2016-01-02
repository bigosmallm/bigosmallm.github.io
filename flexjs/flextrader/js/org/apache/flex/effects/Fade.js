/**
 * Generated by Apache Flex Cross-Compiler from org/apache/flex/effects/Fade.as
 * org.apache.flex.effects.Fade
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('org.apache.flex.effects.Fade');

goog.require('org.apache.flex.effects.Tween');
goog.require('org.apache.flex.core.IDocument');



/**
 *  Constructor.
 *
 *  @asparam target An object that will
 *  have its x and/or y property animated.
 *
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 * @constructor
 * @extends {org.apache.flex.effects.Tween}
 * @implements {org.apache.flex.core.IDocument}
 * @param {org.apache.flex.core.IUIBase=} target
 */
org.apache.flex.effects.Fade = function(target) {
  target = typeof target !== 'undefined' ? target : null;
  org.apache.flex.effects.Fade.base(this, 'constructor');
  this.actualTarget = target;
  this.startValue = 0;
  this.endValue = 1;
  this.listener = this;
};
goog.inherits(org.apache.flex.effects.Fade, org.apache.flex.effects.Tween);


/**
 * @private
 * @type {Object}
 */
org.apache.flex.effects.Fade.prototype.document;


/**
 * @private
 * @type {org.apache.flex.core.IUIBase}
 */
org.apache.flex.effects.Fade.prototype.actualTarget;


/**
 * @export
 * @type {string}
 */
org.apache.flex.effects.Fade.prototype.target;


/**
 * @private
 * @type {number}
 */
org.apache.flex.effects.Fade.prototype.d;


/**
 * @private
 * @type {number}
 */
org.apache.flex.effects.Fade.prototype.start;


/**
 * @export
 * @type {number}
 */
org.apache.flex.effects.Fade.prototype.alphaFrom;


/**
 * @export
 * @type {number}
 */
org.apache.flex.effects.Fade.prototype.alphaTo;


/**
 * @export
 * @param {Object} document
 * @param {string=} id
 */
org.apache.flex.effects.Fade.prototype.setDocument = function(document, id) {
  id = typeof id !== 'undefined' ? id : null;
  this.document = document;
};


/**
 *  @asprivate
 * @export
 * @override
 */
org.apache.flex.effects.Fade.prototype.play = function() {
  if (this.target != null)
    this.actualTarget = this.document[this.target];
  if (isNaN(this.alphaFrom))
    this.start = this.actualTarget.alpha;
  else
    this.start = this.alphaFrom;
  if (isNaN(this.alphaTo))
    this.d = 0;
  else
    this.d = this.alphaTo - this.start;
  org.apache.flex.effects.Fade.base(this, 'play');
};


/**
 * @export
 * @param {number} value
 */
org.apache.flex.effects.Fade.prototype.onTweenUpdate = function(value) {
  if (this.d)
    this.actualTarget.alpha = this.start + value * this.d;
};


/**
 * @export
 * @param {number} value
 */
org.apache.flex.effects.Fade.prototype.onTweenEnd = function(value) {
  if (this.d)
    this.actualTarget.alpha = this.start + this.d;
};


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.effects.Fade.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'Fade', qName: 'org.apache.flex.effects.Fade'}], interfaces: [org.apache.flex.core.IDocument] };