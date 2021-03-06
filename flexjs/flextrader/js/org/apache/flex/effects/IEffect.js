/**
 * Generated by Apache Flex Cross-Compiler from org/apache/flex/effects/IEffect.as
 * org.apache.flex.effects.IEffect
 *
 * @fileoverview
 *
 * @suppress {checkTypes}
 */

goog.provide('org.apache.flex.effects.IEffect');

goog.require('org.apache.flex.events.IEventDispatcher');



/**
 * @interface
 * @extends {org.apache.flex.events.IEventDispatcher}
 */
org.apache.flex.effects.IEffect = function() {
};
/**  * @type {number}
 */org.apache.flex.effects.IEffect.prototype.duration;
org.apache.flex.effects.IEffect.prototype.reverse = function() {
};
org.apache.flex.effects.IEffect.prototype.pause = function() {
};
org.apache.flex.effects.IEffect.prototype.play = function() {
};
org.apache.flex.effects.IEffect.prototype.stop = function() {
};
org.apache.flex.effects.IEffect.prototype.resume = function() {
};
org.apache.flex.effects.IEffect.prototype.captureStartValues = function() {
};
org.apache.flex.effects.IEffect.prototype.captureEndValues = function() {
};


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.effects.IEffect.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'IEffect', qName: 'org.apache.flex.effects.IEffect'}], interfaces: [org.apache.flex.events.IEventDispatcher] };
