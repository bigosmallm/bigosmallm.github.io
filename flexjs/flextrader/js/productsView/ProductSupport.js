/**
 * Generated by Apache Flex Cross-Compiler from productsView\ProductSupport.mxml
 * productsView.ProductSupport
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('productsView.ProductSupport');

goog.require('org.apache.flex.html.HContainer');
goog.require('org.apache.flex.effects.Parallel');
goog.require('org.apache.flex.effects.Resize');




/**
 * @constructor
 * @extends {org.apache.flex.html.HContainer}
 */
productsView.ProductSupport = function() {
  productsView.ProductSupport.base(this, 'constructor');
  
  /**
   * @private
   * @type {org.apache.flex.core.SimpleCSSStyles}
   */
  this.$ID0_;
  
  /**
   * @private
   * @type {org.apache.flex.binding.ContainerDataBinding}
   */
  this.$ID1_;
  
  /**
   * @private
   * @type {org.apache.flex.effects.Parallel}
   */
  this.hideList_;
  
  /**
   * @private
   * @type {org.apache.flex.effects.Resize}
   */
  this.$ID2_;
  
  /**
   * @private
   * @type {org.apache.flex.effects.Parallel}
   */
  this.showList_;
  
  /**
   * @private
   * @type {org.apache.flex.effects.Resize}
   */
  this.$ID3_;
  
  /**
   * @private
   * @type {org.apache.flex.html.List}
   */
  this.list_;
  
  /**
   * @private
   * @type {org.apache.flex.html.Container}
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
  ([2,
'style',
false,
[org.apache.flex.core.SimpleCSSStyles, 4, '_id', true, '$ID0', 'paddingLeft', true, 4, 'paddingRight', true, 8, 'paddingBottom', true, 4, 0, 0, null],
'beads',
null, [org.apache.flex.binding.ContainerDataBinding, 1, '_id', true, '$ID1', 0, 0, null],
0,
0
  ]);
  
};
goog.inherits(productsView.ProductSupport, org.apache.flex.html.HContainer);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
productsView.ProductSupport.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'ProductSupport', qName: 'productsView.ProductSupport' }] };


/**
 * @private
 */
productsView.ProductSupport.prototype.toggle = function() {
};


Object.defineProperties(productsView.ProductSupport.prototype, /** @lends {productsView.ProductSupport.prototype} */ {
/** @export */
    hideList: {
    /** @this {productsView.ProductSupport} */
    get: function() {
      return this.hideList_;
    },
    /** @this {productsView.ProductSupport} */
    set: function(value) {
      if (value != this.hideList_) {
        this.hideList_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'hideList', null, value));
      }
    }
  },
  /** @export */
    showList: {
    /** @this {productsView.ProductSupport} */
    get: function() {
      return this.showList_;
    },
    /** @this {productsView.ProductSupport} */
    set: function(value) {
      if (value != this.showList_) {
        this.showList_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'showList', null, value));
      }
    }
  },
  /** @export */
    list: {
    /** @this {productsView.ProductSupport} */
    get: function() {
      return this.list_;
    },
    /** @this {productsView.ProductSupport} */
    set: function(value) {
      if (value != this.list_) {
        this.list_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'list', null, value));
      }
    }
  },
  'MXMLDescriptor': {
    /** @this {productsView.ProductSupport} */
    get: function() {
      {
        if (this.mxmldd == undefined)
        {
          /** @type {Array} */
          var arr = org.apache.flex.utils.Language.superGetter(productsView.ProductSupport,this, 'MXMLDescriptor');
          /** @type {Array} */
          var data = [
      org.apache.flex.effects.Parallel,
2,
'id',
true,
'hideList',
'children',
null, [org.apache.flex.effects.Resize, 2, '_id', true, '$ID2', 'widthTo', true, 0, 0, 0, null],
0,
0,
null,
org.apache.flex.effects.Parallel,
2,
'id',
true,
'showList',
'children',
null, [org.apache.flex.effects.Resize, 2, '_id', true, '$ID3', 'widthTo', true, 130, 0, 0, null],
0,
0,
null,
org.apache.flex.html.List,
5,
'id',
true,
'list',
'width',
true,
130,
'percentHeight',
true,
100.0,
'selectedIndex',
true,
0,
'dataProvider',
true,
[{label: 'Install SIM Card'}],
0,
0,
null,
org.apache.flex.html.Container,
2,
'_id',
true,
'$ID5',
'percentWidth',
true,
100.0,
0,
0,
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
  productsView.ProductSupport.prototype._bindings = [
  2,
  "list",
  null,
  ["$ID2", "target"],
  "list",
  null,
  ["$ID3", "target"],
  0,
  2,
  "list",
  "valueChange",
  [0,1],
  null,
  null,
  null];
  
