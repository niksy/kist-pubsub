// Initialization
var pubsub = new $.kist.PubSub({
	event: true,
	queue: false,
	namespace: ''
});

// Publish
pubsub.publish('foo.bar', 1);
pubsub.publish('foo.bar', 'foobar');
pubsub.publish('foo.bar', ['foo', 'bar']);
pubsub.publish('foo.bar', {'foo':'bar'});

// Subscribe
pubsub.subscribe('foo.bar', function ( e, data ) {

});

// Subscribe once
pubsub.subscribeOnce('foo.bar', function ( e, data ) {

});

// Usubscribe
pubsub.unsubscribe('foo.bar');
