angular.module('metro', [])
.controller('metroController', ['$scope', '$http', function metroController ($scope, $http) {

    $scope.metro = {}
    $scope.fullMetro = {}
    $scope.start
    $scope.finish
    $scope.allVariants = {}

    $http.get('../../metro.json')
        .then (function (response) {

            $scope.fullMetro = response.data

            $scope.fullMetro.forEach(line =>
            line.stations.forEach(item => $scope.metro[item.station] = item.station))
            $scope.metro = Object.keys($scope.metro).map(station => ({station}))
        })


    $scope.endStation = function(station) {

        $scope.endMetro = {}
        $scope.start = station

        for (let i = 0; i < $scope.fullMetro.length; i++) {
            for (let j = 0; j < $scope.fullMetro[i].stations.length; j++) {
                if ($scope.fullMetro[i].stations[j].station === $scope.start) {
                    for (let m = j; m < $scope.fullMetro[i].stations.length; m++) {
                        $scope.endMetro[$scope.fullMetro[i].stations[m].station] = $scope.fullMetro[i].stations[m].station
                    }
                    // $scope.fullMetro[i].stations.forEach(item => $scope.endMetro[item.station] = item.station)
                }
            }
        }
        $scope.endMetro = Object.keys($scope.endMetro).map(station => ({station}))
    }


    $scope.minWay = function (station) {

        $scope.finish = station
        $scope.min = 99999
        $scope.optimalWay = ""

        for (let i = 0; i < $scope.fullMetro.length; i++) {
            for (let j = 0; j < $scope.fullMetro[i].stations.length; j++) {
                if ($scope.fullMetro[i].stations[j].station === $scope.start) {
                    $scope.fullMetro[i].stations.forEach((item, num) => {
                    if (item.station === $scope.finish)
                        $scope.foo = 0

                    for (let m = j; m < num; m++) {
                            $scope.foo += $scope.fullMetro[i].stations[m].lengthLine
                        }
                })
                    $scope.allVariants[$scope.fullMetro[i].name] = $scope.foo
                }
            }
        }
        for (let keys in $scope.allVariants) {
            if ($scope.min > $scope.allVariants[keys]) {
                $scope.min = $scope.allVariants[keys];
                $scope.optimalWay = keys;
            }
        }
    }


    $scope.restart = function () {
        $scope.endMetro = ""
        $scope.optimalWay = ""
    }
}])