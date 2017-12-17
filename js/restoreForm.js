'use strict';

window.restoreForm = function () {
  var form = document.querySelector('.notice__form');
  var defaultType = 'flat';
  var defaultTime = '12:00';
  var deafaultRooms = '1';
  var defaultGuests = '3';
  var title = form.querySelector('#title');
  title.value = '';
  var address = form.querySelector('#address');
  address.value = '';
  var type = form.querySelector('#type');
  type.value = defaultType;
  var price = form.querySelector('#price');
  price.value = '1000';
  var timeIn = form.querySelector('#timein');
  timeIn.value = defaultTime;
  var timeOut = form.querySelector('#timeout');
  timeOut.value = defaultTime;
  var roomNumber = form.querySelector('#room_number');
  roomNumber.value = deafaultRooms;
  var roomCapacity = form.querySelector('#capacity');
  roomCapacity.value = defaultGuests;
  var description = form.querySelector('#description');
  description.value = '';
};
