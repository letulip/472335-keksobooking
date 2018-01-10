'use strict';

(function () {
  var FILTER_DEFAULT = 'any';
  var LOW_PRICE = 'low';
  var LOW_PRICE_VALUE = 10000;
  var MIDDLE_PRICE = 'middle';
  var HIGH_PRICE = 'high';
  var HIGH_PRICE_VALUE = 50000;
  var URL_PATH = 'https://1510.dump.academy/keksobooking';
  var filterPrice;
  var noticeForm = document.querySelector('.notice__form');
  var mapFilter = document.querySelector('.map__filters');
  var guest = mapFilter.querySelector('#housing-guests');
  var room = mapFilter.querySelector('#housing-rooms');
  var type = mapFilter.querySelector('#housing-type');
  var price = mapFilter.querySelector('#housing-price');
  var adverts = [];
  var advert = {
    onFilterChange: function () {}
  };

  mapFilter.addEventListener('change', function () {
    advert.onFilterChange();
  });

  window.advert = advert;

  window.findSimilar = function () {
    window.advert.onFilterChange = function () {
      window.util.debounce(updateAdverts);
    };

    function updateAdverts() {
      window.fillAdvertTemplate.fillFragment(filterAdverts());
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      mapPins.forEach(function (pin) {
        pin.addEventListener('click', function (evt) {
          window.card.showPopup(evt);
        });
      });
    }

    function filterAdverts() {
      return adverts.filter(function (item) {
        return isType(item)
          && isPrice(item)
          && isRooms(item)
          && isGuests(item)
          && isWifi(item)
          && isDishwasher(item)
          && isParking(item)
          && isWasher(item)
          && isElevator(item)
          && isConditioner(item);
      });
    }

    function isCheckedIncludes(filterType, obj) {
      return !filterType.checked || filterType.checked && obj.offer.features.includes(filterType.value);
    }

    function isWifi(obj) {
      var filterType = mapFilter.querySelector('#filter-wifi');
      return isCheckedIncludes(filterType, obj);
    }

    function isDishwasher(obj) {
      var filterType = mapFilter.querySelector('#filter-dishwasher');
      return isCheckedIncludes(filterType, obj);
    }

    function isParking(obj) {
      var filterType = mapFilter.querySelector('#filter-parking');
      return isCheckedIncludes(filterType, obj);
    }

    function isWasher(obj) {
      var filterType = mapFilter.querySelector('#filter-washer');
      return isCheckedIncludes(filterType, obj);
    }

    function isElevator(obj) {
      var filterType = mapFilter.querySelector('#filter-elevator');
      return isCheckedIncludes(filterType, obj);
    }

    function isConditioner(obj) {
      var filterType = mapFilter.querySelector('#filter-conditioner');
      return isCheckedIncludes(filterType, obj);
    }

    function isChecked(filterType, value) {
      return filterType.value === FILTER_DEFAULT || filterType.value === value;
    }

    function isGuests(value) {
      return isChecked(guest, value.offer.guests.toString());
    }

    function isRooms(value) {
      return isChecked(room, value.offer.rooms.toString());
    }

    function isType(value) {
      return isChecked(type, value.offer.type);
    }

    function isPrice(value) {
      return isChecked(price, priceValue(value.offer.price));
    }

    function priceValue(value) {
      if (value <= LOW_PRICE_VALUE && filterPrice === LOW_PRICE) {
        return LOW_PRICE;
      }
      if (value >= LOW_PRICE_VALUE && value <= HIGH_PRICE_VALUE && filterPrice === MIDDLE_PRICE) {
        return MIDDLE_PRICE;
      }
      if (value >= HIGH_PRICE_VALUE && filterPrice === HIGH_PRICE) {
        return HIGH_PRICE;
      }
      return FILTER_DEFAULT;
    }

    function successHandler(advertsArray) {
      adverts = advertsArray;
      updateAdverts();
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
      node.addEventListener('click', function () {
        document.body.removeChild(node);
      });
    }

    window.backend.load(URL_PATH, successHandler, errorHandler);

    noticeForm.addEventListener('submit', function (evt) {
      window.form.check();
      window.backend.save(new FormData(noticeForm), function () {
        window.restoreForm();
      }, errorHandler);
      evt.preventDefault();
    });
  };
})();
