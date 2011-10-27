/**
*    Viewport.js
*    	
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.views.Viewport = Ext.extend(Ext.TabPanel, {

    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    tabBar: {
        dock: 'bottom',
        ui: 'dark',
        layout: {
            pack: 'center'
        }
    },

    listeners: {
        scope: this,
        cardswitch: function(me, newTab, oldTab) {
            app.currentTab = newTab;
			oldTab.setActiveItem(0);
        }
    },

    initComponent: function() {

        app.views.todayTab = new app.views.TodayTab();
        app.views.activitiesTab = new app.views.ActivitiesTab();
        app.views.organizationsTab = new app.views.OrganizationsTab();
        app.views.locationTab = new app.views.LocationMap();

        if (Ext.is.Phone) {

            this.items = [app.views.todayTab, app.views.locationTab, app.views.activitiesTab, app.views.organizationsTab];

        } else {

            this.items = [app.views.todayTab, app.views.activitiesTab, app.views.organizationsTab];

        }

        app.views.Viewport.superclass.initComponent.apply(this, arguments);

        app.currentTab = app.views.todayTab;
    }

});
