"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RTM = undefined;

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _weakMap = require("babel-runtime/core-js/weak-map");

var _weakMap2 = _interopRequireDefault(_weakMap);

var _rxLite = require("rx-lite");

var _rxLite2 = _interopRequireDefault(_rxLite);

var _uuid = require("node-uuid/uuid");

var _uuid2 = _interopRequireDefault(_uuid);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recoverableErrors = ["socket_reconnect", "socket_closed_unexpectedly"];

var connections = new _weakMap2.default();

var EventEmitter = function () {
	function EventEmitter() {
		(0, _classCallCheck3.default)(this, EventEmitter);

		this.subjects = new _map2.default();
		this.subscriptions = new _weakMap2.default();
	}

	(0, _createClass3.default)(EventEmitter, [{
		key: "emit",
		value: function emit(name, data) {
			this.ensureSubject(name);
			this.subjects.get(name).onNext(data);
			return this;
		}
	}, {
		key: "refuse",
		value: function refuse(name, reason) {
			this.ensureSubject(name);
			this.subjects.get(name).onError(reason);
			return this;
		}
	}, {
		key: "on",
		value: function on(event, fn) {
			if (typeof event !== "string") {
				throw new TypeError("'event' is missing or invalid");
			}
			if (typeof fn !== "function") {
				throw new TypeError("'fn' is missing or invalid");
			}
			this.ensureSubject(event);
			var subject = this.subjects.get(event);
			if (!this.subscriptions.has(subject)) {
				this.subscriptions.set(subject, new _map2.default());
			}
			var subscriptions = this.subscriptions.get(subject);
			subscriptions.set(fn, subject.subscribe(fn));
			return this;
		}
	}, {
		key: "off",
		value: function off(event, fn) {
			var _this = this;

			if (!arguments.length) {
				[].concat((0, _toConsumableArray3.default)(this.subjects.keys())).forEach(function (name) {
					return _this.off(name);
				});
				return this;
			}
			if (typeof event !== "string") {
				throw new TypeError("'event' parameter type is invalid");
			}
			this.ensureSubject(event);
			var subject = this.subjects.get(event);
			if (!fn) {
				subject.onCompleted();
				this.subjects.delete(event);
			} else {
				var subscriptions = this.subscriptions.get(subject);
				subscriptions.get(fn).dispose();
				subscriptions.delete(fn);
			}
			return this;
		}
	}, {
		key: "hasSubscribers",
		value: function hasSubscribers(event) {
			if (!this.subjects.has(event)) {
				return false;
			}
			var subject = this.subjects.get(event);
			return !!this.subscriptions.get(subject).size;
		}
	}, {
		key: "materialize",
		value: function materialize(name) {
			var _this2 = this;

			this.ensureSubject(name);
			var subject = this.subjects.get(name);
			return _rxLite2.default.Observable.create(function (obs) {
				if (subject.isStopped) {
					_this2.subjects.set(name, new _rxLite2.default.Subject());
					subject = _this2.subjects.get(name);
				}
				return subject.forEach(obs);
			});
		}
	}, {
		key: "ensureSubject",
		value: function ensureSubject(name) {
			if (!this.subjects.has(name)) {
				this.subjects.set(name, new _rxLite2.default.Subject());
			}
		}
	}]);
	return EventEmitter;
}();

/**
 * @class Channel
 *
 * @description
 * Implements core business logic of working with a given RTM Channel, which allows
 * you to subscribe/publish to a Channel and handle various lifecycle events.
 * You are **not** supposed to instantiate this class via constructor call,
 * please use "createChannel" function of the Connection class instance instead.
 *
 * @example
 *     // create RTM class instance
 *     var connection = MZ.RTM.create("your-appkey");
 *     // create new Channel with "your-channel" name
 *     var channel = connection.createChannel("your-channel");
 */


