/**
 * Generated by Apache Flex Cross-Compiler from productsView\ProductList.mxml
 * productsView.ProductList
 *
 * @fileoverview
 *
 * @suppress {missingRequire|checkTypes}
 */

goog.provide('productsView.ProductList');

goog.require('org.apache.flex.html.Container');
goog.require('org.apache.flex.html.beads.controllers.DropMouseController');
goog.require('org.apache.flex.effects.Move');
goog.require('productsView.ProductListItem');
goog.require('org.apache.flex.core.DropType');
goog.require('org.apache.flex.effects.Sequence');
goog.require('samples.flexstore.ProductListEvent');
goog.require('org.apache.flex.events.DragEvent');




/**
 * @constructor
 * @extends {org.apache.flex.html.Container}
 */
productsView.ProductList = function() {
  productsView.ProductList.base(this, 'constructor');
  
  this.playingEffects = new Object();
  /**
   * @private
   * @type {org.apache.flex.core.SimpleCSSStyles}
   */
  this.$ID0_;
  
  /**
   * @private
   * @type {org.apache.flex.html.beads.controllers.DropMouseController}
   */
  this.dmc_;
  
  /**
   * @private
   * @type {org.apache.flex.html.beads.layouts.VerticalLayout}
   */
  this.$ID1_;
  
  /**
   * @private
   * @type {org.apache.flex.html.supportClasses.ScrollingViewport}
   */
  this.scrollingView_;
  
  /**
   * @private
   * @type {org.apache.flex.html.Container}
   */
  this.viewport_;
  
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
[org.apache.flex.core.SimpleCSSStyles, 4, '_id', true, '$ID0', 'borderStyle', true, 'solid', 'borderWidth', true, 1, 'backgroundColor', true, 12366495, 0, 0, null],
'beads',
null, [org.apache.flex.html.beads.controllers.DropMouseController, 1, 'id', true, 'dmc', 0, 2, 'dragEnter', this.$EH0, 'dragDrop', this.$EH1, null, org.apache.flex.html.beads.layouts.VerticalLayout, 1, '_id', true, '$ID1', 0, 0, null, org.apache.flex.html.supportClasses.ScrollingViewport, 1, 'id', true, 'scrollingView', 0, 0, null],
0,
0
  ]);
  
};
goog.inherits(productsView.ProductList, org.apache.flex.html.Container);


/**
 * Metadata
 *
 * @type {Object.<string, Array.<Object>>}
 */
productsView.ProductList.prototype.FLEXJS_CLASS_INFO = { names: [{ name: 'ProductList', qName: 'productsView.ProductList' }] };


/**
 * @export
 * @type {Array}
 */
productsView.ProductList.prototype.items;


/**
 * @export
 * @type {number}
 */
productsView.ProductList.prototype.newItemStartX;


/**
 * @export
 * @type {number}
 */
productsView.ProductList.prototype.newItemStartY;


/**
 * @export
 * @type {number}
 */
productsView.ProductList.prototype.maxItems_ = 0;


/**
 * @export
 * @type {boolean}
 */
productsView.ProductList.prototype.showQuantity;


/**
 * @private
 * @type {Object}
 */
productsView.ProductList.prototype.playingEffects;


/**
 * @export
 * @param {samples.flexstore.Product} product
 */
productsView.ProductList.prototype.addProduct = function(product) {
  var self = this;
  if (this.items == null)
    this.items = [];
  var /** @type {number} */ index = this.indexOf(product.productId);
  var /** @type {samples.flexstore.ProductListEvent} */ event;
  var /** @type {productsView.ProductListItem} */ item;
  if (index != -1) {
    item = org.apache.flex.utils.Language.as(this.items[index], productsView.ProductListItem);
    if (this.playingEffects[item.uid] == null) {
      var /** @type {org.apache.flex.effects.Sequence} */ jump = new org.apache.flex.effects.Sequence();
      var /** @type {org.apache.flex.effects.Move} */ m1 = new org.apache.flex.effects.Move(item);
      m1.yBy = -5;
      var /** @type {org.apache.flex.effects.Move} */ m2 = new org.apache.flex.effects.Move(item);
      m2.yBy = 5;
      jump.addChild(m1);
      jump.addChild(m2);
      jump.duration = 150;
      this.playingEffects[item.uid] = jump;
      jump.addEventListener(org.apache.flex.effects.Effect.EFFECT_END, function(event) {
        delete self.playingEffects[item.uid];
      });
      jump.play();
    }
    event = new samples.flexstore.ProductListEvent(samples.flexstore.ProductListEvent.DUPLICATE_PRODUCT);
    event.product = item.product;
    this.dispatchEvent(event);
  } else {
    index = this.items.length;
    if (this.maxItems <= 0 || index < this.maxItems) {
      item = new productsView.ProductListItem();
      if (this.showQuantity) {
        item.currentState = 'showQuantity';
      }
      item.product = product;
      item.percentWidth = 100;
      item.addEventListener(samples.flexstore.ProductListEvent.REMOVE_PRODUCT, org.apache.flex.utils.Language.closure(this.removeItemHandler, this, 'removeItemHandler'));
      this.items[index] = item;
      this.viewport.addElement(item);
      this.layoutItems(index, true);
      event = new samples.flexstore.ProductListEvent(samples.flexstore.ProductListEvent.ADD_PRODUCT);
      event.product = product;
      this.dispatchEvent(event);
    }
  }
};


/**
 * @export
 * @return {Array}
 */
productsView.ProductList.prototype.getProducts = function() {
  var /** @type {Array} */ ret = [];
  for (var /** @type {number} */ i = 0; i < this.items.length; i++) {
    ret[i] = org.apache.flex.utils.Language.as(this.items[i], productsView.ProductListItem, true).product;
  }
  return ret;
};


