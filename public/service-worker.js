self.addEventListener('push', function (event) {
  event.waitUntil(
    self.registration.showNotification('focusMe', {
      body: 'Testando...',
    })
  );
});
