'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  }

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (url, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', url + '/data');
      xhr.send();
    }
  };
})();
