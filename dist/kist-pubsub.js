/*! kist-pubsub 0.1.0 - Simple publish/subscribe system. | Author: Ivan Nikolić, 2014 | License: MIT */
;(function ( $, window, document, undefined ) {

	var plugin = {
		name: 'PubSub'
	};

	/**
	 * @this {PubSub}
	 *
	 * @param {String} topic
	 * @param {Array|Object} data
	 *
	 * @return {}
	 */
	function setQueue ( topic, data ) {
		if ( this.options.queue ) {
			this.queue[topic] = data;
		}
	}

	/**
	 * @this {PubSub}
	 *
	 * @param  {String}   topic
	 * @param  {Function} fn
	 *
	 * @return {}
	 */
	function getQueue ( topic, fn ) {
		var data;
		if ( this.options.queue ) {
			if ( topic in this.queue ) {
				data = this.queue[topic];
				data.unshift(null);
				fn.apply(this.o[0], data);
			}
		}
	}

	/**
	 * @this {PubSub}
	 *
	 * @param  {Function} fn
	 *
	 * @return {Function}
	 */
	function resolveEvent ( fn ) {
		var event = this.options.event;
		function wrapper () {
			return fn.apply(this, (!event ? Array.prototype.slice.call(arguments, 1) : arguments));
		}
		if ( !event ) {
			wrapper.guid = fn.guid = fn.guid || $.guid++;
		}
		return wrapper;
	}

	/**
	 * @class
	 *
	 * @param {Object} options
	 */
	function PubSub ( options ) {

		this.o = $({});
		this.options = $.extend({}, this.defaults, options);

		if ( this.options.queue ) {
			this.queue = {};
		}

	}

	$.extend(PubSub.prototype, {

		/**
		 * @param  {String}   topic
		 * @param  {Function} fn
		 *
		 * @return {}
		 */
		subscribe: function ( topic, fn ) {
			var wrapper = resolveEvent.call(this, fn);
			getQueue.call(this, topic, wrapper);
			this.o.on(topic, wrapper);
		},

		unsubscribe: function () {
			this.o.off.apply(this.o, arguments);
		},

		/**
		 * @param  {String} topic
		 * @param  {Array|Object} data
		 *
		 * @return {}
		 */
		publish: function ( topic, data ) {
			setQueue.call(this, topic, data);
			this.o.trigger.apply(this.o, arguments);
		},

		destroy: function () {
			this.unsubscribe();
		},

		/**
		 * @type {Object}
		 */
		defaults: {
			event: true,
			queue: false
		}

	});

	$.kist = $.kist || {};
	$.kist[plugin.name] = PubSub;

})( jQuery, window, document );
