'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })(); // import './style/style.less';

Object.defineProperty(exports, "__esModule", {
	value: true
});

require('babel-core/polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Lang = require('./Lang');

var _Lang2 = _interopRequireDefault(_Lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuCookies = (function (_React$Component) {
	_inherits(EuCookies, _React$Component);

	function EuCookies(props) {
		_classCallCheck(this, EuCookies);

		var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(EuCookies).call(this, props));

		_this4.state = {
			show: true,
			showHideEffect: false,
			height: 0,
			lang: _this4.getLanguage(props.lang)
		};
		return _this4;
	}

	_createClass(EuCookies, [{
		key: 'getLanguage',
		value: function getLanguage(forced) {
			var lang = (navigator.language || navigator.userLanguage).substring(0, 2);

			if (typeof forced != "undefined") {
				lang = forced;
			}

			if (typeof _Lang2.default[lang] == "undefined") {
				lang = "en";
			}

			return lang;
		}
	}, {
		key: 'cookiesAccepted',
		value: function cookiesAccepted() {
			var _this = this;

			this.setState({ showHideEffect: true });
			this.setHideToCookies();
			setTimeout(function () {
				return _this.setState({ show: false });
			}, 800);
		}
	}, {
		key: 'setHideToCookies',
		value: function setHideToCookies() {
			var date = new Date();
			date.setFullYear(date.getFullYear() + 10);
			document.cookie = 'euCookiesAccepted=1; path=/; expires=' + date.toGMTString();
		}
	}, {
		key: 'getCookies',
		value: function getCookies() {
			var cookies = {};
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = document.cookie.split('; ')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var cookie = _step.value;

					var _cookie$split = cookie.split("=");

					var _cookie$split2 = _slicedToArray(_cookie$split, 2);

					var name = _cookie$split2[0];
					var value = _cookie$split2[1];

					cookies[name] = decodeURIComponent(value);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return cookies;
		}
	}, {
		key: 'onResizeWindow',
		value: function onResizeWindow() {
			var _this2 = this;

			if (window.resizeTimeOut != null) clearTimeout(window.resizeTimeOut);

			window.resizeTimeOut = setTimeout(function () {
				_this2.setState({ height: 0 });
				setTimeout(function () {
					_this2.setState({ height: _react2.default.findDOMNode(_this2).offsetHeight });
				}, 100);
			}, 400);
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var cookies = this.getCookies();
			if (cookies.euCookiesAccepted == 1) {
				this.setState({ show: false });
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this3 = this;

			this.setState({ height: _react2.default.findDOMNode(this).offsetHeight });

			window.resizeTimeOut = null;

			window.onresize = function () {
				return _this3.onResizeWindow.bind(_this3);
			};

			//IE8 and older Fix
			if (typeof Array.isArray == "undefined") {
				Array.isArray = function (obj) {
					return Object.prototype.toString.call(obj) === "[object Array]";
				};
			}
		}
	}, {
		key: 'render',
		value: function render() {

			if (!this.state.show) {
				return _react2.default.createElement('span', {
					__source: {
						fileName: '..\\..\\..\\..\\..\\src\\EuCookies.jsx',
						lineNumber: 96
					}
				});
			}

			var divClass = "eu-cookies";
			divClass += this.state.showHideEffect ? " hide" : "";

			var height = {
				height: this.state.height > 0 ? this.state.height : "auto"
			};

			return _react2.default.createElement(
				'div',
				{ className: divClass, style: height, __source: {
						fileName: '..\\..\\..\\..\\..\\src\\EuCookies.jsx',
						lineNumber: 107
					}
				},
				_react2.default.createElement(
					'div',
					{
						__source: {
							fileName: '..\\..\\..\\..\\..\\src\\EuCookies.jsx',
							lineNumber: 108
						}
					},
					_Lang2.default[this.state.lang].text,
					_react2.default.createElement(
						'button',
						{ onClick: this.cookiesAccepted.bind(this), __source: {
								fileName: '..\\..\\..\\..\\..\\src\\EuCookies.jsx',
								lineNumber: 110
							}
						},
						_Lang2.default[this.state.lang].btn
					),
					_react2.default.createElement(
						'a',
						{ href: 'http://www.aboutcookies.org/default.aspx?page=5', target: '_blank', __source: {
								fileName: '..\\..\\..\\..\\..\\src\\EuCookies.jsx',
								lineNumber: 111
							}
						},
						_Lang2.default[this.state.lang].link
					)
				)
			);
		}
	}]);

	return EuCookies;
})(_react2.default.Component);

exports.default = EuCookies;