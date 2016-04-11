"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fromWebSocket = exports.random = exports.identity = undefined;

var _rxLite = require("rx-lite");

var _rxLite2 = _interopRequireDefault(_rxLite);

var _websocket = require("websocket");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPEN = 1;

var identity = exports.identity = function identity(x) {
	return x;
};

var random = exports.random = function random(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
};

var fromWebSocket = exports.fromWebSocket = function fromWebSocket(url) {
	var openHandler = arguments.length <= 1 || arguments[1] === undefined ? identity : arguments[1];
	var messageHandler = arguments.length <= 2 || arguments[2] === undefined ? identity : arguments[2];
	var errorHandler = arguments.length <= 3 || arguments[3] === undefined ? identity : arguments[3];
	var closeHandler = arguments.length <= 4 || arguments[4] === undefined ? identity : arguments[4];

	var socket = undefined;
	var queue = [];
	var isOpen = function isOpen() {
		return socket && socket.readyState === OPEN;
	};

	function socketClose(code, reason) {
		if (socket) {
			if (!code) {
				socket.close();
			} else {
				socket.close(code, reason);
			}
		}
	}

	var observable = _rxLite2.default.Observable.create(function (obs) {
		socket = new _websocket.w3cwebsocket(url);

		function onOpen() {
			while (queue.length) {
				queue.shift()();
			}
			openHandler();
			socket.removeEventListener("open", onOpen, false);
		}
		function onClose(e) {
			// treat 1005 code as normal closure for now
			// FIXME when RTM team employ the normal closure
			if (e.code !== 1000 && e.code !== 1005) {
				errorHandler(e);
				obs.onError(e);
			} else {
				closeHandler();
				obs.onCompleted();
			}
		}

		socket.addEventListener("open", onOpen, false);
		socket.addEventListener("message", messageHandler, false);
		socket.addEventListener("close", onClose, false);

		return function () {
			socket.removeEventListener("message", messageHandler, false);
			socket.removeEventListener("close", onClose, false);
			queue = [];
		};
	});

	var observer = _rxLite2.default.Observer.create(function (data) {
		if (isOpen()) {
			socket.send(data);
		} else {
			queue.push(function () {
				return isOpen() && socket.send(data);
			});
		}
	}, function (e) {
		return socketClose(e.code, e.reason || "");
	}, function () {
		return socketClose(1000, "");
	});

	return _rxLite2.default.Subject.create(observer, observable);
};