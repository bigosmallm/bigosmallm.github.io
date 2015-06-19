/**
 * USStatesMap
 *
 * @fileoverview
 *
 * @suppress {checkTypes}
 */

goog.provide('USStatesMap');

goog.require('MapCoords');
goog.require('org_apache_flex_utils_Language');




/**
 * @constructor
 */
USStatesMap = function() {
};


/**
 * @private
 * @type {HTMLDivElement}
 */
USStatesMap.prototype.title;


/**
 * @private
 * @type {SVGElement}
 */
USStatesMap.prototype.map;


/**
 * @expose
 */
USStatesMap.prototype.start = function() {
  this.createTitle();
  this.createMap();
};


/**
 * Create title
 * @private
 */
USStatesMap.prototype.createTitle = function() {
  this.title = org_apache_flex_utils_Language.as(document.createElement("div"), HTMLDivElement, true);
  this.title.innerHTML = "US Map (mouseover to highlight, click to animate)";
  document.body.appendChild(this.title);
};


/**
 * Create svg elements for map
 * Parse and render each state
 * @private
 */
USStatesMap.prototype.createMap = function() {
  this.map = org_apache_flex_utils_Language.as(document.createElementNS("http://www.w3.org/2000/svg", "svg"), SVGElement, true);
  this.map.style.width = 1000 + "px";
  this.map.style.height = 1000 + "px";
  document.body.appendChild(this.map);
  var /** @type {Object} */ usmapCoords = new MapCoords().usmap;
  var /** @type {SVGPathElement} */ path;
  for (var /** @type {string} */ state in usmapCoords) {
    path = org_apache_flex_utils_Language.as(document.createElementNS("http://www.w3.org/2000/svg", "path"), SVGPathElement, true);
    path.setAttribute("d", usmapCoords[state]);
    path.setAttribute("fill", "#FF0000");
    path.setAttribute("opacity", Math.random());
    path.addEventListener("mouseover", goog.bind(this.handleStateMouseOver, this), false);
    path.addEventListener("mouseout", goog.bind(this.handleStateMouseOut, this), false);
    path.addEventListener("click", goog.bind(this.handleStateClick, this), false);
    this.map.appendChild(path);
  }
};


/**
 * State mouseover handler
 * @private
 * @param {MouseEvent} event
 */
USStatesMap.prototype.handleStateMouseOver = function(event) {
  org_apache_flex_utils_Language.as(event.target, SVGPathElement, true).setAttribute("fill", "#0000FF");
};


/**
 * State mouseout handler
 * @private
 * @param {MouseEvent} event
 */
USStatesMap.prototype.handleStateMouseOut = function(event) {
  org_apache_flex_utils_Language.as(event.target, SVGPathElement, true).setAttribute("fill", "#FF0000");
};


/**
 * @private
 * @type {SVGPathElement}
 */
USStatesMap.prototype.pathToAnimate;


/**
 * @private
 * @type {number}
 */
USStatesMap.prototype.scaleValue = 1;


/**
 * State click handler
 * Start animating
 * @private
 * @param {MouseEvent} event
 */
USStatesMap.prototype.handleStateClick = function(event) {
  this.pathToAnimate = org_apache_flex_utils_Language.as(event.target, SVGPathElement, true);
  this.animateScaleUp();
};


/**
 * Increment scale of path element by 0.1 each frame
 * @private
 */
USStatesMap.prototype.animateScaleUp = function() {
  this.scaleValue += 0.1;
  this.setScale(this.pathToAnimate, this.scaleValue);
  if (this.scaleValue >= 1.5) {
    this.animateScaleDown();
  } else {
    requestAnimationFrame(goog.bind(this.animateScaleUp, this));
  }
};


/**
 * Decrement scale of path element by 0.1 each frame
 * @private
 */
USStatesMap.prototype.animateScaleDown = function() {
  this.scaleValue -= 0.1;
  this.setScale(this.pathToAnimate, this.scaleValue);
  if (this.scaleValue > 1) {
    requestAnimationFrame(goog.bind(this.animateScaleDown, this));
  }
};


/**
 * Apply scale transform; ensure element stays in place while scaling
 * @private
 * @param {SVGElement} element
 * @param {*} scale
 */
USStatesMap.prototype.setScale = function(element, scale) {
  var /** @type {SVGRect} */ boundingRect = this.pathToAnimate.getBBox();
  var /** @type {number} */ centerX = boundingRect.x;
  var /** @type {number} */ centerY = boundingRect.y;
  element.setAttribute("transform", "translate(" + centerX + "," + centerY + ") scale(" + this.scaleValue + ") translate(" + -1 * centerX + "," + -1 * centerY + ")");
};


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
USStatesMap.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'USStatesMap', qName: 'USStatesMap'}] };


// Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('USStatesMap', USStatesMap);