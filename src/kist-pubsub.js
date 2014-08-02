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
	 * @this {PubSub}
	 *
	 * @param  {String} topic
	 *
	 * @return {String}
	 */
	function generateTopic ( topic ) {
		topic = topic || '';
		if ( this.options.namespace ) {
			return topic + '.' + this.options.namespace;
		}
		return topic;
	}

	/**
	 * @this {PubSub}
	 *
	 * @param  {String}   topic
	 * @param  {Function} fn
	 * @param  {String}   type
	 *
	 * @return {}
	 */
	function subscribe ( topic, fn, type ) {
		topic = generateTopic.call(this, topic);
		var wrapper = resolveEvent.call(this, fn);
		getQueue.call(this, topic, wrapper);
		this.o[type].call(this.o, topic, wrapper);
	}

	/**
	 * @class
	 *
	 * @param {Object} options
	 */
	function PubSub ( options ) {

		this.o = $({});
		this.options = $.extend({}, this.defaults, options);

		// Clean namespace
		this.options.namespace = $.trim(this.options.namespace).replace(/^\.+/,'');

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
			subscribe.call(this, topic, fn, 'on');
		},

		/**
		 * @param  {String}   topic
		 * @param  {Function} fn
		 *
		 * @return {}
		 */
		subscribeOnce: function ( topic, fn ) {
			subscribe.call(this, topic, fn, 'one');
		},

		/**
		 * @param  {String} topic
		 *
		 * @return {}
		 */
		unsubscribe: function ( topic ) {
			topic = generateTopic.call(this, topic);
			this.o.off.call(this.o, topic);
		},

		/**
		 * @param  {String} topic
		 * @param  {Array|Object} data
		 *
		 * @return {}
		 */
		publish: function ( topic, data ) {
			topic = generateTopic.call(this, topic);
			setQueue.call(this, topic, data);
			this.o.trigger.call(this.o, topic, data);
		},

		destroy: function () {
			this.unsubscribe();
		},

		/**
		 * @type {Object}
		 */
		defaults: {
			event: true,
			queue: false,
			namespace: ''
		}

	});

	$.kist = $.kist || {};
	$.kist[plugin.name] = PubSub;

})( jQuery, window, document );
