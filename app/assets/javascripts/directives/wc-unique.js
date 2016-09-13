app.directive('wcUnique', ['dataService', function (dataService) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ngModel) {
			element.bind('blur', function (e) {
				if (!ngModel || !element.val()) return;
				var keyProperty = scope.$eval(attrs.wcUnique);
				var currentValue = element.val();
				dataService.checkUniqueValue(currentValue)
					.then(function (unique) {
							if (currentValue == element.val()) { 
									ngModel.$setValidity('unique', unique);
							}
					}, function () {
							ngModel.$setValidity('unique', true);
					});
			});
		}
	}
}]);