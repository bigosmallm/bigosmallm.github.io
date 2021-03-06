/**
 * Generated by Apache Flex Cross-Compiler from samples\flexstore\ProductFilterEvent.as
 * samples.flexstore.ProductFilterEvent
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('samples.flexstore.ProductFilterEvent');

goog.require('org.apache.flex.events.Event');



/**
 * @constructor
 * @extends {org.apache.flex.events.Event}
 * @param {samples.flexstore.ProductFilter} filter
 * @param {boolean} live
 */
samples.flexstore.ProductFilterEvent = function(filter, live) {
  samples.flexstore.ProductFilterEvent.base(this, 'constructor', samples.flexstore.ProductFilterEvent.FILTER);
  this.filter = filter;
  this.live = live;
};
goog.inherits(samples.flexstore.ProductFilterEvent, org.apache.flex.events.Event);


/**
 * @export
 * @const
 * @type {string}
 */
samples.flexstore.ProductFilterEvent.FILTER = "filter";


/**
 * @export
 * @type {boolean}
 */
samples.flexstore.ProductFilterEvent.prototype.live;


/**
 * @export
 * @type {samples.flexstore.ProductFilter}
 */
samples.flexstore.ProductFilterEvent.prototype.filter;


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
samples.flexstore.ProductFilterEvent.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'ProductFilterEvent', qName: 'samples.flexstore.ProductFilterEvent'}] };
