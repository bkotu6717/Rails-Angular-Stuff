app.controller('actorCtrl', function($scope, $log, uiUploader) {
  $scope.btn_remove = function(file) {
    $log.info('deleting=' + file);
    uiUploader.removeFile(file);
  };

  $scope.btn_clean = function() {
    uiUploader.removeAll();
  };

  $scope.btn_upload = function() {
    $log.info('uploading...');
    uiUploader.startUpload({
      url: '/actors',
      concurrency: 2,
      onProgress: function(file) {
          $log.info(file.name + '=' + file.humanSize);
          $scope.$apply();
      },
      onCompleted: function(file, response) {
          $log.info(file + 'response' + response);
      }
    });
  };

  $scope.files = [];
  var element = document.getElementById('file1');
  if (element){
    element.addEventListener('change', function(e) {
      var files = e.target.files;
      uiUploader.addFiles(files);
      $scope.files = uiUploader.getFiles();
      $scope.$apply();
    });
  }

  $scope.w = window.innerWidth;
  $scope.h = window.innerHeight-20;
  $scope.uri = "http://lorempixel.com";
  $scope.folders = [
    'animals',
    'business',
    'cats',
    'city',
    'food',
    'night',
    'life',
    'fashion',
    'people',
    'nature',
    'sports',
    'technics',
    'transport'
  ];
  $scope.images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  $scope.currentFolder = $scope.folders[0];
  $scope.selectFolder = function (folder) {
    $scope.currentFolder = folder;
  };
  $scope.activeFolder = function (folder) {
    return (folder === $scope.currentFolder) ? 'active' : '';
  };

});