/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * Licensed under MIT (https://github.com/ray023/FindAFit/blob/master/LICENSE)
 * =========================================================================== */
'use strict';

fafApp
    .factory('GoogleMap', function() {
        return {
            getMapData: function(position, boxes) {

                var getDistance = function(position, lat_lon2) {
                    //Haversine Formula:
                    var pi = 3.147;
                    var lat1 = position.coords.latitude;
                    var lon1 = position.coords.longitude;
                    var lat2 = lat_lon2.latitude;
                    var lon2 = lat_lon2.longitude;
                    var R = 6371000; // metres
                    var x1 = lat1 * (3.147/180);
                    var x2 = lat2 * (3.147/180);
                    var lat_rads = (lat2-lat1) * (pi/180);
                    var lon_rads = (lon2-lon1) * (pi/180);

                    var a = Math.sin(lat_rads/2) * Math.sin(lat_rads/2) +
                        Math.cos(x1) * Math.cos(x2) *
                        Math.sin(lon_rads/2) * Math.sin(lon_rads/2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                    return R * c;

                };

                var markerModels = [];

                var homeMarker = {
                    id: -1,
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    title: 'You'
                };
                markerModels.push(homeMarker);

                for(var i = 0; i < boxes.length; i++) {
                    var box = boxes[i];
                    var m = {
                        id: box.af_id,
                        coords: {
                            latitude:   box.latitude,
                            longitude:  box.longitude
                        },
                        title: box.affil_name
                    };
                    markerModels.push(m);

                }

                var lastBox = boxes[boxes.length - 1];
                var distance = getDistance(position, lastBox);
                var map = {
                    center: {
                        latitude:   position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    zoom: 9,
                    markerModels: markerModels
                };

                map.markerModels.forEach(function (m) {
                    m.clicked = function (gMarker, eventName, markerModel) {
                        if(map.windowModel) {
                            map.windowModel.show = false;
                        }
                        markerModel.show = true;
                        map.windowModel = markerModel;
                    }
                });

                var mapCircle = {
                    id: 1,
                    center: {
                        latitude:   position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    radius: distance,
                    stroke: {
                        color: '#08B21F',
                        weight: 2,
                        opacity: 1
                    },
                    fill: {
                        color: '#08B21F',
                        opacity: 0.5
                    },
                    clickable: false
                };

                return  {
                    map: map,
                    mapCircle: mapCircle
                };
            }
        }
    });