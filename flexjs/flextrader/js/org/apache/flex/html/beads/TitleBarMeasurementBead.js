/**
 * Generated by Apache Flex Cross-Compiler from org/apache/flex/html/beads/TitleBarMeasurementBead.as
 * org.apache.flex.html.beads.TitleBarMeasurementBead
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('org.apache.flex.html.beads.TitleBarMeasurementBead');

goog.require('org.apache.flex.core.IMeasurementBead');



/**
 *  constructor.
 *
 *  @langversion 3.0
 *  @playerversion Flash 10.2
 *  @playerversion AIR 2.6
 *  @productversion FlexJS 0.0
 * @constructor
 * @implements {org.apache.flex.core.IMeasurementBead}
 */
org.apache.flex.html.beads.TitleBarMeasurementBead = function() {
};


/**
 * @private
 * @type {org.apache.flex.core.IStrand}
 */
org.apache.flex.html.beads.TitleBarMeasurementBead.prototype._strand;


Object.defineProperties(org.apache.flex.html.beads.TitleBarMeasurementBead.prototype, /** @lends {org.apache.flex.html.beads.TitleBarMeasurementBead.prototype} */ {
/** @export */
measuredWidth: {
get: /** @this {org.apache.flex.html.beads.TitleBarMeasurementBead} */ function() {
  var /** @type {number} */ mwidth = 0;
  var /** @type {org.apache.flex.html.TitleBar} */ titleBar = org.apache.flex.utils.Language.as(this._strand, org.apache.flex.html.TitleBar);
  var /** @type {org.apache.flex.html.beads.TitleBarView} */ titleView = org.apache.flex.utils.Language.as(this._strand.getBeadByType(org.apache.flex.html.beads.TitleBarView), org.apache.flex.html.beads.TitleBarView);
  var /** @type {org.apache.flex.core.IMeasurementBead} */ labelMeasure = titleView.titleLabel.measurementBead;
  mwidth = labelMeasure.measuredWidth;
  if (titleBar.showCloseButton) {
    var /** @type {org.apache.flex.core.IMeasurementBead} */ buttonMeasure = titleView.closeButton.measurementBead;
    mwidth += buttonMeasure.measuredWidth;
  }
  return mwidth;
}},
/** @export */
strand: {
set: /** @this {org.apache.flex.html.beads.TitleBarMeasurementBead} */ function(value) {
  this._strand = value;
}},
/** @export */
measuredHeight: {
get: /** @this {org.apache.flex.html.beads.TitleBarMeasurementBead} */ function() {
  var /** @type {number} */ mheight = 0;
  var /** @type {org.apache.flex.html.TitleBar} */ titleBar = org.apache.flex.utils.Language.as(this._strand, org.apache.flex.html.TitleBar);
  var /** @type {org.apache.flex.html.beads.TitleBarView} */ titleView = org.apache.flex.utils.Language.as(this._strand.getBeadByType(org.apache.flex.html.beads.TitleBarView), org.apache.flex.html.beads.TitleBarView);
  var /** @type {org.apache.flex.core.IMeasurementBead} */ labelMeasure = titleView.titleLabel.measurementBead;
  mheight = labelMeasure.measuredHeight;
  if (titleBar.showCloseButton) {
    var /** @type {org.apache.flex.core.IMeasurementBead} */ buttonMeasure = titleView.closeButton.measurementBead;
    mheight = Math.max(mheight, buttonMeasure.measuredHeight);
  }
  return mheight;
}}}
);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.beads.TitleBarMeasurementBead.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'TitleBarMeasurementBead', qName: 'org.apache.flex.html.beads.TitleBarMeasurementBead'}], interfaces: [org.apache.flex.core.IMeasurementBead] };
