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
goog.provide('org.apache.flex.html.ButtonBar');

goog.require('org.apache.flex.html.List');



/**
 * @constructor
 * @extends {org.apache.flex.html.List}
 */
org.apache.flex.html.ButtonBar = function() {

  //  this.model = new
  //        org.apache.flex.html.beads.models.ArraySelectionModel();
  //  this.addBead(this.model);

  org.apache.flex.html.ButtonBar.base(this, 'constructor');

  //  this.addBead(new
  //        org.apache.flex.html.beads.ListView());

  //  this.addBead(new
  //org.apache.flex.html.beads.layouts.HorizontalLayout());

  //  this.itemRendererFactory = new
  //        org.apache.flex.html.beads.
  //        DataItemRendererFactoryForArrayData();
  //  this.itemRendererFactory.itemRendererClass = 'org.apache.flex.html.' +
  //        'supportClasses_ButtonBarButtonItemRenderer';
  //  this.addBead(this.itemRendererFactory);

  //  this.addBead(new
  //        org.apache.flex.html.beads.controllers.
  //        ListSingleSelectionMouseController());
};
goog.inherits(org.apache.flex.html.ButtonBar,
    org.apache.flex.html.List);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.ButtonBar.prototype.FLEXJS_CLASS_INFO =
    { names: [{ name: 'ButtonBar',
                qName: 'org.apache.flex.html.ButtonBar'}] };


/**
 * @override
 */
org.apache.flex.html.ButtonBar.prototype.createElement =
    function() {
  //org.apache.flex.html.ButtonBar.base(this, 'createElement');

  this.element = document.createElement('div');
  this.element.style.overflow = 'auto';
  this.positioner = this.element;
  this.positioner.style.position = 'relative';

  this.className = 'ButtonBar';

  this.element.flexjs_wrapper = this;

  return this.element;
};
