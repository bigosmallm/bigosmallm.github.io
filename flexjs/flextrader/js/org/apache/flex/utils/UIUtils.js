/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *  @fileoverview
 *  @suppress {missingRequire}
 */
goog.provide('org.apache.flex.utils.UIUtils');




/**
 * @constructor
 */
org.apache.flex.utils.UIUtils = function() {
};


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.utils.UIUtils.prototype.FLEXJS_CLASS_INFO =
    { names: [{ name: 'UIUtils',
                qName: 'org.apache.flex.utils.UIUtils' }] };


/**
 * @export
 * @param {Object} item The item to be centered.
 * @param {Object} relativeTo The object used as reference.
 */
org.apache.flex.utils.UIUtils.center =
    function(item, relativeTo) {

  var rw = relativeTo.width;
  if (isNaN(rw)) rw = window.innerWidth;
  var rh = relativeTo.height;
  if (isNaN(rh)) rh = window.innerHeight;

  var xpos = (rw - item.width) / 2;
  var ypos = (rh - item.height) / 2;
  item.x = xpos;
  item.y = ypos;
};


/**
 * @export
 * @param {Object} start A component to start the search.
 * @return {Object} A component that implements IPopUpHost.
 */
org.apache.flex.utils.UIUtils.findPopUpHost =
    function(start) {

  while (start != null && !org.apache.flex.utils.Language.is(start, org.apache.flex.core.IPopUpHost)) {
    start = start.parent;
  }

  return start;
};


/**
 * @export
 * @param {Object} popUp An IPopUpHost component looking to be removed.
 */
org.apache.flex.utils.UIUtils.removePopUp =
    function(popUp) {

  var p = popUp.parent;
  p.removeElement(popUp);
};
