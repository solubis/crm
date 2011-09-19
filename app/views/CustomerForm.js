/**
*    CustomerForm.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.views.CustomerForm = Ext.extend(Ext.form.FormPanel, {

    className: 'CustomerForm',

    scroll: 'vertical',
    submitOnAction: false,

    initComponent: function() {

        this.record = Ext.ModelMgr.create({},
        'Customer');

        this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Customer',
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
            }]
        }];

        this.items = [{
            xtype: 'fieldset',
            title: 'Customer Data',
            defaults: {
                disabled: true,
                labelAlign: 'left',
                labelWidth: '40%',
                xtype: 'textfield'
            },
            items: [
            {
                name: 'firstName',
                label: 'First Name',
                xtype: 'textfield'
            },
            {
                name: 'lastName',
                label: 'Last Name',
                xtype: 'textfield'
            },
            {
                name: 'importance',
                label: 'Importance',
                xtype: 'textfield'

            },
            {
                name: 'isKol',
                label: 'Key Opinion Leader',
                xtype: 'checkboxfield'
            },
            {
                name: 'type',
                label: 'Type'
            },
            {
                name: 'position',
                label: 'Position'
            },
            {
                name: 'status',
                label: 'Status'
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
                label: 'Email'
            }]
        },
        {
            xtype: 'fieldset',
            title: 'Personal Info',
            defaults: {
                disabled: true,
                labelAlign: 'left',
                labelWidth: '40%',
                xtype: 'textfield'
            },
            items: [{
                name: 'gender',
                label: 'Gender'
            },
            {
                name: 'birthdate',
                label: 'Birthdate',
                xtype: 'datepickerfield'
            }]
        }];

        app.views.CustomerForm.superclass.initComponent.apply(this, arguments);
    },

    updateWithRecord: function(record) {
        this.load(record);
    }

});