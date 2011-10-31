/**
*    Today.js
*    	   
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.views.TodayTab = Ext.extend(Ext.Panel, {

    className: 'Today',

    iconCls: 'favorites',
    title: 'Today',
    layout: 'card',

    listeners: { 
        activate: function() {
            app.log('Today ACTIVATE');
            this.updateData(null, true);
        }
    },

    initComponent: function() {

        this.controller = new app.controllers.Controller();
        this.controller.setView(this);

        this.activityInfo = new app.views.ActivityInfo({
            flex: 3
        });

        this.activitiesList = new app.views.ActivitiesList({
            flex: 2
        });

        this.activitiesList.filterFunction = app.stores.Activity.todayFilter;

        this.locationMap = new app.views.LocationMap({
            flex: 3
        });

        this.todayView = new Ext.Panel({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            listeners: {
                scope: this,
                activate: function() {

                    if (this.locationMap) {
                        // Map component error - any manipulation in the background ends with broken component
                        this.todayView.remove(this.locationMap.id);
                        this.locationMap.destroy();
                    }

                    this.locationMap = new app.views.LocationMap({
                        flex: 3
                    });
                    this.todayView.add(this.locationMap);
                    this.todayView.doLayout();
                    var record = this.activitiesList.getSelectedRecord();
                    if (record) {
                        this.locationMap.updateWithRecord(record.get('organization'));
                    }

                }
            },

            items: [{
                flex: 4,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [this.activitiesList, this.activityInfo]
            },

            this.locationMap]
        });

        if (Ext.is.Phone) {
            this.items = [this.activitiesList];
        } else {
            this.items = [this.todayView];
        };

        app.views.TodayTab.superclass.initComponent.apply(this, arguments);
    },

    updateData: function(record, filter) {

        app.log('Today updateData with record : ' + record);

        this.activitiesList.updateData(record, filter);

        record = this.activitiesList.getSelectedRecord();

        if (!record) {
            record = this.activitiesList.getAt(0);
        }

        if (record) {
            this.activityInfo.updateWithRecord(record);
            this.locationMap.updateWithRecord(record.get('organization'));
        }
    }
});

Ext.reg('todaytab', app.views.TodayTab);


