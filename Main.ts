/// <reference path="http.d.ts" />
/// <reference path="model.ts" />

module Main {

    export interface Scope {
        consumerKey: string;
        consumerSecret: string;
        pinCode: string;
        token: Model.Token;
        openURL: Function;
        getToken: Function;
    }

    export class Controller {

        private httpService: any;
        private oauthSession: Model.OAuthSession;

        constructor($window: Window, $scope: Scope, $http: any) {
            this.httpService = $http;
            var controller = this;
            $scope.consumerKey = "";
            $scope.consumerSecret = "";
            $scope.pinCode = "";

            $scope.openURL = () => {
                if ($scope.consumerKey == "" || $scope.consumerSecret == "") {
                    $window.alert("consumer Key/Secret are empty");
                }
                else {
                    var key = $scope.consumerKey;
                    var secret = $scope.consumerSecret;
                    controller.httpService.get("./api/tokens?consumerKey=" + key + "&consumerSecret=" + secret)
                        .success((data, status) => {
                            controller.oauthSession = data;
                            $window.open(data.AuthorizeUri, "_blank");
                        });
                }
            };

            $scope.getToken = () => {
                if ($scope.pinCode == "") {
                    $window.alert("input PIN");
                }
                else if (controller.oauthSession == null) {
                    $window.alert("do after authorize");
                }
                else {
                    var pinCode = $scope.pinCode;
                    var token = controller.oauthSession.SessionToken;
                    var promise = controller.httpService.get("./api/tokens?sessionToken=" + token + "&pinCode=" + pinCode)
                        .success((data, status) => {
                            if (data == null) {
                                $window.alert("error");
                            }
                            else {
                                $scope.token = data;
                            }
                        });
                }
            };
        }


    }
}