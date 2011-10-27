/**
*    ActivitiesList.js
*    	   
*    Created by Jerzy Błaszczyk on 2011-09-10.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.views.ActivitiesList = Ext.extend(Ext.Panel, {

    layout: 'fit',
    cls: 'list-panel',

    initComponent: function() {

        this.store = app.stores.Activity;

        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            title: 'Activities',
            ui: 'dark',

            items: [
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                iconCls: 'add',
                iconMask: true,
                ui: 'plain',
                scope: this,
                handler: function() {

                    Ext.dispatch({
                        controller: app.currentTab.controller,
                        action: 'addActivity'
                    });
                }
            }]
        },
        {
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'filterToolbar',
            ui: 'light',
            hidden: true,

            items: [
            {
                xtype: 'spacer'
            },
            {
                xtype: 'segmentedbutton',
                items: [{
                    text: 'This Week',
                    scope: this,
                    handler: function() {
                        this.filterFunction = app.stores.Activity.thisWeekFilter;
                        this.filterData();
                    }
                },
                {
                    text: 'This Month',
                    scope: this,
                    handler: function() {
                        this.filterFunction = app.stores.Activity.thisMonthFilter;
                        this.filterData();
                    }
                },
                {
                    text: 'All',
                    pressed: true,
                    scope: this,
                    handler: function() {
                        this.filterFunction = app.stores.Activity.clearFilter;
                        this.filterData();
                    }
                }]
            },
            {
                xtype: 'spacer'
            }]
        }];

        this.list = new Ext.List({
            xtype: 'list',
            singleSelect: true,
            store: this.store,
            itemTpl: new Ext.XTemplate(
            '<div class="icon" style="background-image: url(images/call.png)"></div>',
            '<span class="name">{[values.organization.get("name")]}<br/>',
            '<span class="description">{[app.utils.timeFormat(values.startDate)]} - {[app.utils.timeFormat(values.endDate)]}</span></span>'),
            grouped: true,

            listeners: {

                // itemtap: function(me, index, item, e) {
                //
                //                     var record = me.store.getAt(index);
                //
                // 					if (record) {
                //                         Ext.dispatch({
                //                             controller: app.currentTab.controller,
                //                             action: 'showActivityInfo',
                //                             record: record
                //                         });
                //                     }
                //                 }
                selectionchange: function(model, records) {

                    var record = records[0];

                    if (record) {
                        Ext.dispatch({
                            controller: app.currentTab.controller,
                            action: 'showActivityInfo',
                            record: record
                        });
                    }
                }


            }
        });

        this.items = [this.list];

        app.views.ActivitiesList.superclass.initComponent.apply(this, arguments);
    },

    filterData: function() {

        if (this.filterFunction) {
			this.list.scroller.scrollTo({
                x: 0,
                y: 0
            });
            this.filterFunction.call(this.store);
			this.store.sort();
            //this.list.getSelectionModel().select([0]);
        }
    },

    getSelectedRecord: function() {
        return this.list.getSelectedRecords()[0];
    },

    getAt: function(index) {
        return this.list.store.getAt(index);
    },

    updateData: function(record, filter) {

        app.log('ActivitiesList updateData with record : ' + record);

        if (filter) {
            this.filterData();
        }

        if (record) {
            // Error in list.indexOf - when no find throws TypeError instead of index = -1
            try {
                index = this.list.indexOf(record);
            } catch(err) {
                index = -1;
            }

            if (index >= 0) {
                this.list.getSelectionModel().select(index);
            }
        }
    }
});

Ext.reg('activitieslist', app.views.ActivitiesList);