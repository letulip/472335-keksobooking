'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var type = filters.querySelector('#housing-type');
  var price = filters.querySelector('#housing-price');
  var room = filters.querySelector('#housing-rooms');
  var guest = filters.querySelector('#housing-guests');
  var feature = filters.querySelector('#housing-features');
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
  room.addEventListener('change', function () {
    var newRooms = room.value;
    advert.onRoomsChange(newRooms);
  });
  guest.addEventListener('change', function () {
    var newGuests = guest.value;
    advert.onGuestsChange(newGuests);
  });
  feature.addEventListener('change', function () {
    var elements = feature.querySelectorAll('input[type=checkbox]');

    elements.forEach(checkingFeatures);

    advert.onFeaturesChange(newFeatures);
  });

  function checkingFeatures(element) {
    if (element.checked && !newFeatures.includes(element.value)) {
      newFeatures.push(element.value);
    }
    if (!element.checked && newFeatures.includes(element.value)) {
      newFeatures.splice(newFeatures.indexOf(element.value), 1);
    }
  }

  window.advert = advert;
})();
