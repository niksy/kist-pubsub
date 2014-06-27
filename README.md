# kist-pubsub

Simple publish/subscribe system.

## Installation

```sh
bower install niksy/kist-pubsub
```

## API

### `new PubSub(options)`

Returns: `Object`

#### Options

##### `event`

Type: `Boolean`  
Default: `true`

Should subscribed event have event object as first argument in passed callback (same as in standard jQuery event system).

##### `queue`

Type: `Boolean`  
Default: `false`

Should this instance implement queue system. When you subscribe to that specific event at later date, callback with data from already applied callback for that specific event will be activated.

### `publish(event, data)`

Publish data for specific event.

#### event

Type: `String`  
*Required*

Event to publish.

#### data

Type: `Array|Object`  
*Required*

Data to pass via published event. Behaves same as [`trigger` in standard jQuery event system](http://api.jquery.com/trigger/#trigger-event-extraParameters).

### `subscribe(event, callback)`

Subscribe to specific event.

#### event

Type: `String`  
*Required*

Event to subscribe to.

#### callback

Type: `Function`  
Provides: `[Event], ...Arguments`  
*Required*

Callback to run when event is published.

First argument (standard event object) won’t be passed if `event` property inside initialization object is set to `false`.  
List of arguments after that is data passed via published event.

### `unsubscribe(event)`

Unsubscribes from specific event.

#### event

Type: `String`  
*Required*

Event to unsubscribe from.

### `destroy`

Destroy/unsubscribe from all events.

## Examples

### Initalization

```js
var pubsub = new $.kist.PubSub({
	event: true,
	queue: false
});
```

### Usage

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
```

Unsubscribe from event `foo.bar`.

```js
pubsub.unsubscribe('foo.bar');
```

Destroy/unsubscribe from all events.

```js
pubsub.destroy();
```

## Browser support

Tested in IE8+ and all modern browsers.

## Acknowledgments

Plugin is based on [jQuery tiny pub/sub](https://github.com/cowboy/jquery-tiny-pubsub) but implements some options available either in previous versions or from community contributions.

* [Event argument removal](https://gist.github.com/661855/2c518edd29b744d04bff55ec9a2a5d12afe41595)
* [Queue system](https://gist.github.com/661855/2c518edd29b744d04bff55ec9a2a5d12afe41595#comment-586453)

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)
