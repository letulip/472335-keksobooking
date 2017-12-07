'use strict';

window.advertCreation = (function () {
  var adverts = [];
  var numOfAdverts = 8;

  function Advert(author, offer, locationCoords) {
    this.author = author;
    this.offer = offer;
    this.location = locationCoords;
  }

  function Author(avatar) {
    this.avatar = avatar;
  }

  function getAuthor(authorIndex) {
    var avatars = window.avatarCreation.getAvatars();
    return new Author(avatars[authorIndex]);
  }

  return {
    createAdverts: function () {
      for (var i = 0; i < numOfAdverts; i++) {
        adverts.push(new Advert(getAuthor(i), window.offer.createOffer(), window.offer.getOfferLocation()));
      }
      return adverts;
    },
    getNumberOfAdverts: function () {
      return numOfAdverts;
    }
  };
})();
