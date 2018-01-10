'use strict';

(function () {
  window.restoreForm = function () {
    var DEFAULT_TYPE = 'flat';
    var DEFAULT_TIME = '12:00';
    var DEFAULT_ROOM = '1';
    var DEFAULT_GUEST = '1';
    var DEFAULT_PRICE = '1000';
    var form = document.querySelector('.notice__form');
    var title = form.querySelector('#title');
    title.value = '';
    window.setAddress();
    var type = form.querySelector('#type');
    type.value = DEFAULT_TYPE;
    var price = form.querySelector('#price');
    price.value = DEFAULT_PRICE;
    var timeIn = form.querySelector('#timein');
    timeIn.value = DEFAULT_TIME;
    var timeOut = form.querySelector('#timeout');
    timeOut.value = DEFAULT_TIME;
    var roomNumber = form.querySelector('#room_number');
    roomNumber.value = DEFAULT_ROOM;
    var roomCapacity = form.querySelector('#capacity');
    roomCapacity.value = DEFAULT_GUEST;
    var description = form.querySelector('#description');
    description.value = '';

    window.formValidation.formCheck();
  };
})();
