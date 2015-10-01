/**
 * Generated by Apache Flex Cross-Compiler from org/apache/flex/html/beads/TitleBarView.mxml
 * org.apache.flex.html.beads.TitleBarView
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('org.apache.flex.html.beads.TitleBarView');

goog.require('org.apache.flex.html.MXMLBeadViewBase');
goog.require('org.apache.flex.binding.MXMLBeadViewBaseDataBinding');
goog.require('org.apache.flex.html.beads.layouts.LayoutChangeNotifier');
goog.require('org.apache.flex.core.SimpleCSSStyles');
goog.require('org.apache.flex.html.CloseButton');




/**
 * @constructor
 * @extends {org.apache.flex.html.MXMLBeadViewBase}
 */
org.apache.flex.html.beads.TitleBarView = function() {
  org.apache.flex.html.beads.TitleBarView.base(this, 'constructor');
  
  /**
   * @private
   * @type {org.apache.flex.binding.MXMLBeadViewBaseDataBinding}
   */
  this.$ID0_;
  
  /**
   * @private
   * @type {org.apache.flex.html.beads.layouts.LayoutChangeNotifier}
   */
  this.$ID1_;
  
  /**
   * @private
   * @type {org.apache.flex.html.Label}
   */
  this.titleLabel_;
  
  /**
   * @private
   * @type {org.apache.flex.core.SimpleCSSStyles}
   */
  this.$ID2_;
  
  /**
   * @private
   * @type {org.apache.flex.html.CloseButton}
   */
  this.closeButton_;
  
  /**
   * @private
   * @type {Array}
   */
  this.mxmldd;
  
  /**
   * @private
   * @type {Array}
   */
  this.mxmldp;

  this.generateMXMLAttributes
  ([1,
'beads',
null, [org.apache.flex.binding.MXMLBeadViewBaseDataBinding, 1, '_id', true, '$ID0', 0, 0, null, org.apache.flex.html.beads.layouts.LayoutChangeNotifier, 1, '_id', true, '$ID1', 0, 0, null],
0,
0
  ]);
  
};
goog.inherits(org.apache.flex.html.beads.TitleBarView, org.apache.flex.html.MXMLBeadViewBase);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
org.apache.flex.html.beads.TitleBarView.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'TitleBarView', qName: 'org.apache.flex.html.beads.TitleBarView' }] };


/**
 * @private
 */
org.apache.flex.html.beads.TitleBarView.prototype.clickHandler = function() {
  var /** @type {org.apache.flex.events.Event} */ newEvent = new org.apache.flex.events.Event('close', true);
  org.apache.flex.utils.Language.as(this._strand, org.apache.flex.core.UIBase, true).dispatchEvent(newEvent);
};


/**
 * @export
 * @param {org.apache.flex.events.Event} event
 */
org.apache.flex.html.beads.TitleBarView.prototype.$EH0 = function(event)
{
  this.clickHandler();
};


Object.defineProperties(org.apache.flex.html.beads.TitleBarView.prototype, /** @lends {org.apache.flex.html.beads.TitleBarView.prototype} */ {
/** @export */
    titleLabel: {
    /** @this {org.apache.flex.html.beads.TitleBarView} */
    get: function() {
      return this.titleLabel_;
    },
    /** @this {org.apache.flex.html.beads.TitleBarView} */
    set: function(value) {
      if (value != this.titleLabel_) {
        this.titleLabel_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'titleLabel', null, value));
      }
    }
  },
  /** @export */
    closeButton: {
    /** @this {org.apache.flex.html.beads.TitleBarView} */
    get: function() {
      return this.closeButton_;
    },
    /** @this {org.apache.flex.html.beads.TitleBarView} */
    set: function(value) {
      if (value != this.closeButton_) {
        this.closeButton_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'closeButton', null, value));
      }
    }
  },
  'MXMLDescriptor': {
    /** @this {org.apache.flex.html.beads.TitleBarView} */
    get: function() {
      {
        if (this.mxmldd == undefined)
        {
          /** @type {Array} */
          var arr = org.apache.flex.utils.Language.superGetter(org.apache.flex.html.beads.TitleBarView,this, 'MXMLDescriptor');
          /** @type {Array} */
          var data = [
      org.apache.flex.html.Label,
2,
'id',
true,
'titleLabel',
'style',
false,
[org.apache.flex.core.SimpleCSSStyles, 3, '_id', true, '$ID2', 'fontWeight', true, 'inherit', 'margin', true, 5, 0, 0, null],
0,
0,
null,
org.apache.flex.html.CloseButton,
1,
'id',
true,
'closeButton',
0,
1,
'click',
this.$EH0,
null
      ];
        
          if (arr)
            this.mxmldd = arr.concat(data);
          else
            this.mxmldd = data;
        }
        return this.mxmldd;
      }
      }
    }
  });
  /**
   * @export
   */
  org.apache.flex.html.beads.TitleBarView.prototype._bindings = [
  3,
  ["titleLabel", "text"],
  null,
  ["$ID1", "watchedProperty"],
  ["model", "title"],
  null,
  ["titleLabel", "text"],
  ["model", "showCloseButton"],
  null,
  ["closeButton", "visible"],
  0,
  2,
  "titleLabel",
  "valueChange",
  0,
  null,
  [
  1,
  2,
  "text",
  "textChange",
  0,
  null,
  null,
  null],
  2,
  2,
  "model",
  "__NoChangeEvent__",
  [1,2],
  null,
  [
  3,
  2,
  "title",
  "titleChange",
  1,
  null,
  null,
  4,
  2,
  "showCloseButton",
  "showCloseButtonChange",
  2,
  null,
  null,
  null],
  null];
  
