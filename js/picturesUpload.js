'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarUploader = document.querySelector('.notice__photo .upload');
  avatarUploader.style.position = 'relative';
  var avatarChooser = document.querySelector('#avatar');
  avatarChooser.style.left = 0;
  avatarChooser.style.opacity = 0;
  avatarChooser.style.height = '100%';
  var photoContainer = document.querySelector('.form__photo-container');
  var list = document.createElement('ul');
  list.style.display = 'flex';
  list.style.listStyle = 'none';
  list.classList.add('advert-photos');
  photoContainer.appendChild(list);
  var advertPhotos = photoContainer.querySelector('.advert-photos');
  var uploadPhotos = document.querySelector('.form__photo-container .upload');
  uploadPhotos.style.position = 'relative';
  var imagesChooser = document.querySelector('#images');
  imagesChooser.style.left = 0;
  imagesChooser.style.opacity = 0;
  imagesChooser.style.height = '100%';
  imagesChooser.style.width = '100%';
  var preview = document.querySelector('.notice__preview img');

  avatarChooser.addEventListener('change', upload);
  imagesChooser.addEventListener('change', uploadPhoto);

  function upload() {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarRender(reader);
      });

      reader.readAsDataURL(file);
    }
  }

  function avatarRender(reader) {
    preview.src = reader.result;
  }

  function advertPhotoRender(reader, height, width) {
    var li = document.createElement('li');
    var img = new Image();
    img.style.width = width + 'px';
    img.style.height = height + 'px';
    advertPhotos.appendChild(li).appendChild(img).src = reader.result;
  }

  function uploadPhoto() {
    var file = imagesChooser.files[0];
    var fileName = file.name.toLowerCase();
    var imgWidth = 50;
    var imgHeight = 70;

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        advertPhotoRender(reader, imgHeight, imgWidth);
      });

      reader.readAsDataURL(file);
    }
  }
})();
