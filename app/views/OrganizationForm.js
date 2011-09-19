/**
*    OrganizationForm.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.views.OrganizationForm = Ext.extend(Ext.form.FormPanel, {
	
	className: 'OrganizationForm',

    scroll: 'vertical',
    submitOnAction: false,

    initComponent: function() {

        this.record = Ext.ModelMgr.create({},
        'Organization');

        this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Organization',
            items: [{
                text: 'Cancel',
                ui: 'back',
                scope: this,
                handler: function() {
                    Ext.dispatch({
                        controller: app.currentTab.controller,
                        action: 'showPreviousItem'
                    });
                }
            },
            {
                xtype: 'spacer'
            },
            {
                text: 'Map',
                ui: 'action',
                scope: this,
                handler: function() {
                    Ext.dispatch({
                        controller: app.currentTab.controller,
                        action: 'showMap'
                    });
                }
            }]
        }];

        this.items = [{
            xtype: 'fieldset',
            title: 'Organization Data',
            defaults: {
                disabled: true,
                labelAlign: 'left',
                labelWidth: '40%',
                xtype: 'textfield'
            },
            items: [
            {
                name: 'name',
                label: 'Name',
                xtype: 'textareafield'
            },
            {
                name: 'status',
                label: 'Status'
            },
            {
                name: 'type',
                label: 'Type'
            },
            {
                name: 'group',
                label: 'Group'
            },
            {
                name: 'Code',
                label: 'Code'
            }]
        },
        {
            xtype: 'fieldset',
            title: 'Importance & Penetration',
            defaults: {
                disabled: true,
                labelAlign: 'left',
                labelWidth: '40%',
                xtype: 'textfield'
            },
            items: [

            {
                name: 'importance',
                label: 'Importance'
            },
            {
                name: 'rating',
                label: 'Rating'
            },
            {
                name: 'penetration',
                label: 'Penetration'
            }]
        },
        {
            xtype: 'fieldset',
            title: 'Address',
            defaults: {
                disabled: true,
                labelAlign: 'left',
                labelWidth: '40%',
                xtype: 'textfield'
            },
            items: [{
                name: 'address',
                label: 'Address',
                xtype: 'textareafield'
            },
            {
                name: 'city',
                label: 'City'
            },
            {
                name: 'postalCode',
                label: 'Postal Code'
            }]
        },
        {
            xtype: 'fieldset',
            title: 'Contacts',
            defaults: {
                disabled: true,
                labelAlign: 'left',
                labelWidth: '40%',
                xtype: 'textfield'
            },
            items: [
            {
                name: 'phone',
                label: 'Phone'
            },
            {
                name: 'mobile',
                label: 'Mobile'
            },
            {
                name: 'email',
                label: 'EMail',
                xtype: 'textareafield'
            }]
        }];

        app.views.OrganizationForm.superclass.initComponent.apply(this, arguments);
    },

    updateWithRecord: function(record) {
        this.load(record);
    }

});