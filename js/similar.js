'use strict';

(function () {
  window.similar = function () {
    var loadPath = 'https://1510.dump.academy/keksobooking';
    var noticeForm = document.querySelector('.notice__form');
    var mapFilters = document.querySelector('.map__filters');
    var filtersDefault = 'any';
    var filtersPrice;
    var lowPrice = 'low';
    var lowPriceValue = 10000;
    var middlePrice = 'middle';
    var highPrice = 'high';
    var highPriceValue = 50000;
    var adverts = [];

    window.advert.onTypeChange = function () {
      window.util.debounce(updateAdverts);
    };

    window.advert.onPriceChange = function () {
      window.util.debounce(updateAdverts);
    };

    window.advert.onRoomsChange = function () {
      window.util.debounce(updateAdverts);
    };

    window.advert.onGuestsChange = function () {
      window.util.debounce(updateAdverts);
    };

    window.advert.onFeaturesChange = function () {
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
      var filterType = mapFilters.querySelector('#filter-wifi');
      return isCheckedIncludes(filterType, obj);
    }

    function isDishwasher(obj) {
      var filterType = mapFilters.querySelector('#filter-dishwasher');
      return isCheckedIncludes(filterType, obj);
    }

    function isParking(obj) {
      var filterType = mapFilters.querySelector('#filter-parking');
      return isCheckedIncludes(filterType, obj);
    }

    function isWasher(obj) {
      var filterType = mapFilters.querySelector('#filter-washer');
      return isCheckedIncludes(filterType, obj);
    }

    function isElevator(obj) {
      var filterType = mapFilters.querySelector('#filter-elevator');
      return isCheckedIncludes(filterType, obj);
    }

    function isConditioner(obj) {
      var filterType = mapFilters.querySelector('#filter-conditioner');
      return isCheckedIncludes(filterType, obj);
    }

    function isChecked(filterType, value) {
      return filterType.value === filtersDefault || filterType.value === value;
    }

    function isGuests(value) {
      var filterType = mapFilters.querySelector('#housing-guests');
      return isChecked(filterType, value.offer.guests.toString());
    }

    function isRooms(value) {
      var filterType = mapFilters.querySelector('#housing-rooms');
      return isChecked(filterType, value.offer.rooms.toString());
    }

    function isType(value) {
      var filterType = mapFilters.querySelector('#housing-type');
      return isChecked(filterType, value.offer.type);
    }

    function isPrice(value) {
      var filterType = mapFilters.querySelector('#housing-price');
      return isChecked(filterType, priceValue(value.offer.price));
    }

    function priceValue(price) {
      if (price <= lowPriceValue && filtersPrice === lowPrice) {
        return lowPrice;
      }
      if (price >= lowPriceValue && price <= highPriceValue && filtersPrice === middlePrice) {
        return middlePrice;
      }
      if (price >= highPriceValue && filtersPrice === highPrice) {
        return highPrice;
      }
      return filtersDefault;
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
    }

    window.backend.load(loadPath, successHandler, errorHandler);

    noticeForm.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(noticeForm), function () {
        window.restoreForm();
      }, errorHandler);
      evt.preventDefault();
    });
  };
})();
