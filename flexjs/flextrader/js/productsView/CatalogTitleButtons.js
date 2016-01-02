/**
 * Generated by Apache Flex Cross-Compiler from productsView\CatalogTitleButtons.mxml
 * productsView.CatalogTitleButtons
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('productsView.CatalogTitleButtons');

goog.require('org.apache.flex.html.HContainer');
goog.require('org.apache.flex.html.VRule');




/**
 * @constructor
 * @extends {org.apache.flex.html.HContainer}
 */
productsView.CatalogTitleButtons = function() {
  productsView.CatalogTitleButtons.base(this, 'constructor');
  
  /**
   * @private
   * @type {org.apache.flex.core.SimpleCSSStyles}
   */
  this.$ID0_;
  
  /**
   * @private
   * @type {org.apache.flex.core.ParentDocumentBead}
   */
  this.pdb_;
  
  /**
   * @private
   * @type {org.apache.flex.binding.ContainerDataBinding}
   */
  this.$ID1_;
  
  /**
   * @private
   * @type {org.apache.flex.html.beads.layouts.LayoutChangeNotifier}
   */
  this.$ID2_;
  
  /**
   * @private
   * @type {org.apache.flex.html.Label}
   */
  this.findPhones_;
  
  /**
   * @private
   * @type {org.apache.flex.html.VRule}
   */
  this.$ID3_;
  
  /**
   * @private
   * @type {org.apache.flex.html.Label}
   */
  this.viewCart_;
  
  /**
   * @private
   * @type {org.apache.flex.states.State}
   */
  this.$ID4_;
  
  /**
   * @private
   * @type {org.apache.flex.states.State}
   */
  this.$ID5_;
  
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
  ([4,
'currentState',
true,
'showFilter',
'style',
false,
[org.apache.flex.core.SimpleCSSStyles, 4, '_id', true, '$ID0', 'verticalAlign', true, 'middle', 'paddingTop', true, 0, 'paddingBottom', true, 0, 0, 0, null],
'states',
null, [org.apache.flex.states.State, 3, '_id', true, '$ID4', 'name', true, 'showFilter', 'overrides', null, [org.apache.flex.states.SetProperty, 3, 'target', true, 'findPhones', 'name', true, 'className', 'value', true, 'catalogTitleButtonSelected', 0, 0, null, org.apache.flex.states.SetProperty, 3, 'target', true, 'viewCart', 'name', true, 'className', 'value', true, 'catalogTitleButtonDeselected', 0, 0, null, org.apache.flex.states.SetEventHandler, 3, 'target', true, 'viewCart', 'name', true, 'rollover', 'handlerFunction', true, org.apache.flex.utils.Language.closure(this.$EH2, this, '$EH2'), 0, 0, null, org.apache.flex.states.SetEventHandler, 3, 'target', true, 'viewCart', 'name', true, 'rollout', 'handlerFunction', true, org.apache.flex.utils.Language.closure(this.$EH3, this, '$EH3'), 0, 0, null], 0, 0, null, org.apache.flex.states.State, 3, '_id', true, '$ID5', 'name', true, 'showCart', 'overrides', null, [org.apache.flex.states.SetProperty, 3, 'target', true, 'findPhones', 'name', true, 'className', 'value', true, 'catalogTitleButtonDeselected', 0, 0, null, org.apache.flex.states.SetEventHandler, 3, 'target', true, 'findPhones', 'name', true, 'rollover', 'handlerFunction', true, org.apache.flex.utils.Language.closure(this.$EH4, this, '$EH4'), 0, 0, null, org.apache.flex.states.SetEventHandler, 3, 'target', true, 'findPhones', 'name', true, 'rollout', 'handlerFunction', true, org.apache.flex.utils.Language.closure(this.$EH5, this, '$EH5'), 0, 0, null, org.apache.flex.states.SetProperty, 3, 'target', true, 'viewCart', 'name', true, 'className', 'value', true, 'catalogTitleButtonSelected', 0, 0, null], 0, 0, null],
'beads',
null, [org.apache.flex.core.ParentDocumentBead, 1, 'id', true, 'pdb', 0, 0, null, org.apache.flex.binding.ContainerDataBinding, 1, '_id', true, '$ID1', 0, 0, null, org.apache.flex.html.beads.layouts.LayoutChangeNotifier, 2, '_id', true, '$ID2', 'initialValue', true, 16777215, 0, 0, null],
0,
0
  ]);
  
};
goog.inherits(productsView.CatalogTitleButtons, org.apache.flex.html.HContainer);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
productsView.CatalogTitleButtons.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'CatalogTitleButtons', qName: 'productsView.CatalogTitleButtons' }] };


/**
 * @export
 * @type {number}
 */
productsView.CatalogTitleButtons.prototype.cartCount_;


/**
 * @private
 * @param {org.apache.flex.events.Event} event
 */
productsView.CatalogTitleButtons.prototype.rollOverLabel = function(event) {
  org.apache.flex.utils.Language.as(event.target, org.apache.flex.html.Label, true).className = "catalogTitleButtonHighlighted";
};


/**
 * @private
 * @param {org.apache.flex.events.Event} event
 */
productsView.CatalogTitleButtons.prototype.rollOutLabel = function(event) {
  org.apache.flex.utils.Language.as(event.target, org.apache.flex.html.Label, true).className = "catalogTitleButtonDeselected";
};


