/**
 * AS3DOM
 *
 * @fileoverview
 *
 * @suppress {checkTypes}
 */

goog.provide('AS3DOM');

goog.require('USMapCoords');
goog.require('org_apache_flex_utils_Language');




/**
 * @constructor
 */
AS3DOM = function() {
};


/**
 * @expose
 */
AS3DOM.prototype.start = function() {
  var /** @type {HTMLDivElement} */ title = org_apache_flex_utils_Language.as(document.createElement("div"), HTMLDivElement, true);
  title.innerHTML = "US Map";
  document.body.appendChild(title);
  var /** @type {SVGElement} */ map = org_apache_flex_utils_Language.as(document.createElementNS("http://www.w3.org/2000/svg", "svg"), SVGElement, true);
  map.style.width = 1000 + "px";
  map.style.height = 1000 + "px";
  document.body.appendChild(map);
  var /** @type {Object} */ usmapCoords = new USMapCoords().usmap;
  for (var /** @type {Object} */ state in usmapCoords) {
    var /** @type {SVGPathElement} */ path = org_apache_flex_utils_Language.as(document.createElementNS("http://www.w3.org/2000/svg", "path"), SVGPathElement, true);
    path.setAttribute("d", usmapCoords[state]);
    path.setAttribute("fill", "#FF0000");
    path.setAttribute("opacity", Math.random());
    path.addEventListener("mouseover", goog.bind(this.handleStateRollOver, this), false);
    path.addEventListener("mouseout", goog.bind(this.handleStateRollOut, this), false);
    map.appendChild(path);
  }
};


/**
 * @private
 * @param {MouseEvent} event
 */
AS3DOM.prototype.handleStateRollOver = function(event) {
  org_apache_flex_utils_Language.as(event.target, SVGPathElement, true).setAttribute("fill", "#0000FF");
};


/**
 * @private
 * @param {MouseEvent} event
 */
AS3DOM.prototype.handleStateRollOut = function(event) {
  org_apache_flex_utils_Language.as(event.target, SVGPathElement, true).setAttribute("fill", "#FF0000");
};


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
AS3DOM.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'AS3DOM', qName: 'AS3DOM'}] };


// Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('AS3DOM', AS3DOM);