window.Todos = Ember.Application.create({
  ready: function() {
    window.addEventListener('load', function() {
      new FastClick(document.body);
    }, false);
  }
});

remoteStorage.claimAccess({ tasks: 'rw' }).then(function() {
  remoteStorage.displayWidget('rs-widget', { redirectUri: window.location.origin + '/token.html' });
});