Object.defineProperties(productsView.CatalogTitleButtons.prototype, /** @lends {productsView.CatalogTitleButtons.prototype} */ {
/** @export */
cartCount: {
/** @this {productsView.CatalogTitleButtons} */
  get: function() {
  return this.cartCount_;
  },

/** @this {productsView.CatalogTitleButtons} */
set: function(value) {
if (value != this.cartCount_) {
    var oldValue = this.cartCount_;
    this.cartCount_ = value;
    this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(
         this, "cartCount", oldValue, value));
}
}}}
);/**
 * @export
 * @param {org.apache.flex.events.MouseEvent} event
 */
productsView.CatalogTitleButtons.prototype.$EH0 = function(event)
{
  this.currentState = 'showFilter';
};


/**
 * @export
 * @param {org.apache.flex.events.MouseEvent} event
 */
productsView.CatalogTitleButtons.prototype.$EH1 = function(event)
{
  this.currentState = 'showCart';
};


/**
 * @export
 * @param {org.apache.flex.events.MouseEvent} event
 */
productsView.CatalogTitleButtons.prototype.$EH2 = function(event)
{
  this.rollOverLabel(event);
};


/**
 * @export
 * @param {org.apache.flex.events.MouseEvent} event
 */
productsView.CatalogTitleButtons.prototype.$EH3 = function(event)
{
  this.rollOutLabel(event);
};


/**
 * @export
 * @param {org.apache.flex.events.MouseEvent} event
 */
productsView.CatalogTitleButtons.prototype.$EH4 = function(event)
{
  this.rollOverLabel(event);
};


/**
 * @export
 * @param {org.apache.flex.events.MouseEvent} event
 */
productsView.CatalogTitleButtons.prototype.$EH5 = function(event)
{
  this.rollOutLabel(event);
};


Object.defineProperties(productsView.CatalogTitleButtons.prototype, /** @lends {productsView.CatalogTitleButtons.prototype} */ {
/** @export */
    pdb: {
    /** @this {productsView.CatalogTitleButtons} */
    get: function() {
      return this.pdb_;
    },
    /** @this {productsView.CatalogTitleButtons} */
    set: function(value) {
      if (value != this.pdb_) {
        this.pdb_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'pdb', null, value));
      }
    }
  },
  /** @export */
    findPhones: {
    /** @this {productsView.CatalogTitleButtons} */
    get: function() {
      return this.findPhones_;
    },
    /** @this {productsView.CatalogTitleButtons} */
    set: function(value) {
      if (value != this.findPhones_) {
        this.findPhones_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'findPhones', null, value));
      }
    }
  },
  /** @export */
    viewCart: {
    /** @this {productsView.CatalogTitleButtons} */
    get: function() {
      return this.viewCart_;
    },
    /** @this {productsView.CatalogTitleButtons} */
    set: function(value) {
      if (value != this.viewCart_) {
        this.viewCart_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'viewCart', null, value));
      }
    }
  },
  'MXMLDescriptor': {
    /** @this {productsView.CatalogTitleButtons} */
    get: function() {
      {
        if (this.mxmldd == undefined)
        {
          /** @type {Array} */
          var arr = org.apache.flex.utils.Language.superGetter(productsView.CatalogTitleButtons,this, 'MXMLDescriptor');
          /** @type {Array} */
          var data = [
      org.apache.flex.html.Label,
2,
'id',
true,
'findPhones',
'text',
true,
'Find Developers',
0,
1,
'click',
this.$EH0,
null,
org.apache.flex.html.VRule,
3,
'_id',
true,
'$ID3',
'alpha',
true,
0.75,
'style',
true,
'color:#333333',
0,
0,
null,
org.apache.flex.html.Label,
1,
'id',
true,
'viewCart',
0,
1,
'click',
this.$EH1,
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
  productsView.CatalogTitleButtons.prototype._bindings = [
  6,
  ["viewCart", "text"],
  null,
  ["$ID2", "watchedProperty"],
  ["pdb", "parentDocument", "cartCount"],
  function (value) { this.cartCount = value;;},
  "cartCount",
  ["pdb", "parentDocument", "pdb", "parentDocument", "currentState"],
  function (value) { this.currentState = value;;},
  "currentState",
  "currentState",
  function (value) { org.apache.flex.utils.Language.as(org.apache.flex.utils.Language.as(this.pdb.parentDocument, productsView.ProductCatalogPanel, true).pdb.parentDocument, ProductsView, true).currentState = value;;},
  null,
  function() { return this.findPhones.height * .75; },
  null,
  ["$ID3", "height"],
  function() { return "View Cart (" + this.cartCount + " items)"; },
  null,
  ["viewCart", "text"],
  0,
  2,
  "viewCart",
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
  "pdb",
  "valueChange",
  [1,2],
  null,
  [
  3,
  2,
  "parentDocument",
  "parentDocumentChange",
  [1,2],
  null,
  [
  4,
  2,
  "cartCount",
  "valueChange",
  1,
  null,
  null,
  5,
  2,
  "pdb",
  "valueChange",
  2,
  null,
  [
  6,
  2,
  "parentDocument",
  "parentDocumentChange",
  2,
  null,
  [
  7,
  2,
  "currentState",
  "currentStateChange",
  2,
  null,
  null,
  null],
  null],
  null],
  null],
  8,
  2,
  "currentState",
  "currentStateChange",
  3,
  null,
  null,
  9,
  2,
  "findPhones",
  "valueChange",
  4,
  null,
  [
  10,
  2,
  "height",
  "heightChanged",
  4,
  null,
  null,
  null],
  11,
  2,
  "cartCount",
  "valueChange",
  5,
  null,
  null,
  null];
  