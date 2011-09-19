/**
*    Activities.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.views.ActivitiesTab = Ext.extend(Ext.Panel, {

    className: 'Activities',

    iconCls: 'time',
    title: 'Activities',
    layout: 'card',

    listeners: {
        activate: function() {
            console.log('ActivitiesTab ACTIVATE');
            this.updateData(null, true);
        }
    },

    initComponent: function() {

        this.controller = new app.controllers.Controller({
            itemId: 'ActivitiesTab-Controller'
        });
        this.controller.setView(this);

        this.activityInfo = new app.views.ActivityInfo({
            flex: 3
        });

        this.activitiesList = new app.views.ActivitiesList({
            flex: 2
        });

        this.activitiesList.filterFunction = app.stores.Activity.clearFilter;

        this.activitiesList.down('#filterToolbar').hidden = false;

        this.todayView = new Ext.Panel({
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [this.activitiesList, this.activityInfo]
        });


        if (Ext.is.Phone) {
            this.items = [this.activitiesList];
        } else {
            this.items = [this.todayView];
        };

        app.views.ActivitiesTab.superclass.initComponent.apply(this, arguments);
    },

    updateData: function(record, filter) {

        console.log('ActivitiesTab updateData with record : ' + record);

        this.activitiesList.updateData(record, filter);

        record = this.activitiesList.getSelectedRecord();

        if (!record) {
            record = this.activitiesList.getAt(0);
        }

        if (record) {
            this.activityInfo.updateWithRecord(record);
        }
    }

});

Ext.reg('activitiestab', app.views.ActivitiesTab);


