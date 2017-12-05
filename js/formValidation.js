'use strict';

window.formValidation = (function () {
  return {
    formCheck: function () {
      var form = document.querySelector('.notice__form');
      var formAddress = form.querySelector('#address');
      var formTitle = form.querySelector('#title');
      var formPrice = form.querySelector('#price');
      var formTimeIn = form.querySelector('#timein');
      var formTimeOut = form.querySelector('#timeout');
      var formType = form.querySelector('#type');
      var formRooms = form.querySelector('#room_number');
      var formCapacity = form.querySelector('#capacity');
      var priceBungalo = 0;
      var priceFlat = 1000;
      var priceHouse = 5000;
      var pricePalace = 10000;
      var priceMax = 1000000;
      var roomsMax = '100';
      var capacityMin = '0';
      var minLength = 30;
      var maxLenght = 100;
      var actionUrl = 'https://js.dump.academy/keksobooking';

      formTitle.addEventListener('invalid', function () {
        if (formTitle.validity.tooShort) {
          formTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
        } else if (formTitle.validity.tooLong) {
          formTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
        } else if (formTitle.validity.valueMissing) {
          formTitle.setCustomValidity('Обязательное поле');
        } else {
          formTitle.setCustomValidity('');
        }
      });

      formType.addEventListener('change', function () {
        switch (formType.value) {
          case 'bungalo':
            setAttribute(formPrice, 'min', priceBungalo);
            break;
          case 'flat':
            setAttribute(formPrice, 'min', priceFlat);
            break;
          case 'house':
            setAttribute(formPrice, 'min', priceHouse);
            break;
          case 'palace':
            setAttribute(formPrice, 'min', pricePalace);
            break;
        }
      });

      formTimeIn.addEventListener('change', function () {
        formTimeOut.value = formTimeIn.value;
      });

      formTimeOut.addEventListener('change', function () {
        formTimeIn.value = formTimeOut.value;
      });

      formRooms.addEventListener('change', function () {
        if (formRooms.value === roomsMax) {
          formCapacity.value = capacityMin;
        } else {
          formCapacity.value = formRooms.value;
        }
      });

      function setRequiredField(fieldId) {
        fieldId.required = true;
        return fieldId;
      }

      function setReadOnlyField(fieldId) {
        fieldId.readOnly = true;
        return fieldId;
      }

      function setAttribute(fieldId, attributeName, attributeValue) {
        return fieldId.setAttribute(attributeName, attributeValue);
      }

      setAttribute(form, 'action', actionUrl);
      setRequiredField(formAddress);
      setReadOnlyField(formAddress);
      setRequiredField(formTitle);
      setAttribute(formTitle, 'minlength', minLength);
      setAttribute(formTitle, 'maxlength', maxLenght);
      setRequiredField(formPrice);
      setAttribute(formPrice, 'min', priceBungalo);
      setAttribute(formPrice, 'value', priceFlat);
      setAttribute(formPrice, 'max', priceMax);
    }
  };
})();
