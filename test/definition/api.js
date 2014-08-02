var pubsub = new $.kist.PubSub({
	event: true,
	queue: false,
	namespace: ''
});

pubsub.publish('foo.bar', 1);
pubsub.publish('foo.bar', 'foobar');
pubsub.publish('foo.bar', ['foo', 'bar']);
pubsub.publish('foo.bar', {'foo':'bar'});

pubsub.subscribe('foo.bar', function ( e, data ) {

});

pubsub.subscribeOnce('foo.bar', function ( e, data ) {

});

pubsub.unsubscribe('foo.bar');
