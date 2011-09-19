/**
*    LocationMap.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/


app.views.LocationMap = Ext.extend(Ext.Panel, {

    className: 'LocationMap',

    iconCls: 'bookmarks',
    cls: 'map-panel',
    title: 'Map',
    layout: {
        type: 'fit',
        align: 'stretch'
    },

    initComponent: function() {

        this.markers = new Ext.util.HashMap();

        this.mapPanel = new Ext.Map({

            mapOptions: {
                zoom: 7,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },

            listeners: {
                maprender: {
                    fn: this.initMarkers,
                    scope: this
                }
            }
        });

        this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Route for Today',
            cls: 'x-list-header'
        }];

        this.items = this.mapPanel;

        app.views.LocationMap.superclass.initComponent.call(this);
    },

    updateWithRecord: function(record) {

        if (!record) return;

        var latitude = record.get('latitude'),
        longitude = record.get('longitude'),
        name = record.get('name'),
        id = record.get('id');

        this.checkMarkers();

        if (!latitude || !longitude) {
            this.deactivateAllMarkers(name);
            return;
        }

        if (this.markers.get(id)) {
            this.activateMarker(this.markers.get(id));
            return;
        }

        var position = new google.maps.LatLng(latitude, longitude);

        var marker = new google.maps.Marker({
            position: position,
            title: name,
            map: this.mapPanel.map
        });

        this.mapPanel.update({
            latitude: latitude,
            longitude: longitude
        });

        google.maps.event.addListener(marker, 'click',

        function() {
            var infowindow = new google.maps.InfoWindow({
                content: name
            });
            infowindow.open(this.getMap(), this);
        });

        this.activateMarker(marker);

        this.markers.add(id, marker);

    },

    deactivateAllMarkers: function(name) {

        this.markers.each(function(key, value, length) {
            value.setAnimation(null);
        });
    },

    activateMarker: function(marker) {

        this.markers.each(function(key, value, length) {
            value.setAnimation(null);
        });

        if (marker) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    },

    removeAllMarkers: function() {
        this.markers.each(function(key, value, length) {
            value.setMap(null);
        });
        this.markers.clear();
    },

    checkMarkers: function() {
        this.markers.each(function(key, value, length) {
            var hasActivity = false;
            app.stores.Activity.each(function(record) {
                var organization = record.get('organization');
                if (organization.get('id') === key) {
                    hasActivity = true;
                }
            });
            if (!hasActivity) {
                value.setMap(null);
                this.remove(value);
            }
        });
    },

    initMarkers: function() {

        this.removeAllMarkers();

        app.stores.Activity.each(function(record) {

            var organization = record.get('organization');

            this.updateWithRecord(organization);

        },
        this);
    }

});

Ext.reg('locationmap', app.views.LocationMap);
