'use strict';

(function () {
  window.formValidation = {
    formCheck: function () {
      var TIME_INS = ['12:00', '13:00', '14:00'];
      var TIME_OUTS = ['12:00', '13:00', '14:00'];
      var TYPES = ['flat', 'bungalo', 'house', 'palace'];
      var PRICES_MIN = [1000, 0, 5000, 10000];
      var PRICE_FLAT = 1000;
      var PRICE_MAX = 1000000;
      var ROOM_MAX = '100';
      var CAPACITY_MIN = '0';
      var VALUE_DEFAULT = '1';
      var MIN_LENGTH = 30;
      var MAX_LENGTH = 100;
      var ACTION_URL = 'https://js.dump.academy/keksobooking';
      var form = document.querySelector('.notice__form');
      var formAddress = form.querySelector('#address');
      var formTitle = form.querySelector('#title');
      var formPrice = form.querySelector('#price');
      var formTimeIn = form.querySelector('#timein');
      var formTimeOut = form.querySelector('#timeout');
      var formType = form.querySelector('#type');
      var formRooms = form.querySelector('#room_number');
      var formCapacity = form.querySelector('#capacity');

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
        window.synchronizeFields(formType, formPrice, TYPES, PRICES_MIN, setMinAttribute);
      });

      formTimeIn.addEventListener('change', function () {
        window.synchronizeFields(formTimeIn, formTimeOut, TIME_INS, TIME_OUTS, setValue);
      });

      formTimeOut.addEventListener('change', function () {
        window.synchronizeFields(formTimeOut, formTimeIn, TIME_OUTS, TIME_INS, setValue);
      });

      formRooms.addEventListener('change', function () {
        formCapacity.value = formRooms.value === ROOM_MAX
          ? CAPACITY_MIN
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

      function setValuesDisabled(defaultValue) {
        switch (defaultValue) {
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

      setAttribute(form, 'action', ACTION_URL);
      setReadOnlyField(formAddress);
      setRequiredField(formTitle);
      setAttribute(formTitle, 'MIN_LENGTH', MIN_LENGTH);
      setAttribute(formTitle, 'maxlength', MAX_LENGTH);
      setRequiredField(formPrice);
      setAttribute(formPrice, 'min', PRICE_FLAT);
      setAttribute(formPrice, 'value', PRICE_FLAT);
      setAttribute(formPrice, 'max', PRICE_MAX);
      setValue(formCapacity, VALUE_DEFAULT);
      setValuesDisabled(VALUE_DEFAULT);
    }
  };
})();
