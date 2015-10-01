/**
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *  @fileoverview
 *  @suppress {missingRequire}
 */
goog.provide('org.apache.flex.html.Container');

goog.require('org.apache.flex.core.ContainerBase');
goog.require('org.apache.flex.core.IContainer');



/**
 * @constructor
 * @implements {org.apache.flex.core.IContainer}
 * @extends {org.apache.flex.core.ContainerBase}
 */
org.apache.flex.html.Container = function() {
  org.apache.flex.html.Container.base(this, 'constructor');
};
goog.inherits(org.apache.flex.html.Container,
    org.apache.flex.core.ContainerBase);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.Container.prototype.FLEXJS_CLASS_INFO =
    { names: [{ name: 'Container',
                qName: 'org.apache.flex.html.Container' }],
      interfaces: [org.apache.flex.core.IContainer] };


/**
 * @override
 */
org.apache.flex.html.Container.prototype.createElement =
    function() {
  var cb;

  this.element = document.createElement('div');

  this.positioner = this.element;

  // absolute positioned children need a non-null
  // position value in the parent.  It might
  // get set to 'absolute' if the container is
  // also absolutely positioned
  this.positioner.style.position = 'relative';
  this.element.flexjs_wrapper = this;

  /*this.addEventListener('childrenAdded',
              goog.bind(this.runLayoutHandler, this));
  this.addEventListener('elementRemoved',
              goog.bind(this.runLayoutHandler, this));*/

  return this.element;
};


/**
 * @override
 *
org.apache.flex.html.Container.prototype.addElement =
    function(child) {
  org.apache.flex.html.Container.base(this, 'addElement', child);
  this.dispatchEvent('elementAdded');
};*/


/**
 * @override
 *
org.apache.flex.html.Container.prototype.removeElement =
    function(child) {
  org.apache.flex.html.Container.base(this, 'removeElement', child);
  this.dispatchEvent('elementRemoved');
};*/


/**
 * @export
 */
org.apache.flex.html.Container.prototype.childrenAdded =
    function() {
  this.dispatchEvent('childrenAdded');
};


/**
 * @export
 * @param {Object} event The event invoking the layout.
 *
org.apache.flex.html.Container.prototype.runLayoutHandler =
  function(event) {
  var layout = this.getBeadByType(org.apache.flex.core.IBeadLayout);
  if (layout) {
    layout.layout();
  }
};*/


/**
 * @export
 * @return {Array} the HTML DOM element children.
 */
org.apache.flex.html.Container.prototype.internalChildren =
    function() {
  return this.actualParent.element.children;
};


/**
 * @return {Array} All of the children of the container.
 */
org.apache.flex.html.Container.prototype.getChildren = function() {
  var arr = this.actualParent.element.children;
  var comparr = [];
  var n = arr.length;
  for (var i = 0; i < n; i++)
  {
    comparr.push(arr[i].flexjs_wrapper);
  }
  return comparr;
};

