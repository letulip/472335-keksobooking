'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var type = filters.querySelector('#housing-type');
  var price = filters.querySelector('#housing-price');
  var rooms = filters.querySelector('#housing-rooms');
  var guests = filters.querySelector('#housing-guests');
  var features = filters.querySelector('#housing-features');
  var advert = {
    onTypeChange: function () {},
    onPriceChange: function () {},
    onRoomsChange: function () {},
    onGuestsChange: function () {},
    onFeaturesChange: function () {}
  };

  type.addEventListener('change', function () {
    console.log('type changed');
  });
  price.addEventListener('change', function () {
    console.log('price changed');
  });
  rooms.addEventListener('change', function () {
    console.log('rooms changed');
  });
  guests.addEventListener('change', function () {
    console.log('guests changed');
  });
  features.addEventListener('change', function () {
    console.log('features changed');
  });
})();
