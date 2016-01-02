/**
 * Generated by Apache Flex Cross-Compiler from ProductJSONItemConverter.as
 * ProductJSONItemConverter
 *
 * @fileoverview
 *
 * @suppress {checkTypes}
 */

goog.provide('ProductJSONItemConverter');

goog.require('samples.flexstore.Product');
goog.require('org.apache.flex.collections.converters.JSONItemConverter');



/**
 * @constructor
 * @extends {org.apache.flex.collections.converters.JSONItemConverter}
 */
ProductJSONItemConverter = function() {
  ProductJSONItemConverter.base(this, 'constructor');
};
goog.inherits(ProductJSONItemConverter, org.apache.flex.collections.converters.JSONItemConverter);


/**
 * @export
 * @param {string} data
 * @return {Object}
 * @override
 */
ProductJSONItemConverter.prototype.convertItem = function(data) {
  var /** @type {Object} */ obj = ProductJSONItemConverter.base(this, 'convertItem', data);
  var /** @type {samples.flexstore.Product} */ product = new samples.flexstore.Product();
  for (var /** @type {string} */ p in obj)
    product[p] = obj[p];
  return product;
};


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
ProductJSONItemConverter.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'ProductJSONItemConverter', qName: 'ProductJSONItemConverter'}] };