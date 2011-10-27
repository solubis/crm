/**
*    Controller.js
*    	  
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/


app.controllers.Controller = Ext.extend(Ext.Controller, {

    className: 'Controller',

    setView: function(view) {
        this.view = view;
    },

    showItem: function(view, animation, direction) {

        view.previousItem = this.view.getActiveItem();

        this.view.setActiveItem(view, {
            type: animation,
            direction: direction
        });
    },

    showPreviousItem: function() {

        this.view.setActiveItem(this.view.getActiveItem().previousItem, {
            type: 'slide',
            direction: 'right'
        });
    },

    cancelActivityForm: function(options) {

        var record = options.form.getRecord();

        record.init();

        this.view.setActiveItem(this.view.getActiveItem().previousItem, {
            type: 'slide',
            direction: 'right'
        });
    },

    updateActivity: function(options) {

        var form = options.form,
        record = form.getRecord();

        form.updateRecord(record, true);

        if (record.phantom) {
            record = app.stores.Activity.add(record)[0];
        }

        record.products().sync();
        record.comments().sync();
        record.customers().sync();
        record.save().init();

        this.view.updateData(record, true);

        this.showPreviousItem();
    },

    editActivity: function(options) {

        var record = this.view.activityInfo.record;

        if (!record) {
            throw 'Record not found';
        }

        if (!this.view.activityForm) {
            this.view.activityForm = new app.views.ActivityForm();
        }

        this.view.activityForm.updateWithRecord(record);
        this.showItem(this.view.activityForm, 'slide', 'left');
    },

    addActivity: function(options) {

        var newRecord = Ext.ModelMgr.create({
            startDate: new Date(),
            endDate: new Date(),
            status_id: '40A3B6FF-AA65-E011-9241-00155D01180E',
            organization_id: ''
        },
        'Activity');

        if (newRecord.products()) newRecord.products().removeAll();
        if (newRecord.customers()) newRecord.customers().removeAll();
        if (newRecord.comments()) newRecord.comments().removeAll();

        if (!this.view.activityForm) {
            this.view.activityForm = new app.views.ActivityForm();
        }

        this.view.activityForm.updateWithRecord(newRecord);
        this.showItem(this.view.activityForm, 'slide', 'left');
    },

    showActivityInfo: function(options) {

        app.log('Controller showActivityInfo with record : ' + options.record);

        if (options.record) {

            this.view.updateData(options.record, false);

            if (Ext.is.Phone) {
                this.showItem(this.view.activityInfo, 'slide', 'left');
            }
        }
    },

    showCustomer: function(options) {

        var record = options.record.get('customer');

        if (!record) {
            throw 'Record not found';
        }

        if (!this.view.customerForm) {
            this.view.customerForm = new app.views.CustomerForm();
        }

        this.view.customerForm.updateWithRecord(record);
        this.showItem(this.view.customerForm, 'slide', 'left');
    },

    showOrganization: function(options) {

        var record = options.record;

        if (!record) {
            record = this.view.activityInfo.record.get('organization');
        }

        if (!record) {
            throw 'Record not found';
        }

        if (!this.view.organizationForm) {
            this.view.organizationForm = new app.views.OrganizationForm();
        }

        this.view.organizationForm.updateWithRecord(record);
        this.showItem(this.view.organizationForm, 'slide', 'left');

    },

    hideMap: function(options) {
        this.showPreviousItem(this.view.organizationForm, 'flip', 'right');
        this.view.organizationMap.destroy();
        this.view.organizationMap = null;
    },

    showMap: function(options) {

        if (this.view.organizationMap) this.view.organizationMap.destroy();

        this.view.organizationMap = new app.views.OrganizationMap();

        this.view.organizationMap.record = options.record;

        this.showItem(this.view.organizationMap, 'flip', 'left');
    }

});