/**
 * Generated by Apache Flex Cross-Compiler from org/apache/flex/core/ParentDocumentBead.as
 * org.apache.flex.core.ParentDocumentBead
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('org.apache.flex.core.ParentDocumentBead');

goog.require('org.apache.flex.events.EventDispatcher');
goog.require('org.apache.flex.core.IBead');



/**
 *  Constructor.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 10.2
 *  @playerversion AIR 2.6
 *  @productversion FlexJS 0.0
 * @constructor
 * @extends {org.apache.flex.events.EventDispatcher}
 * @implements {org.apache.flex.core.IBead}
 */
org.apache.flex.core.ParentDocumentBead = function() {
  org.apache.flex.core.ParentDocumentBead.base(this, 'constructor');
};
goog.inherits(org.apache.flex.core.ParentDocumentBead, org.apache.flex.events.EventDispatcher);


/**
 * @private
 * @type {org.apache.flex.core.IStrand}
 */
org.apache.flex.core.ParentDocumentBead.prototype._strand;


/**
 * @private
 * @type {string}
 */
org.apache.flex.core.ParentDocumentBead.prototype._id;


Object.defineProperties(org.apache.flex.core.ParentDocumentBead.prototype, /** @lends {org.apache.flex.core.ParentDocumentBead.prototype} */ {
/** @export */
id: {
get: /** @this {org.apache.flex.core.ParentDocumentBead} */ function() {
  return this._id;
},
set: /** @this {org.apache.flex.core.ParentDocumentBead} */ function(value) {
  if (this._id != value) {
    this._id = value;
    this.dispatchEvent(new org.apache.flex.events.Event("idChanged"));
  }
}},
/** @export */
parentDocument: {
get: /** @this {org.apache.flex.core.ParentDocumentBead} */ function() {
  var /** @type {Object} */ child = this._strand;
  child = child.parent;
  while (child) {
    if (org.apache.flex.utils.Language.is(child, org.apache.flex.core.IMXMLDocument)) {
      var /** @type {org.apache.flex.core.IMXMLDocument} */ doc = org.apache.flex.utils.Language.as(child, org.apache.flex.core.IMXMLDocument);
      if (doc.MXMLDescriptor != null)
        return doc;
    }
    child = child.parent;
  }
  return null;
}},
/** @export */
strand: {
set: /** @this {org.apache.flex.core.ParentDocumentBead} */ function(value) {
  this._strand = value;
}}}
);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.core.ParentDocumentBead.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'ParentDocumentBead', qName: 'org.apache.flex.core.ParentDocumentBead'}], interfaces: [org.apache.flex.core.IBead] };
