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
goog.provide('org.apache.flex.html.beads.controllers.SpinnerMouseController');




/**
 * @constructor
 */
org.apache.flex.html.beads.controllers.SpinnerMouseController =
    function() {
};


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.beads.controllers.SpinnerMouseController.prototype.FLEXJS_CLASS_INFO =
    { names: [{ name: 'SpinnerMouseController',
                qName: 'org.apache.flex.html.beads.controllers.SpinnerMouseController' }] };


Object.defineProperties(org.apache.flex.html.beads.controllers.SpinnerMouseController.prototype, {
    /** @export */
    strand: {
        /** @this {org.apache.flex.html.beads.controllers.SpinnerMouseController} */
        set: function(value) {
            this.strand_ = value;

            this.incrementButton = this.strand_.incrementButton;
            this.decrementButton = this.strand_.decrementButton;

            goog.events.listen(this.incrementButton.element, goog.events.EventType.CLICK,
                goog.bind(this.handleIncrementClick, this));

            goog.events.listen(this.decrementButton.element, goog.events.EventType.CLICK,
                goog.bind(this.handleDecrementClick, this));
        }
    }
});


/**
 *        SpinnerMouseController}
 * @param {Object} event The event object.
 */
org.apache.flex.html.beads.controllers.SpinnerMouseController.
    prototype.handleIncrementClick = function(event)
    {
  var newValue = this.strand_.snap(Math.min(this.strand_.maximum,
      this.strand_.value +
      this.strand_.stepSize));
  this.strand_.value = newValue;
};


/**
 *        SpinnerMouseController}
 * @param {Event} event The event object.
 */
org.apache.flex.html.beads.controllers.SpinnerMouseController.
    prototype.handleDecrementClick =
    function(event)
    {
  var newValue = this.strand_.snap(Math.max(this.strand_.minimum,
      this.strand_.value -
      this.strand_.stepSize));
  this.strand_.value = newValue;
};
