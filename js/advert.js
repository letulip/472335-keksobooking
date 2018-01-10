'use strict';

(function () {
  var filters = document.querySelectorAll('.map__filter');
  var feature = document.querySelector('#housing-features');
  var elements = feature.querySelectorAll('input[type=checkbox]');
  var newFeatures = [];
  var advert = {
    onTypeChange: function () {},
    onPriceChange: function () {},
    onRoomsChange: function () {},
    onGuestsChange: function () {},
    onFeaturesChange: function () {}
  };

  filters.forEach(function (item) {
    item.addEventListener('change', function () {
      var newItem = item.value;
      switch (item.id) {
        case 'housing-type':
          advert.onTypeChange(newItem);
          break;
        case 'housing-price':
          advert.onPriceChange(newItem);
          break;
        case 'housing-rooms':
          advert.onRoomsChange(newItem);
          break;
        case 'housing-guests':
          advert.onGuestsChange(newItem);
          break;
        default:

      }
    });
  });

  feature.addEventListener('change', function () {
    elements.forEach(checkFeatures);
    advert.onFeaturesChange(newFeatures);
  });

  function checkFeatures(element) {
    if (element.checked && !newFeatures.includes(element.value)) {
      newFeatures.push(element.value);
    }
    if (!element.checked && newFeatures.includes(element.value)) {
      newFeatures.splice(newFeatures.indexOf(element.value), 1);
    }
  }

  window.advert = advert;
})();
