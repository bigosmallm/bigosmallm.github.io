/**
 * Generated by Apache Flex Cross-Compiler from org/apache/flex/html/beads/controllers/DragMouseController.as
 * org.apache.flex.html.beads.controllers.DragMouseController
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('org.apache.flex.html.beads.controllers.DragMouseController');

goog.require('org.apache.flex.events.EventDispatcher');
goog.require('org.apache.flex.core.IBead');



/**
 *  constructor.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 10.2
 *  @playerversion AIR 2.6
 *  @productversion FlexJS 0.0
 * @constructor
 * @extends {org.apache.flex.events.EventDispatcher}
 * @implements {org.apache.flex.core.IBead}
 */
org.apache.flex.html.beads.controllers.DragMouseController = function() {
  org.apache.flex.html.beads.controllers.DragMouseController.base(this, 'constructor');
  this.threshold = org.apache.flex.html.beads.controllers.DragMouseController.defaultThreshold;
};
goog.inherits(org.apache.flex.html.beads.controllers.DragMouseController, org.apache.flex.events.EventDispatcher);


/**
 * @export
 * @type {boolean}
 */
org.apache.flex.html.beads.controllers.DragMouseController.dragging = false;


/**
 * @export
 * @type {org.apache.flex.core.IUIBase}
 */
org.apache.flex.html.beads.controllers.DragMouseController.dragImage;


/**
 * @export
 * @type {number}
 */
org.apache.flex.html.beads.controllers.DragMouseController.dragImageOffsetX = 0;


/**
 * @export
 * @type {number}
 */
org.apache.flex.html.beads.controllers.DragMouseController.dragImageOffsetY = 0;


/**
 * @export
 * @type {number}
 */
org.apache.flex.html.beads.controllers.DragMouseController.defaultThreshold = 4;


/**
 * @export
 * @type {number}
 */
org.apache.flex.html.beads.controllers.DragMouseController.prototype.threshold = 4;


/**
 * @private
 * @type {org.apache.flex.core.IStrand}
 */
org.apache.flex.html.beads.controllers.DragMouseController.prototype._strand;


/**
 * @private
 * @type {number}
 */
org.apache.flex.html.beads.controllers.DragMouseController.prototype.mouseDownX;


/**
 * @private
 * @type {number}
 */
org.apache.flex.html.beads.controllers.DragMouseController.prototype.mouseDownY;


/**
 * @private
 * @type {org.apache.flex.core.IPopUpHost}
 */
org.apache.flex.html.beads.controllers.DragMouseController.prototype.host;


/**
 *  @asprivate
 * @private
 * @param {org.apache.flex.events.MouseEvent} event
 */
org.apache.flex.html.beads.controllers.DragMouseController.prototype.dragMouseDownHandler = function(event) {
  org.apache.flex.utils.Language.trace("dragMouseDown");
  org.apache.flex.utils.Language.as(this._strand, org.apache.flex.core.IUIBase, true).topMostEventDispatcher.addEventListener(org.apache.flex.events.MouseEvent.MOUSE_MOVE, org.apache.flex.utils.Language.closure(this.dragMouseMoveHandler, this, 'dragMouseMoveHandler'));
  org.apache.flex.utils.Language.as(this._strand, org.apache.flex.core.IUIBase, true).topMostEventDispatcher.addEventListener(org.apache.flex.events.MouseEvent.MOUSE_UP, org.apache.flex.utils.Language.closure(this.dragMouseUpHandler, this, 'dragMouseUpHandler'));
  this.mouseDownX = event.screenX;
  this.mouseDownY = event.screenY;
  event.preventDefault();
};


/**
 * @private
 * @param {org.apache.flex.events.MouseEvent} event
 */
