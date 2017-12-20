'use strict';

window.similar = function () {
  // var filters = document.querySelector('.map__filters');
  var loadPath = 'https://1510.dump.academy/keksobooking';
  var noticeForm = document.querySelector('.notice__form');
  var filtersType;
  var filtersPrice;
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
    window.fillAdvertTemplate.fillFragment(adverts.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = featuresComparator(left.offer.features, right.offer.features);
      }
      return rankDiff;
    }));
    console.log(adverts);
    window.util.popupsHide();
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
    console.log(rank);
    return rank;
  }

  function priceRange(price) {
    if (filtersPrice === 'low') {
      return price <= 10000;
    }
    if (filtersPrice === 'middle') {
      return price > 10000 && price <= 50000;
    }
    if (filtersPrice === 'high') {
      return price >= 50000;
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
