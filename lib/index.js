var $ = require('jquery');

/**
 * @this {PubSub}
 *
 * @param {String} topic
 * @param {Array|Object} data
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
 */
function getQueue ( topic, fn ) {
	var data;
	if ( this.options.queue ) {
		if ( topic in this.queue ) {
			data = this.queue[topic];
			if ( data[0] instanceof $.Event && data[0].type === 'kistpubsubqueue' ) {
				data.shift();
			}
			data.unshift($.Event('kistpubsubqueue'));
			fn.apply(this.o[0], data);
		}
	}
}

/**
 * @this {PubSub}
 *
 * @param  {Function} fn
 * @param  {Function} condition
 *
 * @return {Function}
 */
function resolveEvent ( fn, condition ) {
	var event = this.options.event;
	function wrapper () {
		var args = (!event ? [].slice.call(arguments, 1) : arguments);
		if ( Boolean(condition.apply(this, args)) ) {
			return fn.apply(this, args);
		}
		return $.noop();
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
 * @return {Array|Object}
 */
function generateEventData () {
	var data = [].slice.call(arguments, 1);

	// If there is only 1 argument and that argument is either array or object
	// return that argument, otherwise return constructed array
	if ( data.length === 1 && ($.type(data[0]) === 'array' || $.type(data[0]) === 'object') ) {
		return data[0];
	}
	return data;
}

/**
 * @this {PubSub}
 *
 * @param  {String}   topic
 * @param  {Function} fn
 * @param  {String}   type
 * @param  {Function} condition
 */
function subscribe ( topic, fn, condition, type ) {

	condition = condition || function () {
		return true;
	};
	topic = generateTopic.call(this, topic);
	var wrapper = resolveEvent.call(this, fn, condition);

	getQueue.call(this, topic, wrapper);
	this.o[type].call(this.o, topic, wrapper);

}

/**
 * @class
 *
 * @param {Object} options
 */
var PubSub = module.exports = function ( options ) {

	this.o = $({});
	this.options = $.extend({}, this.defaults, options);

	// Clean namespace
	this.options.namespace = $.trim(this.options.namespace).replace(/^\.+/,'');

	if ( this.options.queue ) {
		this.queue = {};
	}

};

$.extend(PubSub.prototype, {

	/**
	 * @param  {String}   topic
	 * @param  {Function} fn
	 * @param  {Function} condition
	 */
	subscribe: function ( topic, fn, condition ) {
		subscribe.call(this, topic, fn, condition, 'on');
	},

	/**
	 * @param  {String}   topic
	 * @param  {Function} fn
	 * @param  {Function} condition
	 */
	subscribeOnce: function ( topic, fn, condition ) {
		subscribe.call(this, topic, fn, condition, 'one');
	},

	/**
	 * @param  {String} topic
	 */
	unsubscribe: function ( topic ) {
		topic = generateTopic.call(this, topic);
		this.o.off.call(this.o, topic);
	},

	/**
	 * @param  {String} topic
	 * @param  {Array|Object} data
	 */
	publish: function ( topic, data ) {
		topic = generateTopic.call(this, topic);
		data = generateEventData.apply(this, arguments);
		setQueue.call(this, topic, data);
		this.o.trigger.call(this.o, topic, data);
	},

	destroy: function () {
		this.unsubscribe();
	},

	defaults: {
		event: true,
		queue: false,
		namespace: ''
	}

});