org.apache.flex.html.beads.controllers.DragMouseController.prototype.dragMouseMoveHandler = function(event) {
  var /** @type {org.apache.flex.geom.Point} */ pt;
  var /** @type {org.apache.flex.events.DragEvent} */ dragEvent;
  org.apache.flex.utils.Language.trace("dragMouseMove");
  event.preventDefault();
  if (!org.apache.flex.html.beads.controllers.DragMouseController.dragging) {
    org.apache.flex.utils.Language.trace("not dragging anything else");
    if (Math.abs(event.screenX - this.mouseDownX) > this.threshold || Math.abs(event.screenY - this.mouseDownY) > this.threshold) {
      org.apache.flex.utils.Language.trace("sending dragStart");
      dragEvent = org.apache.flex.events.DragEvent.createDragEvent("dragStart", event);
      org.apache.flex.events.DragEvent.dispatchDragEvent(dragEvent, org.apache.flex.utils.Language.as(this._strand, org.apache.flex.events.IEventDispatcher, true));
      if (org.apache.flex.events.DragEvent.dragSource != null) {
        org.apache.flex.html.beads.controllers.DragMouseController.dragging = true;
        this.host = org.apache.flex.utils.UIUtils.findPopUpHost(org.apache.flex.utils.Language.as(this._strand, org.apache.flex.core.IUIBase));
        this.host.addElement(org.apache.flex.html.beads.controllers.DragMouseController.dragImage);
        pt = org.apache.flex.utils.PointUtils.globalToLocal(new org.apache.flex.geom.Point(event.clientX, event.clientY), this.host);
        org.apache.flex.html.beads.controllers.DragMouseController.dragImage.x = pt.x + org.apache.flex.html.beads.controllers.DragMouseController.dragImageOffsetX;
        org.apache.flex.html.beads.controllers.DragMouseController.dragImage.y = pt.y + org.apache.flex.html.beads.controllers.DragMouseController.dragImageOffsetY;
      }
    }
  } else {
    org.apache.flex.utils.Language.trace("sending dragMove " + event.target.toString());
    dragEvent = org.apache.flex.events.DragEvent.createDragEvent("dragMove", event);
    org.apache.flex.utils.Language.trace("client: " + event.clientX.toString() + " " + event.clientY.toString() + " " + event.target.toString());
    pt = org.apache.flex.utils.PointUtils.globalToLocal(new org.apache.flex.geom.Point(event.clientX, event.clientY), this.host);
    org.apache.flex.utils.Language.trace("host: " + pt.x.toString() + " " + pt.y.toString());
    org.apache.flex.html.beads.controllers.DragMouseController.dragImage.x = pt.x + org.apache.flex.html.beads.controllers.DragMouseController.dragImageOffsetX;
    org.apache.flex.html.beads.controllers.DragMouseController.dragImage.y = pt.y + org.apache.flex.html.beads.controllers.DragMouseController.dragImageOffsetY;
    org.apache.flex.events.DragEvent.dispatchDragEvent(dragEvent, org.apache.flex.utils.Language.as(event.target, org.apache.flex.events.IEventDispatcher, true));
  }
};


/**
 * @private
 * @param {org.apache.flex.events.MouseEvent} event
 */
org.apache.flex.html.beads.controllers.DragMouseController.prototype.dragMouseUpHandler = function(event) {
  org.apache.flex.utils.Language.trace("dragMouseUp");
  var /** @type {org.apache.flex.events.DragEvent} */ dragEvent;
  if (org.apache.flex.html.beads.controllers.DragMouseController.dragging) {
    org.apache.flex.utils.Language.trace("sending dragEnd");
    dragEvent = org.apache.flex.events.DragEvent.createDragEvent("dragEnd", event);
    org.apache.flex.events.DragEvent.dispatchDragEvent(dragEvent, org.apache.flex.utils.Language.as(event.target, org.apache.flex.events.IEventDispatcher, true));
    event.preventDefault();
  }
  org.apache.flex.html.beads.controllers.DragMouseController.dragging = false;
  org.apache.flex.events.DragEvent.dragSource = null;
  org.apache.flex.events.DragEvent.dragInitiator = null;
  if (org.apache.flex.html.beads.controllers.DragMouseController.dragImage && this.host)
    this.host.removeElement(org.apache.flex.html.beads.controllers.DragMouseController.dragImage);
  org.apache.flex.html.beads.controllers.DragMouseController.dragImage = null;
  org.apache.flex.utils.Language.as(this._strand, org.apache.flex.core.IUIBase, true).topMostEventDispatcher.removeEventListener(org.apache.flex.events.MouseEvent.MOUSE_MOVE, org.apache.flex.utils.Language.closure(this.dragMouseMoveHandler, this, 'dragMouseMoveHandler'));
  org.apache.flex.utils.Language.as(this._strand, org.apache.flex.core.IUIBase, true).topMostEventDispatcher.removeEventListener(org.apache.flex.events.MouseEvent.MOUSE_UP, org.apache.flex.utils.Language.closure(this.dragMouseUpHandler, this, 'dragMouseUpHandler'));
};


Object.defineProperties(org.apache.flex.html.beads.controllers.DragMouseController.prototype, /** @lends {org.apache.flex.html.beads.controllers.DragMouseController.prototype} */ {
/** @export */
strand: {
get: /** @this {org.apache.flex.html.beads.controllers.DragMouseController} */ function() {
  return this._strand;
},
set: /** @this {org.apache.flex.html.beads.controllers.DragMouseController} */ function(value) {
  this._strand = value;
  org.apache.flex.utils.Language.as(this._strand, org.apache.flex.events.IEventDispatcher, true).addEventListener(org.apache.flex.events.MouseEvent.MOUSE_DOWN, org.apache.flex.utils.Language.closure(this.dragMouseDownHandler, this, 'dragMouseDownHandler'));
}}}
);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.beads.controllers.DragMouseController.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'DragMouseController', qName: 'org.apache.flex.html.beads.controllers.DragMouseController'}], interfaces: [org.apache.flex.core.IBead] };
