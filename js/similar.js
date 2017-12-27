'use strict';

(function () {
  window.similar = function () {
    var RANK_VALUE = 5;
    var loadPath = 'https://1510.dump.academy/keksobooking';
    var noticeForm = document.querySelector('.notice__form');
    var mapFilters = document.querySelector('.map__filters');
    var filtersType;
    var filtersDefault = 'any';
    var filtersPrice;
    var lowPrice = 'low';
    var lowPriceValue = 10000;
    var middlePrice = 'middle';
    var highPrice = 'high';
    var highPriceValue = 50000;
    var filtersRooms;
    var filtersGuests;
    var filtersFeatures = [];
    var adverts = [];

    window.advert.onTypeChange = function (type) {
      filtersType = type;
      window.util.debounce(updateAdverts);
    };

    window.advert.onPriceChange = function (price) {
      filtersPrice = price;
      window.util.debounce(updateAdverts);
    };

    window.advert.onRoomsChange = function (rooms) {
      filtersRooms = parseInt(rooms, 10);
      window.util.debounce(updateAdverts);
    };

    window.advert.onGuestsChange = function (guests) {
      filtersGuests = parseInt(guests, 10);
      window.util.debounce(updateAdverts);
    };

    window.advert.onFeaturesChange = function (features) {
      filtersFeatures = features;
      window.util.debounce(updateAdverts);
    };

    function updateAdverts() {
      sortAdverts();
      var filtered = filterAdverts();
      window.fillAdvertTemplate.fillFragment(filtered);
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      mapPins.forEach(function (pin) {
        pin.addEventListener('click', function (evt) {
          window.card.showPopup(evt);
        });
      });
    }

    function sortAdverts() {
      adverts.sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = featuresComparator(left.offer.features, right.offer.features);
        }
        return rankDiff;
      });
    }

    function filterAdverts() {
      return adverts.filter(function (item) {
        return isType(item) && isPrice(item) && isRooms(item) && isGuests(item) && isWifi(item) && isDishwasher(item) && isParking(item) && isWasher(item) && isElevator(item) && isConditioner(item);
      });
    }

    function isCheckedIncludes(filterType, obj) {
      if (!filterType.checked) {
        return true;
      }
      return filterType.checked && obj.offer.features.includes(filterType.value);
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
      if (filterType.value === filtersDefault) {
        return true;
      }
      return filterType.value === value;
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

    function getRank(advert) {
      var rank = 0;

      if (advert.offer.type === filtersType) {
        rank += RANK_VALUE;
      }
      if (priceRange(advert.offer.price)) {
        rank += RANK_VALUE;
      }
      if (advert.offer.rooms === filtersRooms) {
        rank += RANK_VALUE;
      }
      if (advert.offer.guests >= filtersGuests) {
        rank += RANK_VALUE;
      }
      filtersFeatures.forEach(function (feature) {
        if (advert.offer.features.includes(feature)) {
          rank += RANK_VALUE;
        }
      });
      return rank;
    }

    function priceRange(price) {
      if (filtersPrice === lowPrice) {
        return price <= lowPriceValue;
      }
      if (filtersPrice === middlePrice) {
        return price > lowPriceValue && price <= highPriceValue;
      }
      if (filtersPrice === highPrice) {
        return price >= highPriceValue;
      }
      return false;
    }

    function featuresComparator(left, right) {
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        return 0;
      }
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
