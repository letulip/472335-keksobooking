'use strict';

window.similar = function () {
  var filters = document.querySelector('.map__filters');
  var loadPath = 'https://1510.dump.academy/keksobooking';
  var noticeForm = document.querySelector('.notice__form');
  var filtersType;
  var adverts = [];

  filters.onTypeChange = function (type) {
    filtersType = type;
    window.util.debounce(updateAdverts);
  };

  function updateAdverts() {
    window.fillAdvertTemplate.fillFragment(adverts.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = pricesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  function getRank(advert) {
    var rank = 0;

    if (advert.type === filtersType) {
      rank += 5;
      console.log(rank);
    }
    return rank;
  }

  function pricesComparator(left, right) {
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
