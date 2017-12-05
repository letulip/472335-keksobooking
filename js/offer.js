'use strict';

window.offer = (function () {
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var location;
  var types = ['flat', 'house', 'bungalo'];
  var rooms;
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  return {
    createOffer: function () {
      var offer = {
        title: getRandomTitle(),
        address: getAddress(getLocation()),
        price: getPrice(),
        type: getType(),
        rooms: getNumberOfRooms(),
        guests: getNumberOfGuests(),
        checkin: getCheckIn(),
        checkout: getCheckOut(),
        features: getRandomFeatures(),
        description: '',
        photos: []
      };

      function Offer(offerParams) {
        this.title = offerParams.title;
        this.address = offerParams.address;
        this.price = offerParams.price;
        this.type = offerParams.type;
        this.rooms = offerParams.rooms;
        this.guests = offerParams.guests;
        this.checkin = offerParams.checkin;
        this.checkout = offerParams.checkout;
        this.features = offerParams.features;
        this.description = offerParams.description;
        this.photos = offerParams.photos;
      }

      function getLocation() {
        var minAreaX = 300;
        var maxAreaX = 900;
        var minAreaY = 100;
        var maxAreaY = 500;
        location = new Location(window.util.getRandomInt(minAreaX, maxAreaX), window.util.getRandomInt(minAreaY, maxAreaY));
        return location;
      }

      function getAddress(locationCoords) {
        return locationCoords.x + ', ' + locationCoords.y;
      }

      function getPrice() {
        var minPrice = 1000;
        var maxPrice = 1000000;
        return window.util.getRandomInt(minPrice, maxPrice);
      }

      function getType() {
        var type = types[window.util.getRandomInt(0, types.length)];
        if (type === 'flat') {
          return 'Квартира';
        } else if (type === 'house') {
          return 'Дом';
        } else {
          return 'Бунгало';
        }
      }

      function getNumberOfRooms() {
        var minRooms = 1;
        var maxRooms = 5;
        rooms = window.util.getRandomInt(minRooms, maxRooms);
        return rooms;
      }

      function getNumberOfGuests() {
        var guestByRoom = 2;
        return rooms * guestByRoom;
      }

      function getCheckIn() {
        return checkins[window.util.getRandomInt(0, checkins.length)];
      }

      function getCheckOut() {
        return checkouts[window.util.getRandomInt(0, checkouts.length)];
      }

      function Location(x, y) {
        this.x = x;
        this.y = y;
      }

      function getRandomTitle() {
        return titles[window.util.getRandomInt(0, titles.length)];
      }

      function getRandomFeatures() {
        var currentOfferFeatures = [];
        for (var i = 0; i < window.util.getRandomInt(1, features.length); i++) {
          currentOfferFeatures.push(features[window.util.getRandomInt(0, features.length)]);
        }
        return currentOfferFeatures;
      }

      return new Offer(offer);
    },
    getOfferLocation: function () {
      return location;
    }
  };
})();
