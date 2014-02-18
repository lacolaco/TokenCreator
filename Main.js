var Main;
(function (Main) {
    var Controller = (function () {
        function Controller($window, $scope, $http) {
            this.httpService = $http;
            var controller = this;
            $scope.consumerKey = "";
            $scope.consumerSecret = "";
            $scope.pinCode = "";

            $scope.openURL = function () {
                if ($scope.consumerKey == "" || $scope.consumerSecret == "") {
                    $window.alert("consumer Key/Secret are empty");
                } else {
                    var key = $scope.consumerKey;
                    var secret = $scope.consumerSecret;
                    controller.httpService.get("./api/tokens?consumerKey=" + key + "&consumerSecret=" + secret).success(function (data, status) {
                        controller.oauthSession = data;
                        $window.open(data.AuthorizeUri, "_blank");
                    });
                }
            };

            $scope.getToken = function () {
                if ($scope.pinCode == "") {
                    $window.alert("input PIN");
                } else if (controller.oauthSession == null) {
                    $window.alert("do after authorize");
                } else {
                    var pinCode = $scope.pinCode;
                    var token = controller.oauthSession.SessionToken;
                    var promise = controller.httpService.get("./api/tokens?sessionToken=" + token + "&pinCode=" + pinCode).success(function (data, status) {
                        if (data == null) {
                            $window.alert("error");
                        } else {
                            $scope.token = data;
                        }
                    });
                }
            };
        }
        return Controller;
    })();
    Main.Controller = Controller;
})(Main || (Main = {}));
