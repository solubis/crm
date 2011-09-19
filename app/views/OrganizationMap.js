/**
*    LocationMap.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/


app.views.OrganizationMap = Ext.extend(Ext.Panel, {
	
    iconCls: 'bookmarks',
    cls: 'map-panel',
    height: 300,
    title: 'Map',
    layout: {
        type: 'fit',
        align: 'stretch'
    },

    initComponent: function() {

        this.mapPanel = new Ext.Map({

            mapOptions: {
                zoom: 7,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                maprender: {
                    fn: function(){ this.updateWithRecord(this.record)},
                    scope: this
                }
            }
        });

        this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Location',
            items: [{
                text: 'Cancel',
                ui: 'back',
                scope: this,
                handler: function() {
                    Ext.dispatch({
                        controller: app.currentTab.controller,
                        action: 'hideMap',
						form: this
                    });
                }
            }]
        }];

        this.items = this.mapPanel;

        app.views.OrganizationMap.superclass.initComponent.call(this);
    },

    updateWithRecord: function(record) {

        var latitude = record.get('latitude'),
        longitude = record.get('longitude'),
        name = record.get('name'),
        id = record.get('id');

        if (this.marker)
        this.marker.setMap(null);

        var position = new google.maps.LatLng(latitude, longitude);

        this.marker = new google.maps.Marker({
            position: position,
            title: name,
            map: this.mapPanel.map
        });

        this.mapPanel.update({
            latitude: latitude,
            longitude: longitude
        });

        google.maps.event.addListener(this.marker, 'click',
        function() {
            var infowindow = new google.maps.InfoWindow({
                content: name
            });
            infowindow.open(this.getMap(), this);
        });
    }

});

Ext.reg('organizationmap', app.views.OrganizationMap);