/**
 * @private
 * @param {org.apache.flex.events.Event} event
 */
productsView.ProductList.prototype.removeItemHandler = function(event) {
  var /** @type {productsView.ProductListItem} */ item = org.apache.flex.utils.Language.as(event.target, productsView.ProductListItem);
  var /** @type {number} */ index = this.indexOf(item.product.productId);
  this.items.splice(index, 1);
  this.viewport.removeElement(item);
  this.layoutItems(index);
};


/**
 * @private
 * @param {number} startIndex
 * @param {boolean=} scrollToBottom
 */
productsView.ProductList.prototype.layoutItems = function(startIndex, scrollToBottom) {
  var self = this;
  scrollToBottom = typeof scrollToBottom !== 'undefined' ? scrollToBottom : false;
  var /** @type {number} */ n = this.items.length;
  var /** @type {org.apache.flex.effects.Move} */ e;
  for (var /** @type {number} */ i = startIndex; i < n; i++) {
    var /** @type {productsView.ProductListItem} */ item = this.items[i];
    var /** @type {number} */ yTo = i * (item.height);
    if (this.playingEffects[item.uid] == null) {
      e = new org.apache.flex.effects.Move(item);
      if (item.x == 0 && item.y == 0) {
        e.xFrom = this.newItemStartX;
        e.yFrom = this.newItemStartY;
      }
      e.xTo = 0;
      e.yTo = yTo;
      this.playingEffects[item.uid] = e;
      e.addEventListener(org.apache.flex.effects.Effect.EFFECT_END, function(event) {
        delete self.playingEffects[item.uid];
      });
      e.play();
    } else {
      this.playingEffects[item.uid].pause();
      this.playingEffects[item.uid].yTo = yTo;
      this.playingEffects[item.uid].play();
    }
  }
  if (scrollToBottom) {
    e.addEventListener(org.apache.flex.effects.Effect.EFFECT_END, function(event) {
    });
  }
};


/**
 * @private
 * @param {number} productId
 * @return {number}
 */
productsView.ProductList.prototype.indexOf = function(productId) {
  var /** @type {number} */ index = -1;
  var /** @type {number} */ n = this.items.length;
  for (var /** @type {number} */ i = 0; i < this.items.length; i++) {
    if (org.apache.flex.utils.Language.as(this.items[i], productsView.ProductListItem, true).product.productId == productId) {
      index = i;
      break;
    }
  }
  return index;
};


/**
 * @private
 * @param {org.apache.flex.events.DragEvent} event
 */
productsView.ProductList.prototype.doDragEnter = function(event) {
  org.apache.flex.utils.Language.trace("doDragEnter");
  this.dmc.acceptDragDrop(org.apache.flex.utils.Language.as(event.target, org.apache.flex.core.IUIBase), org.apache.flex.core.DropType.COPY);
};


/**
 * @private
 * @param {org.apache.flex.events.DragEvent} event
 */
productsView.ProductList.prototype.doDragDrop = function(event) {
  org.apache.flex.utils.Language.trace("doDragDrop");
  var /** @type {samples.flexstore.Product} */ product = org.apache.flex.utils.Language.as(org.apache.flex.events.DragEvent.dragSource, samples.flexstore.Product);
  this.addProduct(product);
};


Object.defineProperties(productsView.ProductList.prototype, /** @lends {productsView.ProductList.prototype} */ {
/** @export */
maxItems: {
/** @this {productsView.ProductList} */
  get: function() {
  return this.maxItems_;
  },

/** @this {productsView.ProductList} */
set: function(value) {
if (value != this.maxItems_) {
    var oldValue = this.maxItems_;
    this.maxItems_ = value;
    this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(
         this, "maxItems", oldValue, value));
}
}}}
);/**
 * @export
 * @param {org.apache.flex.events.DragEvent} event
 */
productsView.ProductList.prototype.$EH0 = function(event)
{
  this.doDragEnter(event);
};


/**
 * @export
 * @param {org.apache.flex.events.DragEvent} event
 */
productsView.ProductList.prototype.$EH1 = function(event)
{
  this.doDragDrop(event);
};


Object.defineProperties(productsView.ProductList.prototype, /** @lends {productsView.ProductList.prototype} */ {
/** @export */
    dmc: {
    /** @this {productsView.ProductList} */
    get: function() {
      return this.dmc_;
    },
    /** @this {productsView.ProductList} */
    set: function(value) {
      if (value != this.dmc_) {
        this.dmc_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'dmc', null, value));
      }
    }
  },
  /** @export */
    scrollingView: {
    /** @this {productsView.ProductList} */
    get: function() {
      return this.scrollingView_;
    },
    /** @this {productsView.ProductList} */
    set: function(value) {
      if (value != this.scrollingView_) {
        this.scrollingView_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'scrollingView', null, value));
      }
    }
  },
  /** @export */
    viewport: {
    /** @this {productsView.ProductList} */
    get: function() {
      return this.viewport_;
    },
    /** @this {productsView.ProductList} */
    set: function(value) {
      if (value != this.viewport_) {
        this.viewport_ = value;
        this.dispatchEvent(org.apache.flex.events.ValueChangeEvent.createUpdateEvent(this, 'viewport', null, value));
      }
    }
  },
  'MXMLDescriptor': {
    /** @this {productsView.ProductList} */
    get: function() {
      {
        if (this.mxmldd == undefined)
        {
          /** @type {Array} */
          var arr = org.apache.flex.utils.Language.superGetter(productsView.ProductList,this, 'MXMLDescriptor');
          /** @type {Array} */
          var data = [
      org.apache.flex.html.Container,
3,
'id',
true,
'viewport',
'percentWidth',
true,
100.0,
'percentHeight',
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
  
