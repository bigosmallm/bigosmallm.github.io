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
goog.provide('org.apache.flex.html.beads.TextItemRendererFactoryForArrayData');

goog.require('org.apache.flex.core.IItemRenderer');
goog.require('org.apache.flex.events.EventDispatcher');
goog.require('org.apache.flex.html.beads.models.ArraySelectionModel');
goog.require('org.apache.flex.html.supportClasses.StringItemRenderer');



/**
 * @constructor
 * @extends {org.apache.flex.events.EventDispatcher}
 * @implements {org.apache.flex.core.IItemRenderer}
 */
org.apache.flex.html.beads.TextItemRendererFactoryForArrayData =
    function() {
  org.apache.flex.html.beads.TextItemRendererFactoryForArrayData.base(this, 'constructor');
};
goog.inherits(
    org.apache.flex.html.beads.TextItemRendererFactoryForArrayData,
    org.apache.flex.events.EventDispatcher);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.beads.TextItemRendererFactoryForArrayData.
    prototype.FLEXJS_CLASS_INFO =
    { names: [{ name: 'TextItemRendererFactoryForArrayData',
                qName: 'org.apache.flex.html.beads.TextItemRendererFactoryForArrayData' }],
      interfaces: [org.apache.flex.core.IItemRenderer] };


Object.defineProperties(org.apache.flex.html.beads.TextItemRendererFactoryForArrayData.prototype, {
    /** @export */
    strand: {
        /** @this {org.apache.flex.html.beads.TextItemRendererFactoryForArrayData} */
        set: function(value) {
            this.strand_ = value;

            this.model = value.getBeadByType(
                org.apache.flex.html.beads.models.ArraySelectionModel);

            this.listView = value.getBeadByType(
                org.apache.flex.html.beads.ListView);
            this.dataGroup = this.listView.dataGroup;

            this.model.addEventListener('dataProviderChanged',
                goog.bind(this.dataProviderChangedHandler, this));

            if (!this.itemRendererFactory)
            {
                var m2 = org.apache.flex.core.ValuesManager.valuesImpl.
                    getValue(this.strand_, 'iItemRendererClassFactory');
                this.itemRendererFactory = new m2();
                this.strand_.addBead(this.itemRendererFactory);
            }

            this.dataProviderChangedHandler(null);
        },
        /** @this {org.apache.flex.html.beads.TextItemRendererFactoryForArrayData} */
        get: function() {
            return this.strand_;
        }
    },
    itemRendererFactory: {
        /** @this {org.apache.flex.html.beads.TextItemRendererFactoryForArrayData} */
        set: function(value) {
           this.itemRendererFactory_ = value;
        },
        /** @this {org.apache.flex.html.beads.TextItemRendererFactoryForArrayData} */
        get: function() {
           return this.itemRendererFactory_;
        }
     }
});


/**
 * @export
 * @param {Object} event The event that triggered the dataProvider change.
 */
org.apache.flex.html.beads.TextItemRendererFactoryForArrayData.
    prototype.dataProviderChangedHandler = function(event) {
  var dp, i, n, opt;

  dp = this.model.dataProvider;
  n = dp.length;
  for (i = 0; i < n; i++) {
    var tf = this.itemRendererFactory.createItemRenderer(this.dataGroup);
    this.dataGroup.addElement(tf);
    tf.data = dp[i];
    tf.index = i;
  }

  var newEvent = new org.apache.flex.events.Event('itemsCreated');
  this.strand_.dispatchEvent(newEvent);
};
