/**
 * Generated by Apache Flex Cross-Compiler from org/apache/flex/html/beads/layouts/LayoutChangeNotifier.as
 * org.apache.flex.html.beads.layouts.LayoutChangeNotifier
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('org.apache.flex.html.beads.layouts.LayoutChangeNotifier');

goog.require('org.apache.flex.core.IBead');



/**
 *  constructor.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 10.2
 *  @playerversion AIR 2.6
 *  @productversion FlexJS 0.0
 * @constructor
 * @implements {org.apache.flex.core.IBead}
 */
org.apache.flex.html.beads.layouts.LayoutChangeNotifier = function() {
};


/**
 * @private
 * @type {org.apache.flex.core.IStrand}
 */
org.apache.flex.html.beads.layouts.LayoutChangeNotifier.prototype._strand;


/**
 * @private
 * @type {*}
 */
org.apache.flex.html.beads.layouts.LayoutChangeNotifier.prototype._value = undefined;


Object.defineProperties(org.apache.flex.html.beads.layouts.LayoutChangeNotifier.prototype, /** @lends {org.apache.flex.html.beads.layouts.LayoutChangeNotifier.prototype} */ {
/** @export */
initialValue: {
set: /** @this {org.apache.flex.html.beads.layouts.LayoutChangeNotifier} */ function(value) {
  this._value = value;
}},
/** @export */
strand: {
set: /** @this {org.apache.flex.html.beads.layouts.LayoutChangeNotifier} */ function(value) {
  this._strand = value;
}},
/** @export */
watchedProperty: {
set: /** @this {org.apache.flex.html.beads.layouts.LayoutChangeNotifier} */ function(value) {
  if (this._value !== value) {
    this._value = value;
    if (org.apache.flex.utils.Language.is(this._strand, org.apache.flex.core.IBeadView))
      org.apache.flex.utils.Language.as(this._strand, org.apache.flex.core.IBeadView, true).host.dispatchEvent(new org.apache.flex.events.Event("layoutNeeded"));
    else
      org.apache.flex.utils.Language.as(this._strand, org.apache.flex.events.IEventDispatcher, true).dispatchEvent(new org.apache.flex.events.Event("layoutNeeded"));
  }
}}}
);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.beads.layouts.LayoutChangeNotifier.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'LayoutChangeNotifier', qName: 'org.apache.flex.html.beads.layouts.LayoutChangeNotifier'}], interfaces: [org.apache.flex.core.IBead] };