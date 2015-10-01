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
goog.provide('org.apache.flex.html.Spinner');

goog.require('org.apache.flex.core.UIBase');
goog.require('org.apache.flex.html.beads.controllers.SpinnerMouseController');



/**
 * @constructor
 * @extends {org.apache.flex.core.UIBase}
 */
org.apache.flex.html.Spinner = function() {
  org.apache.flex.html.Spinner.base(this, 'constructor');

  this.minimum_ = 0;
  this.maximum_ = 100;
  this.value_ = 1;
  this.stepSize_ = 1;
  this.snapInterval_ = 1;
};
goog.inherits(org.apache.flex.html.Spinner,
    org.apache.flex.core.UIBase);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.Spinner.prototype.FLEXJS_CLASS_INFO =
    { names: [{ name: 'Spinner',
                qName: 'org.apache.flex.html.Spinner'}] };


/**
 * @override
 */
org.apache.flex.html.Spinner.prototype.createElement =
    function() {
  this.element = document.createElement('div');
  this.positioner = this.element;
  this.positioner.style.position = 'relative';

  this.element.style.verticalAlign = 'middle';

  this.incrementButton = new org.apache.flex.html.TextButton();
  this.incrementButton.text = '\u25B2';
  this.addElement(this.incrementButton);

  this.decrementButton = new org.apache.flex.html.TextButton();
  this.decrementButton.text = '\u25BC';
  this.addElement(this.decrementButton);

  this.controller = new org.apache.flex.html.beads.controllers.SpinnerMouseController();
  this.addBead(this.controller);

  this.element.flexjs_wrapper = this;

  return this.element;
};


Object.defineProperties(org.apache.flex.html.Spinner.prototype, {
    /** @export */
    minimum: {
        /** @this {org.apache.flex.html.Spinner} */
        get: function() {
            return this.minimum_;
        },
        /** @this {org.apache.flex.html.Spinner} */
        set: function(value) {
            if (value != this.minimum_) {
              this.minimum_ = value;
              this.dispatchEvent('minimumChanged');
            }
        }
    },
    /** @export */
    maximum: {
        /** @this {org.apache.flex.html.Spinner} */
        get: function() {
            return this.maximum_;
        },
        /** @this {org.apache.flex.html.Spinner} */
        set: function(value) {
            if (value != this.maximum_) {
              this.maximum_ = value;
              this.dispatchEvent('maximumChanged');
            }
        }
    },
    /** @export */
    snapInterval: {
        /** @this {org.apache.flex.html.Spinner} */
        get: function() {
            return this.snapInterval_;
        },
        /** @this {org.apache.flex.html.Spinner} */
        set: function(value) {
            if (value != this.snapInterval_) {
              this.snapInterval_ = value;
              this.dispatchEvent('snapIntervalChanged');
            }
        }
    },
    /** @export */
    stepSize: {
        /** @this {org.apache.flex.html.Spinner} */
        get: function() {
            return this.stepSize_;
        },
        /** @this {org.apache.flex.html.Spinner} */
        set: function(value) {
            if (value != this.stepSize_) {
              this.stepSize_ = value;
              this.dispatchEvent('stepSizeChanged');
            }
        }
    },
    /** @export */
    value: {
        /** @this {org.apache.flex.html.Spinner} */
        get: function() {
            return this.value_;
        },
        /** @this {org.apache.flex.html.Spinner} */
        set: function(value) {
            if (value != this.value_) {
              this.value_ = value;
              this.dispatchEvent('valueChange');
            }
        }
    }
});


/**
 * @param {number} value The proposed value.
 * @return {number} The new value based on snapInterval
 * and stepSize.
 */
org.apache.flex.html.Spinner.prototype.snap = function(value)
    {
  var si = this.snapInterval_;
  var n = Math.round((value - this.minimum_) / si) * si + this.minimum_;
  if (value > 0)
  {
    if (value - n < n + si - value)
      return n;
    return n + si;
  }
  if (value - n > n + si - value)
    return n + si;
  return n;
};

