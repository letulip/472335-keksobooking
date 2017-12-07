'use strict';

window.avatarCreation = (function () {
  var avatars = [];

  return {
    createAvatars: function () {
      for (var i = 1; i <= window.advertCreation.getNumberOfAdverts(); i++) {
        avatars.push('img/avatars/user0' + i + '.png');
      }
    },
    getAvatars: function () {
      return avatars;
    }
  };
})();
