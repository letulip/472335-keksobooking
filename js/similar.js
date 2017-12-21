'use strict';

window.similar = function () {
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
    var filtered = filterAdverts(adverts);
    window.fillAdvertTemplate.fillFragment(filtered);
    window.util.popupsHide();
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
    adverts.filter(isType).filter(isPrice).filter(isRooms).filter(isGuests).filter(isWifi).filter(isDishwasher).filter(isParking).filter(isWasher).filter(isElevator).filter(isConditioner);
    return adverts;
  }

  function isWifi(obj) {
    var filterType = mapFilters.querySelector('#filter-wifi');
    if (!filterType.checked) {
      return true;
    }
    return filterType.checked && obj.offer.features.includes(filterType.value);
  }

  function isDishwasher(obj) {
    var filterType = mapFilters.querySelector('#filter-dishwasher');
    if (!filterType.checked) {
      return true;
    }
    return filterType.checked && obj.offer.features.includes(filterType.value);
  }

  function isParking(obj) {
    var filterType = mapFilters.querySelector('#filter-parking');
    if (!filterType.checked) {
      return true;
    }
    return filterType.checked && obj.offer.features.includes(filterType.value);
  }

  function isWasher(obj) {
    var filterType = mapFilters.querySelector('#filter-washer');
    if (!filterType.checked) {
      return true;
    }
    return filterType.checked && obj.offer.features.includes(filterType.value);
  }

  function isElevator(obj) {
    var filterType = mapFilters.querySelector('#filter-elevator');
    if (!filterType.checked) {
      return true;
    }
    return filterType.checked && obj.offer.features.includes(filterType.value);
  }

  function isConditioner(obj) {
    var filterType = mapFilters.querySelector('#filter-conditioner');
    if (!filterType.checked) {
      return true;
    }
    return filterType.checked && obj.offer.features.includes(filterType.value);
  }

  function isGuests(value) {
    var filterType = mapFilters.querySelector('#housing-guests');
    if (filterType.value === filtersDefault) {
      return true;
    }
    return filterType.value === value.offer.guests.toString();
  }

  function isRooms(value) {
    var filterType = mapFilters.querySelector('#housing-rooms');
    if (filterType.value === filtersDefault) {
      return true;
    }
    return filterType.value === value.offer.rooms.toString();
  }

  function isType(value) {
    var filterType = mapFilters.querySelector('#housing-type');
    if (filterType.value === filtersDefault) {
      return true;
    }
    return filterType.value === value.offer.type;
  }

  function isPrice(value) {
    var filterPrice = mapFilters.querySelector('#housing-price');
    if (filterPrice.value === filtersDefault) {
      return true;
    }
    return filterPrice.value === priceValue(value.offer.price);
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
    } else {
      return filtersDefault;
    }
  }

  function getRank(advert) {
    var rank = 0;

    if (advert.offer.type === filtersType) {
      rank += 5;
    }
    if (priceRange(advert.offer.price)) {
      rank += 4;
    }
    if (advert.offer.rooms === filtersRooms) {
      rank += 3;
    }
    if (advert.offer.guests >= filtersGuests) {
      rank += 2;
    }
    filtersFeatures.forEach(function (feature) {
      if (advert.offer.features.includes(feature)) {
        rank += 1;
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
    updateAdverts(adverts);
    window.util.popupsHide();
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