var Channel = function (_EventEmitter) {
	(0, _inherits3.default)(Channel, _EventEmitter);

	function Channel(name, connection) {
		(0, _classCallCheck3.default)(this, Channel);

		if (typeof name !== "string") {
			throw new TypeError("'name' is missing or invalid");
		}

		var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Channel).apply(this, arguments));

		(0, _assign2.default)(_this3, { name: name, connection: connection });
		_this3.next = undefined;
		_this3.source = _this3.getSource();
		_this3.source.subscribe(function (_ref) {
			var next = _ref.body.next;
			return _this3.next = next;
		}, _utils.identity);
		connections.get(connection).set(name, _this3);
		return _this3;
	}

	/**
  * @method publish
  *
  * @description
  * Publishes a message into a Channel.
  *
  * @example
  *     var connection = MZ.RTM.create("your-appkey");
  *     var channel = connection.createChannel("your-channel");
  *     // publish with no confirmation (default)...
  *     channel.publish({key: value});
  *     // publish with confirmation...
  *     channel.publish({key: value}, true)
  *         .then(function() {
  *             // everything is ok
  *         }, function() {
  *             // operation failed or no confirmation seen within 10 seconds
  *         });
  *
  * @param {JSON} message
  * JSON that represents a message you want to publish.
  *
  * @param {Boolean} [isConfirmationRequired=false]
  * This parameter defines if a message delivery confirmation should be requested
  * from RTM. By default no confirmation is requested. Confirmation is typically
  * requested in case a few actions depend on each other and you want to make
  * sure the first action is completed before starting the next one. SDK awaits
  * confirmation from RTM for 10 seconds, after that the request is considered
  * a failure.
  *
  * @throws {TypeError}
  * In case mandatory parameter is missing or invalid.
  *
  * @return {Promise}
  * Promise object that resolves as soon as the action is completed and rejects
  * in case an error received or the confirmation from RTM timed out (if you requested
  * a confirmation).
  */


	(0, _createClass3.default)(Channel, [{
		key: "publish",
		value: function publish(message) {
			var isConfirmationRequired = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			if (typeof message === "undefined") {
				throw new TypeError("'message' is missing");
			}
			var channel = this.name;
			return this.send({
				action: "rtm/publish",
				body: { message: message, channel: channel }
			}, isConfirmationRequired);
		}

		/**
   * @method subscribe
   *
   * @description
   * Subscribes to receive all messages from a Channel.
   * Note: you can skip "next" argument and use true/false as the first
   * argument value to define whether action confirmation is required.
   *
   * @example
   *     var connection = MZ.RTM.create("your-appkey");
   *     var channel = connection.createChannel("your-channel");
   *     // subscribe with no confirmation (default)...
   *     channel.subscribe();
   *     // subscribe with next and confirmation...
   *     channel.subscribe({"next": 7862334}, true)
   *         .then(function() {
   *             // everything is ok
   *         }, function() {
   *             // operation failed or no confirmation seen within 10 seconds
   *         });
   *     // subscribe with confirmation only...
   *     // (note: the function allows you to skip the first argument)
   *     channel.subscribe(true)
   *         .then(function() {
   *             // everything is ok
   *         }, function() {
   *             // operation failed or no confirmation seen within 10 seconds
   *         });
   *
   * @param {Object} [extra]
   * The set of additional parameters to be included into RTM "subscribe" call body.
   *
   * @param {String} [extra.next]
   * Last known channel stream position prior to subscribe operation. The "next" field
   * value can be extracted from the RTM data frames.
   *
   * @param {Object} [extra.history]
   * Object that defines which historical data RTM should send to the client after subsription.
   *
   * @param {Number} [extra.history.max_count]
   * Max amount of last messages to be sent by RTM to the client after subscription.
   *
   * @param {Number} [extra.history.max_age]
   * Max age of messages to be sent by RTM to the client after subscription.
   *
   * @param {Boolean} [isConfirmationRequired=false]
   * This parameter defines if "subscribe" action confirmation should be requested
   * from RTM. By default no confirmation is requested. Confirmation is typically
   * requested in case a few actions depend on each other and you want to make
   * sure the first action is completed before starting the next one. SDK awaits
   * confirmation from RTM for 10 seconds, after that the request is considered
   * a failure.
   *
   * @return {Promise}
   * Promise object that resolves as soon as the action is completed and rejects
   * in case an error received or the confirmation from RTM timed out (if you requested
   * a confirmation).
   */

	}, {
		key: "subscribe",
		value: function subscribe() {
			var extra = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			var isConfirmationRequired = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			// swapping arguments to allow simplified version of function invocation,
			// i.e.subscribe(true/false) instead of subscribe(undefined, true/false)
			if (typeof extra === "boolean") {
				var _ref2 = [extra, {}];
				isConfirmationRequired = _ref2[0];
				extra = _ref2[1];
			}
			// backwards compatibility: in case the first argument
			// is a string, we treat that as the "next" pointer value
			if (typeof extra === "string" || typeof extra === "number") {
				extra = { next: extra };
				// output backwards-compatibility notice
				if (window.console && window.console.warn) {
					window.console.warn("\n\t\t\t\t\t\"subscribe\" function of the Channel class was called\n\t\t\t\t\tin backwards compatibility mode, passing the \"next\" pointer\n\t\t\t\t\tas an argument. Please wrap the \"next\" pointer into an array\n\t\t\t\t\tlike this: subscribe({\"next\": \"your-value\"}). Old method will\n\t\t\t\t\tbe deprecated at one of the upcoming versions.\n\t\t\t\t");
				}
			}
			if (extra.next) {
				this.next = extra.next;
			}
			var body = (0, _assign2.default)({
				next: this.next,
				channel: this.name
			}, extra);
			return this.send({
				action: "rtm/subscribe",
				body: body
			}, isConfirmationRequired);
		}

		/**
   * @method unsubscribe
   *
   * @description
   * Unsubscribes from all events within a Channel.
   *
   * @example
   *     var connection = MZ.RTM.create("your-appkey");
   *     var channel = connection.createChannel("your-channel");
   *     // unsubscribe with no confirmation (default)...
   *     channel.unsubscribe();
   *     // unsubscribe with confirmation...
   *     channel.unsubscribe(true)
   *         .then(function() {
   *             // everything is ok
   *         }, function() {
   *             // operation failed or no confirmation seen within 10 seconds
   *         });
   *
   * @param {Boolean} [isConfirmationRequired=false]
   * This parameter defines if "unsubscribe" action confirmation should be requested
   * from RTM. By default no confirmation is requested. Confirmation is typically
   * requested in case a few actions depend on each other and you want to make
   * sure the first action is completed before starting the next one. SDK awaits
   * confirmation from RTM for 10 seconds, after that the request is considered
   * a failure.
   *
   * @return {Promise}
   * Promise object that resolves as soon as the action is completed and rejects
   * in case an error received or the confirmation from RTM timed out (if you requested
   * a confirmation).
   */

	}, {
		key: "unsubscribe",
		value: function unsubscribe() {
			var _this4 = this;

			var isConfirmationRequired = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			var channel = this.name;
			return this.send({
				action: "rtm/unsubscribe",
				body: { channel: channel }
			}, isConfirmationRequired).then(function () {
				return _this4.next = undefined;
			}).catch(function (e) {
				_this4.next = undefined;
				return _promise2.default.reject(e);
			});
		}

		/**
   * @method close
   *
   * @description
   * Unsubscribes from all events within this Channel and removes all handlers.
   * The difference with "unsubscribe" function is that the "close" function completely
   * terminates the subscription, i.e. you are not able to use "subscribe" after that
   * (you'll need to create a Channel again using connection.createChannel call),
   * whereas "unsubscribe" call allows you to "subscribe" to the same channel again later.
   *
   * @example
   *     var connection = MZ.RTM.create("your-appkey");
   *     var channel = connection.createChannel("your-channel");
   *     // closing a channel with confirmation of unsubscribe operation (default)...
   *     channel.close();
   *     // closing a channel with no confirmation of unsubscribe operation...
   *     channel.close(false);
   *
   * @param {Boolean} [waitUnsubscribeConfirmation=true]
   * This parameter indicates whether [unsubscribe](#channel-unsubscribeisconfirmationrequired)
   * operation will be send with confirmation or not.
   *
   * @return {Promise}
   * Promise object that resolves as soon as all actions are completed and rejects in case
   * the close function was called while connection was in closed state.
   */

	}, {
		key: "close",
		value: function close() {
			var _this5 = this;

			var waitUnsubscribeConfirmation = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			var complete = function complete() {
				_this5.off();
				var channels = connections.get(_this5.connection);
				channels.delete(_this5.name);
				return true;
			};
			return this.unsubscribe(waitUnsubscribeConfirmation).then(complete).catch(complete);
		}

		/**
   * @method on
   *
   * @description
   * Attaches a handler function, which is invoked when a certain action takes place.
   * Can be invoked several times to attach multiple handlers.
   *
   * @example
   *     var connection = MZ.RTM.create("my-appkey");
   *     var channel = connection.createChannel("your-channel");
   *     // register an "error" handler...
   *     channel.on("error", function() {
   *         // your handler code here
   *     });
   *     // register a function to be executed if there is data
   *     // coming for this channel...
   *     channel.on("data", function() {
   *         // your handler code here
   *     })
   *
   * @param {String} event
   * Name of the event a given handler should be attached to. You can register your
   * function to be execute in the following cases:
   *   - when a new event appears in a Channel (use "data" as argument value)
   *   - when channel is closed via [close](#channel-closewaitunsubscribeconfirmation)
   *   method or when whole connection were closed (use "close")
   *   - when SDK handles the error occurences and going to try to re-establish
   *   connection (use "beforeRetry")
   *   - when SDK tries to re-establish connection (use "retry")
   *   - when an error within a Channel is occurred (use "error" for that case)
   *
   * @param {Function} fn
   * Handler function to be attached and executed once a certain action took place.
   *
   * @throws {TypeError}
   * In case mandatory parameters are missing or invalid.
   *
   * @return {Channel}
   * Channel instance object.
   */

		/**
   * @method off
   *
   * @description
   * Detaches handler function(s) registered previously.
   *
   * @example
   *     var connection = MZ.RTM.create("my-appkey");
   *     var channel = connection.createChannel("your-channel");
   *     var errorHandler = function() {
   *         // your handler code here
   *     };
   *     // register an "error" handler...
   *     channel.on("error", errorHandler);
   *     // detach handler when you no longer need it...
   *     channel.off("error", errorHandler);
   *     // detach all "error" handlers...
   *     channel.off("error");
   *     // detach all handlers...
   *     channel.off();
   *
   * @param {String} [event]
   * Event name. Omit this parameter if you want to detach
   * all listeners for all events.
   *
   * @param {Function} [fn]
   * Listener function that you want to detach. Omit this parameter
   * if you want to detach all listeners for a given event name.
   *
   * @throws {TypeError}
   * In case event name type is invalid.
   *
   * @return {Channel}
   * Channel instance object.
   */

		// private methods below

	}, {
		key: "send",
		value: function send(pdu) {
			var _connection;

			if (this.isClosed()) {
				return _promise2.default.reject(new ReferenceError("Channel is in \"close\" state and operation \"" + pdu.action + "\"\n\t\t\t\t\tis not allowed. You should create new one to interact with such\n\t\t\t\t\tchannel \"" + this.name + "\""));
			}
			return (_connection = this.connection).send.apply(_connection, arguments);
		}
	}, {
		key: "getSource",
		value: function getSource() {
			var _this6 = this;

			return this.materialize("data").retryWhen(function (error) {
				return error.merge(_this6.connection.materialize("retry")).map(function (data) {
					var error = data.body.error;

					if (recoverableErrors.indexOf(error) < 0) {
						throw data;
					}
					return data;
				}).do(function () {
					return _this6.emit("retry");
				}).doOnNext(function () {
					return _this6.subscribe({ next: _this6.next });
				});
			}).doOnError(function (e) {
				return _this6.emit("error", e);
			}).finally(function () {
				return _this6.emit("close");
			}).publish().refCount();
		}
	}, {
		key: "isClosed",
		value: function isClosed() {
			var closeSubject = this.subjects.get("close");
			return closeSubject && closeSubject.isStopped;
		}
	}]);
	return Channel;
}(EventEmitter);

