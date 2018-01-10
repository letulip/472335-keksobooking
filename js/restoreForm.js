'use strict';

(function () {
  var DEFAULT_TYPE = 'flat';
  var DEFAULT_TIME = '12:00';
  var DEFAULT_ROOM = '1';
  var DEFAULT_GUEST = '1';
  var DEFAULT_PRICE = '1000';
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var roomCapacity = form.querySelector('#capacity');
  var description = form.querySelector('#description');

  window.restoreForm = function () {
    title.value = '';
    window.setAddress();
    type.value = DEFAULT_TYPE;
    price.value = DEFAULT_PRICE;
    timeIn.value = DEFAULT_TIME;
    timeOut.value = DEFAULT_TIME;
    roomNumber.value = DEFAULT_ROOM;
    roomCapacity.value = DEFAULT_GUEST;
    description.value = '';

    window.formValidation.formCheck();
  };
})();
