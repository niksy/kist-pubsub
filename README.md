# kist-pubsub

Simple publish/subscribe system.

## Installation

```sh
npm install kist-pubsub --save

bower install kist-pubsub --save
```

## API

### `new PubSub(options)`

Returns: `PubSub`

#### options

Type: `Object`

Instance options.

| Property | Type | Description | Default value |
| --- | --- | --- | --- |
| `event` | `Boolean` | Should subscribed event have event object as first argument in passed callback (same as in standard jQuery event system). | `true` |
| `queue` | `Boolean` | Should this instance implement queue system. When you subscribe to that specific event at later date, callback with data from last already applied callback for that specific event will be activated. | `false` |
| `namespace` | `String` | Default event namespace for this instance of PubSub system. | `''` |

### `.publish(event, data)`

Publish data for specific event.

#### event

Type: `String`  
*Required*

Event to publish.

#### data

Type: `Array|Object`  
*Required*

Data to pass via published event. Behaves same as [`trigger` in standard jQuery event system](http://api.jquery.com/trigger/#trigger-event-extraParameters).

In addition to behaving like jQuery `trigger`, if you pass more than one argument (not counting event), all arguments will be passed as list of arguments to `subscribe` methods.

### `.subscribe(event, callback, condition)`

Subscribe to specific event.

#### event

Type: `String`  
*Required*

Event to subscribe to.

#### callback

Type: `Function`  
*Required*

Callback to run when event is published. Provided arguments are:

| Argument | Type | Description |
| --- | --- | --- |
| `e` | `$.Event` | Standard event object. Won’t be passed if `event` property inside initialization object is set to `false`. |
| `args…` | `Mixed` | List of arguments after that is data passed via published event. |

#### condition

Type: `Function`

If return value is truthy value, it will activate `callback` function. Gets same arguments like [`callback`](#callback).

### `.subscribeOnce(event, callback, condition)`

Subscribe to specific event only once.

API is same as for [subscribe](#subscribe).

### `.unsubscribe(event)`

Unsubscribes from specific event.

#### event

Type: `String`  
*Required*

Event to unsubscribe from.

### `.destroy()`

Destroy/unsubscribe from all events.

## Examples

Initialization.

```js
var PubSub = require('kist-pubsub');
var pubsub = new PubSub({
	event: true,
	queue: false,
	namespace: 'appNs'
});
```

Trigger event with specific data.

```js
pubsub.publish('foo.bar', 1);
pubsub.publish('foo.bar', 'foobar');
pubsub.publish('foo.bar', ['foo', 'bar']);
pubsub.publish('foo.bar', {'foo':'bar'});
```

Subscribe to event `foo.bar`.

```js
pubsub.subscribe('foo.bar', function ( e, arg1, arg2 ) {});
pubsub.subscribe('foo.bar', function ( e, arg1, arg2 ) {}, function () {
	if ( condition ) {
		return true;
	}
	return false;
});
```

Subscribe only once to event `foo.bar`.

```js
pubsub.subscribeOnce('foo.bar', function ( e, arg1, arg2 ) {});
pubsub.subscribeOnce('foo.bar', function ( e, arg1, arg2 ) {}, function () {
	if ( condition ) {
		return true;
	}
	return false;
});
```

Unsubscribe from event `foo.bar`.

```js
pubsub.unsubscribe('foo.bar');
```

Destroy/unsubscribe from all events.

```js
pubsub.destroy();
```

### AMD and global

```js
define(['kist-pubsub'], cb);

window.$.kist.PubSub;
```

## Browser support

Tested in IE8+ and all modern browsers.

## Acknowledgments

Plugin is based on [jQuery tiny pub/sub](https://github.com/cowboy/jquery-tiny-pubsub) but implements some options available either in previous versions or from community contributions.

* [Event argument removal](https://gist.github.com/661855/2c518edd29b744d04bff55ec9a2a5d12afe41595)
* [Queue system](https://gist.github.com/661855/2c518edd29b744d04bff55ec9a2a5d12afe41595#comment-586453)

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)
