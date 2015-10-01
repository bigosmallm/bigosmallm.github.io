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
goog.provide('org.apache.flex.html.beads.controllers.ListSingleSelectionMouseController');

goog.require('org.apache.flex.core.IBeadController');



/**
 * @constructor
 * @implements {org.apache.flex.core.IBeadController}
 */
org.apache.flex.html.beads.controllers.ListSingleSelectionMouseController = function() {
};


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.beads.controllers.ListSingleSelectionMouseController.prototype.FLEXJS_CLASS_INFO =
    { names: [{ name: 'ListSingleSelectionMouseController',
                qName: 'org.apache.flex.html.beads.controllers.ListSingleSelectionMouseController' }],
      interfaces: [org.apache.flex.core.IBeadController] };


Object.defineProperties(org.apache.flex.html.beads.controllers.ListSingleSelectionMouseController.prototype, {
    /** @export */
    strand: {
        /** @this {org.apache.flex.html.beads.controllers.ListSingleSelectionMouseController} */
        set: function(value) {
            this.strand_ = value;

            this.model = value.getBeadByType(
                org.apache.flex.html.beads.models.ArraySelectionModel);
            this.listView = value.getBeadByType(
                org.apache.flex.html.beads.ListView);

            this.dataGroup = this.listView.dataGroup;
            this.dataGroup.addEventListener('selected',
                goog.bind(this.selectedHandler, this));
        }
    }
});


/**
 * @export
 *        ListSingleSelectionMouseController}
 * @param {Object} event The event that triggered the selection.
 */
org.apache.flex.html.beads.controllers.ListSingleSelectionMouseController.prototype.selectedHandler =
        function(event) {

  var renderer = org.apache.flex.utils.Language.as(event.target, org.apache.flex.core.ISelectableItemRenderer);
  var index = renderer.index;
  this.model.selectedIndex = index;

  this.strand_.dispatchEvent('change');
};
