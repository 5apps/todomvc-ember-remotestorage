window.Todos = Ember.Application.create({
  ready: function() {
    window.addEventListener('load', function() {
      new FastClick(document.body);
    }, false);
  }
});


if (window.location.hash.match(/#access_token=.+/)) {
  Todos.deferReadiness();
}

remoteStorage.claimAccess({ tasks: 'rw' }).then(function() {
  remoteStorage.on('ready', function() {
    console.log("widget ready");

    Todos.advanceReadiness();
  });

  remoteStorage.on('disconnect', function() {
    var router = Todos.Router.router;
    router.getHandler().controllerFor('todos').set('content', []);
    router.transitionTo('todos.index');
  });

  remoteStorage.displayWidget('rs-widget', { redirectUri: window.location.href });
});
