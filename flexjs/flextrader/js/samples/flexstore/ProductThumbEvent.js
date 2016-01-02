/**
 * Generated by Apache Flex Cross-Compiler from samples\flexstore\ProductThumbEvent.as
 * samples.flexstore.ProductThumbEvent
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('samples.flexstore.ProductThumbEvent');

goog.require('org.apache.flex.events.Event');



/**
 * @constructor
 * @extends {org.apache.flex.events.Event}
 * @param {string} type
 * @param {samples.flexstore.Product} product
 */
samples.flexstore.ProductThumbEvent = function(type, product) {
  samples.flexstore.ProductThumbEvent.base(this, 'constructor', type);
  this.product = product;
};
goog.inherits(samples.flexstore.ProductThumbEvent, org.apache.flex.events.Event);


/**
 * @export
 * @const
 * @type {string}
 */
samples.flexstore.ProductThumbEvent.PURCHASE = "purchase";


/**
 * @export
 * @const
 * @type {string}
 */
samples.flexstore.ProductThumbEvent.COMPARE = "compare";


/**
 * @export
 * @const
 * @type {string}
 */
samples.flexstore.ProductThumbEvent.DETAILS = "details";


/**
 * @export
 * @const
 * @type {string}
 */
samples.flexstore.ProductThumbEvent.BROWSE = "browse";


/**
 * @export
 * @type {samples.flexstore.Product}
 */
samples.flexstore.ProductThumbEvent.prototype.product;


/**
 * @export
 * @return {org.apache.flex.events.Event}
 * @override
 */
samples.flexstore.ProductThumbEvent.prototype.cloneEvent = function() {
  return new samples.flexstore.ProductThumbEvent(this.type, this.product);
};


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
samples.flexstore.ProductThumbEvent.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'ProductThumbEvent', qName: 'samples.flexstore.ProductThumbEvent'}] };