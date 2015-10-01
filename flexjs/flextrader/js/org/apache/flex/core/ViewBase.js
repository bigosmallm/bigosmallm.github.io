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
goog.provide('org.apache.flex.core.ViewBase');

goog.require('org.apache.flex.core.ContainerBase');
goog.require('org.apache.flex.core.IPopUpHost');



/**
 * @constructor
 * @implements {org.apache.flex.core.IPopUpHost}
 * @extends {org.apache.flex.core.ContainerBase}
 */
org.apache.flex.core.ViewBase = function() {
  org.apache.flex.core.ViewBase.base(this, 'constructor');

  this.document = this;
};
goog.inherits(org.apache.flex.core.ViewBase, org.apache.flex.core.ContainerBase);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.core.ViewBase.prototype.FLEXJS_CLASS_INFO =
    { names: [{ name: 'ViewBase',
                qName: 'org.apache.flex.core.ViewBase' }],
      interfaces: [org.apache.flex.core.IPopUpHost] };


/**
 * @private
 * @type {Object}
 */
org.apache.flex.core.ViewBase.prototype.applicationModel_ = null;


/**
 * @export
 * @param {Array} data The data for the attributes.
 */
org.apache.flex.core.ViewBase.prototype.generateMXMLAttributes = function(data) {
  org.apache.flex.utils.MXMLDataInterpreter.generateMXMLProperties(this, data);
};


/**
 * @export
 * @type {Object} The document.
 */
org.apache.flex.core.ViewBase.prototype.document = null;


/**
 * @export
 * @param {Object} doc The document.
 * @param {Array} desc The descriptor data;
 */
org.apache.flex.core.ViewBase.prototype.setMXMLDescriptor =
    function(doc, desc) {
  this.MXMLDescriptor = desc;
  this.document = doc;
};


/**
 * @export
 */
org.apache.flex.core.ViewBase.prototype.addedToParent = function() {

  //org.apache.flex.core.ViewBase.base(this,'addedToParent');
  this.element.flexjs_wrapper = this;
  if (org.apache.flex.core.ValuesManager.valuesImpl.init) {
    org.apache.flex.core.ValuesManager.valuesImpl.init(this);
  }

  org.apache.flex.core.ViewBase.base(this, 'addedToParent');

  this.dispatchEvent(new org.apache.flex.events.Event('childrenAdded'));
};


/**
 * @export
 * @param {string} state The name of the state.
 * @return {boolean} True if state in states array.
 */
org.apache.flex.core.ViewBase.prototype.hasState = function(state) {
  var states = this.states;
  for (var p in states)
  {
    var s = states[p];
    if (s.name == state)
      return true;
  }
  return false;
};


Object.defineProperties(org.apache.flex.core.ViewBase.prototype, {
    /** @export */
    MXMLDescriptor: {
        /** @this {org.apache.flex.core.ViewBase} */
        get: function() {
            return this.mxmldd;
        },
        /** @this {org.apache.flex.core.ViewBase} */
        set: function(value) {
            this.mxmldd = value;
        }
    },
    /** @export */
    applicationModel: {
        /** @this {org.apache.flex.core.ViewBase} */
        get: function() {
            return this.applicationModel_;
        },
        /** @this {org.apache.flex.core.ViewBase} */
        set: function(value) {
            this.applicationModel_ = value;
        }
    }
});
