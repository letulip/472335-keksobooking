'use strict';

window.similar = function () {
  var loadPath = 'https://1510.dump.academy/keksobooking';
  var noticeForm = document.querySelector('.notice__form');

  function successHandler(advertsArray) {
    window.fillAdvertTemplate.fillFragment(advertsArray);
    window.util.popupsHide();
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend.load(loadPath, successHandler, errorHandler);

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), function () {
      window.restoreForm();
    }, errorHandler);
    evt.preventDefault();
  });
};
