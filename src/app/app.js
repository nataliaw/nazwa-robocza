/**
 * Created by ewelinaczarny on 23.11.14.
 */

var app = angular
  .module('nrApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ]).constant('FIREBASE_URL', 'https://nazwa-robocza.firebaseio.com/');