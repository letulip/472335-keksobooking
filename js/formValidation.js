'use strict';

(function () {
  window.formValidation = {
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
      var timeIns = ['12:00', '13:00', '14:00'];
      var timeOuts = ['12:00', '13:00', '14:00'];
      var types = ['flat', 'bungalo', 'house', 'palace'];
      var pricesMin = [1000, 0, 5000, 10000];
      var priceFlat = 1000;
      var priceMax = 1000000;
      var roomsMax = '100';
      var capacityMin = '0';
      var capacityDefault = '1';
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
        window.synchronizeFields(formType, formPrice, types, pricesMin, setMinAttribute);
      });

      formTimeIn.addEventListener('change', function () {
        window.synchronizeFields(formTimeIn, formTimeOut, timeIns, timeOuts, setValue);
      });

      formTimeOut.addEventListener('change', function () {
        window.synchronizeFields(formTimeOut, formTimeIn, timeOuts, timeIns, setValue);
      });

      formRooms.addEventListener('change', function () {
        formCapacity.value = formRooms.value === roomsMax
          ? capacityMin
          : formRooms.value;
        deleteValuesDisabled(formCapacity);
        setValuesDisabled(formRooms.value);
      });

      function setRequiredField(fieldId) {
        fieldId.required = true;
      }

      function setReadOnlyField(fieldId) {
        fieldId.readOnly = true;
      }

      function setAttribute(fieldId, attributeName, attributeValue) {
        fieldId.setAttribute(attributeName, attributeValue);
      }

      function removeAttribute(fieldId, attributeName, attributeValue) {
        fieldId.removeAttribute(attributeName, attributeValue);
      }

      function setMinAttribute(fieldId, attributeValue) {
        fieldId.min = attributeValue;
      }

      function setValue(field, value) {
        field.value = value;
      }

      function deleteValuesDisabled(fieldId) {
        for (var i = 0; i < fieldId.options.length; i++) {
          removeAttribute(fieldId.options[i], 'disabled');
        }
      }

      function setValuesDisabled(value1) {
        switch (value1) {
          case formCapacity.options[0].value:
            setAttribute(formCapacity.options[3], 'disabled');
            break;
          case formCapacity.options[1].value:
            setAttribute(formCapacity.options[0], 'disabled');
            setAttribute(formCapacity.options[3], 'disabled');
            break;
          case formCapacity.options[2].value:
            setAttribute(formCapacity.options[0], 'disabled');
            setAttribute(formCapacity.options[1], 'disabled');
            setAttribute(formCapacity.options[3], 'disabled');
            break;
          default:
            setAttribute(formCapacity.options[0], 'disabled');
            setAttribute(formCapacity.options[1], 'disabled');
            setAttribute(formCapacity.options[2], 'disabled');
        }
      }

      setAttribute(form, 'action', actionUrl);
      setReadOnlyField(formAddress);
      setRequiredField(formTitle);
      setAttribute(formTitle, 'minlength', minLength);
      setAttribute(formTitle, 'maxlength', maxLenght);
      setRequiredField(formPrice);
      setAttribute(formPrice, 'min', priceFlat);
      setAttribute(formPrice, 'value', priceFlat);
      setAttribute(formPrice, 'max', priceMax);
      setValue(formCapacity, capacityDefault);
      setValuesDisabled('1');
    }
  };
})();
