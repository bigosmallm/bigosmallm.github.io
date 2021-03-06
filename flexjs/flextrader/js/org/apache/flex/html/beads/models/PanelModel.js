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
goog.provide('org.apache.flex.html.beads.models.PanelModel');

goog.require('org.apache.flex.events.EventDispatcher');



/**
 * @constructor
 * @extends {org.apache.flex.events.EventDispatcher}
 */
org.apache.flex.html.beads.models.PanelModel = function() {
  org.apache.flex.html.beads.models.PanelModel.base(this, 'constructor');

  /**
   * @private
   * @type {string}
   */
  this.title_ = '';
  /**
   * @private
   * @type {string}
   */
  this.htmlTitle_ = '';
  /**
   * @private
   * @type {boolean}
   */
  this.showCloseButton_ = false;
};
goog.inherits(org.apache.flex.html.beads.models.PanelModel,
    org.apache.flex.events.EventDispatcher);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.beads.models.PanelModel.prototype.FLEXJS_CLASS_INFO =
    { names: [{ name: 'PanelModel',
                qName: 'org.apache.flex.html.beads.models.PanelModel'}],
      interfaces: [org.apache.flex.core.IBeadModel] };


Object.defineProperties(org.apache.flex.html.beads.models.PanelModel.prototype, {
    /** @export */
    strand: {
        /** @this {org.apache.flex.html.beads.models.PanelModel} */
        set: function(value) {
            this.strand_ = value;
        }
    },
    /** @export */
    title: {
        /** @this {org.apache.flex.html.beads.models.PanelModel} */
        get: function() {
            return this.title_;
        },
        /** @this {org.apache.flex.html.beads.models.PanelModel} */
        set: function(value) {
            if (this.title_ != value) {
              this.title_ = value;
              this.dispatchEvent('titleChange');
            }
        }
    },
    /** @export */
    htmlTitle: {
        /** @this {org.apache.flex.html.beads.models.PanelModel} */
        get: function() {
            return this.htmlTitle_;
        },
        /** @this {org.apache.flex.html.beads.models.PanelModel} */
        set: function(value) {
            if (this.htmlTitle_ != value) {
              this.htmlTitle_ = value;
              this.dispatchEvent('htmlTitleChange');
            }
        }
    },
    /** @export */
    showCloseButton: {
        /** @this {org.apache.flex.html.beads.models.PanelModel} */
        get: function() {
            return this.showCloseButton_;
        },
        /** @this {org.apache.flex.html.beads.models.PanelModel} */
        set: function(value) {
            if (this.showCloseButton_ != value) {
              this.showCloseButton_ = value;
              this.dispatchEvent('showCloseButtonChange');
            }
        }
    }
});
