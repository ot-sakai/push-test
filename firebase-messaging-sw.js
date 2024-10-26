// Push通知を受け取ると呼ばれる
self.addEventListener('push', function (event) {
    // メッセージを表示する
    var data = {};
    if (event.data) {
      data = event.data.json();
    }
    var title = data.notification.title;
    var message = data.notification.body;
    event.waitUntil(
      self.registration.showNotification(title, {
        'body': message
      })
    );
});
