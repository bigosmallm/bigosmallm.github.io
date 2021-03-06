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

goog.provide('org.apache.flex.html.VRule');

goog.require('org.apache.flex.core.UIBase');



/**
 * @constructor
 * @extends {org.apache.flex.core.UIBase}
 */
org.apache.flex.html.VRule = function() {
  org.apache.flex.html.VRule.base(this, 'constructor');

  this.element = document.createElement('div');
  this.element.style.borderLeftStyle = 'solid';
  this.element.style.borderLeftWidth = '1px';
  this.element.style.borderTop = 'none';
  this.element.style.borderBottom = 'none';
  this.element.style.borderRight = 'none';
  this.positioner = this.element;
  this.positioner.style.position = 'relative';
  this.element.flexjs_wrapper = this;
};
goog.inherits(org.apache.flex.html.VRule,
    org.apache.flex.core.UIBase);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.VRule.prototype.FLEXJS_CLASS_INFO =
    { names: [{ name: 'VRule',
                qName: 'org.apache.flex.html.VRule' }] };

