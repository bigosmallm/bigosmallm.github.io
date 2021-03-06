/**
 * Generated by Apache Flex Cross-Compiler from org/apache/flex/html/accessories/CurrencyFormatter.as
 * org.apache.flex.html.accessories.CurrencyFormatter
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('org.apache.flex.html.accessories.CurrencyFormatter');

goog.require('org.apache.flex.events.EventDispatcher');
goog.require('org.apache.flex.core.IFormatBead');



/**
 *  constructor
 *  
 *  @langversion 3.0
 *  @playerversion Flash 10.2
 *  @playerversion AIR 2.6
 *  @productversion FlexJS 0.0
 * @constructor
 * @extends {org.apache.flex.events.EventDispatcher}
 * @implements {org.apache.flex.core.IFormatBead}
 */
org.apache.flex.html.accessories.CurrencyFormatter = function() {
  org.apache.flex.html.accessories.CurrencyFormatter.base(this, 'constructor');
};
goog.inherits(org.apache.flex.html.accessories.CurrencyFormatter, org.apache.flex.events.EventDispatcher);


/**
 * @private
 * @type {org.apache.flex.core.IStrand}
 */
org.apache.flex.html.accessories.CurrencyFormatter.prototype._strand;


/**
 * @asprivate
 * @private
 * @param {org.apache.flex.events.Event} event
 */
org.apache.flex.html.accessories.CurrencyFormatter.prototype.handleBeadsAdded = function(event) {
  var /** @type {org.apache.flex.core.IBeadModel} */ model = org.apache.flex.utils.Language.as(this._strand.getBeadByType(org.apache.flex.core.IBeadModel), org.apache.flex.core.IBeadModel);
  model.addEventListener(this.eventName, org.apache.flex.utils.Language.closure(this.propertyChangeHandler, this, 'propertyChangeHandler'));
  model.addEventListener(this.propertyName + "Change", org.apache.flex.utils.Language.closure(this.propertyChangeHandler, this, 'propertyChangeHandler'));
  this.propertyChangeHandler(null);
};


/**
 * @private
 * @type {string}
 */
org.apache.flex.html.accessories.CurrencyFormatter.prototype._propertyName;


/**
 * @private
 * @type {string}
 */
org.apache.flex.html.accessories.CurrencyFormatter.prototype._eventName;


/**
 * @private
 * @type {string}
 */
org.apache.flex.html.accessories.CurrencyFormatter.prototype._formattedResult;


/**
 * @private
 * @type {number}
 */
org.apache.flex.html.accessories.CurrencyFormatter.prototype._fractionalDigits = 2;


/**
 * @private
 * @type {string}
 */
org.apache.flex.html.accessories.CurrencyFormatter.prototype._currencySymbol = "$";


/**
 * @asprivate
 * @private
 * @param {org.apache.flex.events.Event} event
 */
org.apache.flex.html.accessories.CurrencyFormatter.prototype.propertyChangeHandler = function(event) {
  var /** @type {org.apache.flex.core.IBeadModel} */ model = org.apache.flex.utils.Language.as(this._strand.getBeadByType(org.apache.flex.core.IBeadModel), org.apache.flex.core.IBeadModel);
  var /** @type {Object} */ value = model[this.propertyName];
  this._formattedResult = this.format(value);
  var /** @type {org.apache.flex.events.Event} */ newEvent = new org.apache.flex.events.Event("formatChanged");
  this.dispatchEvent(newEvent);
};


/**
 *  Computes the formatted string.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 10.2
 *  @playerversion AIR 2.6
 *  @productversion FlexJS 0.0
 * @export
 * @param {Object} value
 * @return {string}
 */
org.apache.flex.html.accessories.CurrencyFormatter.prototype.format = function(value) {
  if (value == null)
    return "";
  var /** @type {number} */ num = Number(value);
  var /** @type {string} */ source = num.toFixed(this.fractionalDigits);
  return this.currencySymbol + source;
};


Object.defineProperties(org.apache.flex.html.accessories.CurrencyFormatter.prototype, /** @lends {org.apache.flex.html.accessories.CurrencyFormatter.prototype} */ {
/** @export */
propertyName: {
get: /** @this {org.apache.flex.html.accessories.CurrencyFormatter} */ function() {
  if (this._propertyName == null) {
    return "text";
  }
  return this._propertyName;
},
set: /** @this {org.apache.flex.html.accessories.CurrencyFormatter} */ function(value) {
  this._propertyName = value;
}},
/** @export */
fractionalDigits: {
get: /** @this {org.apache.flex.html.accessories.CurrencyFormatter} */ function() {
  return this._fractionalDigits;
},
set: /** @this {org.apache.flex.html.accessories.CurrencyFormatter} */ function(value) {
  this._fractionalDigits = value;
}},
/** @export */
currencySymbol: {
get: /** @this {org.apache.flex.html.accessories.CurrencyFormatter} */ function() {
  return this._currencySymbol;
},
set: /** @this {org.apache.flex.html.accessories.CurrencyFormatter} */ function(value) {
  this._currencySymbol = value;
}},
/** @export */
strand: {
set: /** @this {org.apache.flex.html.accessories.CurrencyFormatter} */ function(value) {
  this._strand = value;
  org.apache.flex.utils.Language.as(value, org.apache.flex.events.IEventDispatcher, true).addEventListener("beadsAdded", org.apache.flex.utils.Language.closure(this.handleBeadsAdded, this, 'handleBeadsAdded'));
}},
/** @export */
eventName: {
get: /** @this {org.apache.flex.html.accessories.CurrencyFormatter} */ function() {
  if (this._eventName == null) {
    return this._propertyName + "Changed";
  }
  return this._eventName;
},
set: /** @this {org.apache.flex.html.accessories.CurrencyFormatter} */ function(value) {
  this._eventName = value;
}},
/** @export */
formattedString: {
get: /** @this {org.apache.flex.html.accessories.CurrencyFormatter} */ function() {
  return this._formattedResult;
}}}
);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.accessories.CurrencyFormatter.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'CurrencyFormatter', qName: 'org.apache.flex.html.accessories.CurrencyFormatter'}], interfaces: [org.apache.flex.core.IFormatBead] };