/**
 * @class RTM
 *
 * @description
 * Handles WebSocket RTM connection management and allows you to create Channels
 * to work with data flows.
 *
 * @example
 *     // create RTM class instance
 *     var connection = MZ.RTM.create("your-appkey");
 *     // create new Channel with "your-channel" name
 *     var channel = connection.createChannel("your-channel");
 */


var RTM = exports.RTM = function (_EventEmitter2) {
	(0, _inherits3.default)(RTM, _EventEmitter2);

	// TODO: remove jshint's ignore directives
	// when jshint team fixes the issue with
	// default values in deconstructed function parameter list

	function RTM(appKey) {
		var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? // jshint ignore:line
		{} : arguments[1];

		var _ref3$maxRetries = _ref3.maxRetries;
		var maxRetries = _ref3$maxRetries === undefined ? 10 : _ref3$maxRetries;
		var _ref3$maxRetriesTimeo = _ref3.maxRetriesTimeout;
		var // jshint ignore:line
		maxRetriesTimeout = _ref3$maxRetriesTimeo === undefined ? 30 : _ref3$maxRetriesTimeo;
		var _ref3$url = _ref3.url;
		var // jshint ignore:line
		url = _ref3$url === undefined ? "wss://api.platform.machinezone.com/v1" : _ref3$url;
		(0, _classCallCheck3.default)(this, RTM);

		if (typeof appKey !== "string") {
			throw new TypeError("'appKey' is missing or invalid");
		}

		var _this7 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RTM).apply(this, arguments));

		_this7.appKey = appKey;
		_this7.options = (0, _assign2.default)({}, { url: url, maxRetries: maxRetries, maxRetriesTimeout: maxRetriesTimeout });
		_this7.setState("CONNECTING");
		_this7.trackState();
		_this7.socket = _this7.getSocket(url);
		_this7.source = _this7.getSource();
		_this7.materialize("data").retry().forEach(function (data) {
			var _data$body = data.body;
			var channel = _data$body.channel;
			var error = _data$body.error;
			var action = data.action;

			var channelObject = connections.get(_this7).get(channel);
			if (!channelObject || action.indexOf("rtm/channel") === -1) {
				return;
			}
			if (error) {
				channelObject.refuse("data", data);
			} else {
				channelObject.emit("data", data);
			}
		}, _utils.identity);
		connections.set(_this7, new _map2.default());
		return _this7;
	}

	/**
  * @method create
  * @static
  *
  * @description
  * Creates an instance of this class and returns the instance reference.
  * The function provides additional syntax of how the MZ.RTM class can be
  * instantiated.
  *
  * @example
  *     // instantiation via static "create" method:
  *     var connection = MZ.RTM.create("your-appkey");
  *
  * @param {String} appKey
  * Application key used for a given connection.
  * This field is used to identify customer account within MZ RTM system.
  *
  * @param {Object} [options]
  * Additional options used to establish connection or define extra rules for Connection object.
  *
  * @param {String} [options.url="wss://api.platform.machinezone.com/v1"]
  * Defines RTM cluster endpoint location, which should be used for a given Connection.
  *
  * @param {Number} [options.maxRetries=10]
  * Defines max reconnect attempts to be performed in a row.
  *
  * @param {Number} [options.maxRetriesTimeout=30]
  * Defines max timeout (in seconds) between reconnect attempts.
  * Note: timeout keeps increasing with each failed attempt, but it doesn't exceed this number.
  *
  * @throws {TypeError}
  * In case mandatory parameters are missing or invalid.
  *
  * @return {Object}
  * Reference to the Connection class instance created.
  */


	(0, _createClass3.default)(RTM, [{
		key: "createChannel",


		/**
   * @method createChannel
   *
   * @description
   * Creates an instance of a Channel class with the specified name.
   * Note: if you want to subscribe to multiple Channels, you should invoke this function
   * multiple times with the necessary channel names.
   *
   * @example
   *     var connection = MZ.RTM.create("your-appkey");
   *     var channel = connection.createChannel("your-channel-name");
   *
   * @param {String} name
   * Channel name.
   *
   * @throws {TypeError}
   * In case mandatory parameter is missing or invalid.
   *
   * @throws {RangeError}
   * In case channel with given name already exists within connection.
   *
   * @return {Object}
   * An instance of the Channel class that represents an RTM Channel.
   * This instance can be used to perform Channel operations such as subscribe/publish.
   */
		value: function createChannel(name) {
			var channels = connections.get(this);
			if (channels.has(name)) {
				throw new RangeError("Channel \"" + name + "\" already exists in this connection.");
			}
			return new Channel(name, this);
		}

		/**
   * @method createChannel
   *
   * @description
   * Gets an instance of a Channel with the specified name.
   *
   * @example
   *     var connection = MZ.RTM.create("your-appkey");
   *     var channel = connection.createChannel("your-channel-name");
   *     channel === connection.getChannel("your-channel-name"); // true
   *
   * @param {String} name
   * Channel name.
   *
   * @return {Object}
   * An instance of the Channel class that represents an RTM Channel in case
   * it exists. Otherwise returns undefined.
   */

	}, {
		key: "getChannel",
		value: function getChannel(name) {
			var channels = connections.get(this);
			return channels.get(name);
		}

		/**
   * @method open
   *
   * @description
   * Initiates WebSocket connection with MZ RTM.
   * Note: you do *not* need to call it explicitly, unless you closed
   * connection using "close" function manually. In other cases connection is established
   * by SDK automatically during the first subscribe or publish call.
   *
   * @example
   *     var connection = MZ.RTM.create("your-appkey");
   *     // at some point the "close" function was called explicitly and connection
   *     // was terminated, so let's connect again...
   *     connection.open();
   *
   * @return {Promise}
   * Promise object that resolves when connection is in "open" state
   */

	}, {
		key: "open",
		value: function open() {
			var _this8 = this;

			var channels = connections.get(this);
			var promise = new _promise2.default(function (resolve) {
				return _this8.materialize("open").forEach(resolve);
			});
			this.source.forEach(_utils.identity, function (error) {
				return [].concat((0, _toConsumableArray3.default)(channels.values())).forEach(function (channel) {
					return channel.refuse("data", { body: { error: error } });
				});
			}, function () {
				return [].concat((0, _toConsumableArray3.default)(channels.values())).forEach(function (channel) {
					return channel.off();
				});
			});
			return promise;
		}

		/**
   * @method close
   *
   * @description
   * Terminates connection with RTM, clears all subscriptions and removes
   * all Channels. Use this method when you want to shut down all RTM interactions
   * spawned by this instance of the connection.
   *
   * @example
   *     var connection = MZ.RTM.create("your-appkey");
   *     connection.close();
   *
   * @return {Promise}
   * Promise object that resolves as soon as all actions are completed and rejects in case
   * the close function was called while connection was in closed state.
   */

	}, {
		key: "close",
		value: function close() {
			var _this9 = this;

			if (this.getState() !== "OPEN") {
				return _promise2.default.reject();
			}
			var promise = new _promise2.default(function (resolve) {
				return _this9.materialize("close").timeout(1000).catch(function () {
					return _promise2.default.resolve();
				}).forEach(resolve);
			});
			this.socket.onCompleted();
			return promise;
		}

		/**
   * @method on
   *
   * @description
   * Attaches a handler function, which is invoked when a certain action takes place.
   * Can be invoked several times to attach multiple handlers.
   *
   * @example
   *     var connection = MZ.RTM.create("my-appkey");
   *     // register an "error" handler...
   *     connection.on("error", function() {
   *         // your handler code here
   *     });
   *     // register a function to be executed once connection is opened...
   *     connection.on("open", function() {
   *         // your handler code here
   *     });
   *
   * @param {String} event
   * Name of the event a given handler should be attached to. You can register your
   * function to be executed in the following cases:
   *   * when connection is opened (use "open" as argument value)
   *   * when connection is closed (use "close")
   *   * when SDK handles the error occurences and going to try to re-establish
   *   connection (use "beforeRetry")
   *   * when SDK tries to re-establish connection (use "retry")
   *   * when an error with connection has occurred (use "error" for that case)
   *
   * @param {Function} fn
   * Handler function to be attached and executed once a certain action took place.
   *
   * @throws {TypeError}
   * In case mandatory parameters are missing or invalid.
   *
   * @return {RTM}
   * RTM instance object.
   */

		/**
   * @method off
   *
   * @description
   * Detaches handler function(s) registered previously.
   *
   * @example
   *     var connection = MZ.RTM.create("my-appkey");
   *     // register an "error" handler...
   *     var errorHandler = function() {
   *         // your handler code here
   *     };
   *     connection.on("error", errorHandler);
   *     // detach handler when you no longer need it...
   *     connection.off("error", errorHandler);
   *     // detach all "error" handlers...
   *     connection.off("error");
   *     // detach all handlers...
   *     connection.off();
   *
   * @param {String} [event]
   * Event name. Omit this parameter if you want to detach
   * all listeners for all events.
   *
   * @param {Function} [fn]
   * Listener function that you want to detach. Omit this parameter
   * if you want to detach all listeners for a given event name.
   *
   * @throws {TypeError}
   * In case event name type is invalid.
   *
   * @return {RTM}
   * RTM instance object.
   */

		// private methods below

	}, {
		key: "send",
		value: function send(pdu, isConfirmationRequired) {
			this.open();
			if (isConfirmationRequired) {
				pdu.id = _uuid2.default.v1();
			}
			this.socket.onNext((0, _stringify2.default)(pdu));
			return isConfirmationRequired ? this.waitConfirmationFor(pdu.id) : _promise2.default.resolve();
		}

		/* jshint ignore:start */

	}, {
		key: "waitConfirmationFor",
		value: function waitConfirmationFor(expectedId) {
			var _this10 = this;

			return new _promise2.default(function (resolve, reject) {
				_this10.materialize("data").filter(function (_ref4) {
					var _ref4$id = _ref4.id;
					var id = _ref4$id === undefined ? "" : _ref4$id;
					return id === expectedId;
				}).take(1).timeout(10000).forEach(function (data) {
					// handle full replies
					var error = data.body.error;

					if (error) {
						reject(data);
					} else {
						resolve(data);
					}
				}, reject);
			});
		}
		/* jshint ignore:end */

	}, {
		key: "getSource",
		value: function getSource() {
			var _this11 = this;

			var _options = this.options;
			var maxRetries = _options.maxRetries;
			var maxRetriesTimeout = _options.maxRetriesTimeout;

			return this.socket.retryWhen(function (error) {
				return error.scan(function (_ref5, e) {
					var _ref6 = (0, _slicedToArray3.default)(_ref5, 1);

					var attempts = _ref6[0];

					if (attempts >= maxRetries) {
						throw e;
					}
					return [attempts + 1, e];
				}, [0]).takeWhile(function (_ref7) {
					var _ref8 = (0, _slicedToArray3.default)(_ref7, 2);

					var _ = _ref8[0];
					var e = _ref8[1];
					return e.type === "error" || e.wasClean === false;
				}).map(function (_ref9) {
					var _ref10 = (0, _slicedToArray3.default)(_ref9, 1);

					var attempts = _ref10[0];
					return Math.min(maxRetriesTimeout, (0, _utils.random)(0, Math.pow(2, attempts) - 1)) * 1000;
				}).doOnNext(function (timeout) {
					_this11.emit("beforeRetry", timeout);
					var channels = connections.get(_this11);
					[].concat((0, _toConsumableArray3.default)(channels.values())).forEach(function (ch) {
						return ch.emit("beforeRetry", timeout);
					});
				}).flatMap(function (timeout) {
					return _rxLite2.default.Observable.just(timeout).delay(timeout);
				}).doOnNext(function () {
					return _this11.emit("retry", { body: { error: "socket_reconnect" } });
				});
			}).doOnError(function (e) {
				return _this11.emit("error", e);
			}).publish().refCount();
		}
	}, {
		key: "getSocket",
		value: function getSocket(url) {
			var _this12 = this;

			var handle = function handle(args) {
				try {
					var data = JSON.parse(args.data);
					_this12.emit("data", data);
				} catch (error) {
					_this12.emit("error", error);
				}
			};
			return (0, _utils.fromWebSocket)(url + "?appkey=" + this.appKey, function () {
				return _this12.emit("open");
			}, function (data) {
				return handle(data);
			}, function (error) {
				return _this12.refuse("data", error);
			}, function () {
				return _this12.emit("close");
			});
		}
	}, {
		key: "setState",
		value: function setState(state) {
			this.readyState = state;
		}
	}, {
		key: "getState",
		value: function getState() {
			return this.readyState;
		}
	}, {
		key: "trackState",
		value: function trackState() {
			var _this13 = this;

			this.materialize("open").forEach(function () {
				return _this13.setState("OPEN");
			});
			this.materialize("close").merge(this.materialize("error")).forEach(function () {
				return _this13.setState("CLOSE");
			});
		}
	}], [{
		key: "create",
		value: function create() {
			return new (Function.prototype.bind.apply(this, [null].concat(Array.prototype.slice.call(arguments))))();
		}
	}]);
	return RTM;
}(EventEmitter);