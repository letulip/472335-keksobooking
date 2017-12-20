'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var type = filters.querySelector('#housing-type');
  var price = filters.querySelector('#housing-price');
  var rooms = filters.querySelector('#housing-rooms');
  var guests = filters.querySelector('#housing-guests');
  var features = filters.querySelector('#housing-features');
  var newFeatures = [];
  var advert = {
    onTypeChange: function () {},
    onPriceChange: function () {},
    onRoomsChange: function () {},
    onGuestsChange: function () {},
    onFeaturesChange: function () {}
  };

  type.addEventListener('change', function () {
    var newType = type.value;
    advert.onTypeChange(newType);
  });
  price.addEventListener('change', function () {
    var newPrice = price.value;
    advert.onPriceChange(newPrice);
  });
  rooms.addEventListener('change', function () {
    var newRooms = rooms.value;
    advert.onRoomsChange(newRooms);
  });
  guests.addEventListener('change', function () {
    var newGuests = guests.value;
    advert.onGuestsChange(newGuests);
  });
  features.addEventListener('change', function () {
    var elements = features.querySelectorAll('input[type=checkbox]');

    elements.forEach(function (element) {
      if (element.checked && !newFeatures.includes(element.value)) {
        newFeatures.push(element.value);
      }
      if (!element.checked && newFeatures.includes(element.value)) {
        newFeatures.splice(newFeatures.indexOf(element.value), 1);
      }
    });

    advert.onFeaturesChange(newFeatures);
  });

  window.advert = advert;
  return advert;
})();
