/**
*    Models.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/


Ext.regModel('Type', {

    fields: [{
        name: 'id',
        type: 'string'
    },
    {
        name: 'name',
        type: 'string'
    }]
});

Ext.regModel('Status', {

    fields: [{
        name: 'id',
        type: 'string'
    },
    {
        name: 'name',
        type: 'string'
    }]
});

Ext.regModel('Purpose', {

    fields: [{
        name: 'id',
        type: 'string'
    },
    {
        name: 'name',
        type: 'string'
    }]
});

Ext.regModel('ActivityProduct', {

    fields: [{
        name: 'id',
        type: 'string'
    },
    {
        name: 'activity_id',
        type: 'string'
    },
    {
        name: 'product_id',
        type: 'string'
    }],

    associations: [
    {
        type: 'belongsTo',
        model: 'Product'
    }],

    init: function() {

        if (app.stores.isLoadingXML) return;

        this.getProduct(function(record) {
            this.set('product', record);
        },
        this);
    }
});

Ext.regModel('Product', {

    fields: [{
        name: 'id',
        type: 'string'
    },
    {
        name: 'name',
        type: 'string'
    }]
});

Ext.regModel('ActivityCustomer', {

    fields: [{
        name: 'activity_id',
        type: 'string'
    },
    {
        name: 'customer_id',
        type: 'string'
    },
    {
        name: 'id',
        type: 'string'
    }],

    associations: [
    {
        type: 'belongsTo',
        model: 'Customer'
    }],

    init: function() {
        if (app.stores.isLoadingXML) return;

        this.getCustomer(function(record) {
            this.set('customer', record);
        },
        this);
    }
});

Ext.regModel('Comment', {

    fields: [{
        name: 'activity_id',
        type: 'string'
    },
    {
        name: 'id',
        type: 'string'
    },
    {
        name: 'date',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    },
    {
        name: 'text',
        type: 'string'

    }]
});


Ext.regModel('Customer', {

    fields: [{
        name: 'id',
        type: 'string'
    },
    {
        name: 'firstName',
        type: 'string'
    },
    {
        name: 'lastName',
        type: 'string'
    },
    {
        name: 'importance',
        type: 'string'
    },
    {
        name: 'type',
        type: 'string'
    },
    {
        name: 'position',
        type: 'string'
    },
    {
        name: 'status',
        type: 'string'
    },
    {
        name: 'email',
        type: 'string'
    },
    {
        name: 'phone',
        type: 'string'
    },
    {
        name: 'mobile',
        type: 'string'
    },
    {
        name: 'gender',
        type: 'string'
    },
    {
        name: 'maritalStatus',
        type: 'string'
    },
    {
        name: 'birthdate',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    },
    {
        name: 'spouseName',
        type: 'string'
    },
    {
        name: 'childrenAmount',
        type: 'string'
    },
    {
        name: 'childrenNames',
        type: 'string'
    },
    {
        name: 'isKol',
        type: 'string'
    },
    {
        name: 'organization_id',
        type: 'string'
    }],

    associations: [
    {
        type: 'belongsTo',
        model: 'Organization'
    }],

    init: function() {
        if (app.stores.isLoadingXML) return;

        this.getOrganization(function(record) {
            this.set('organization', record);
        },
        this);

        this.set('name', this.get('firstName') + ' ' + this.get('lastName'));
    }
});

Ext.regModel('Organization', {

    fields: [{
        name: 'id',
        type: 'string'
    },
    {
        name: 'name',
        type: 'string'
    },
    {
        name: 'address',
        type: 'string'
    },
    {
        name: 'city',
        type: 'string'
    },
    {
        name: 'email',
        type: 'string'
    },
    {
        name: 'latitude',
        type: 'float'
    },
    {
        name: 'longitude',
        type: 'float'
    },
    {
        name: 'mobile',
        type: 'string'
    },
    {
        name: 'phone',
        type: 'string'
    },
    {
        name: 'postalCode',
        type: 'string'
    },
    {
        name: 'status',
        type: 'string'
    },
    {
        name: 'type',
        type: 'string'
    },
    {
        name: 'group',
        type: 'string'
    },
    {
        name: 'code',
        type: 'string'
    },
    {
        name: 'importance',
        type: 'string'
    },
    {
        name: 'rating',
        type: 'string'
    },
    {
        name: 'penetration',
        type: 'string'
    }],

    associations: [{
        type: 'hasMany',
        model: 'Customer',
        name: 'customers'
    }],

    init: function() {
        if (app.stores.isLoadingXML) return;

        // this.customers().load();
    }
});

Ext.regModel('Activity', {

    fields: [{
        name: 'id',
        type: 'string'
    },
    {
        name: 'subject',
        type: 'string'
    },
    {
        name: 'organization_id',
        type: 'string'
    },
    {
        name: 'purpose_id',
        type: 'string'
    },
    {
        name: 'status_id',
        type: 'string'
    },
    {
        name: 'type_id',
        type: 'string'
    },
    {
        name: 'startDate',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    },
    {
        name: 'endDate',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }],

    associations: [{
        type: 'hasMany',
        model: 'ActivityProduct',
        name: 'products'
    },
    {
        type: 'hasMany',
        model: 'ActivityCustomer',
        name: 'customers'
    },
    {
        type: 'hasMany',
        model: 'Comment',
        name: 'comments'
    },
    {
        type: 'belongsTo',
        model: 'Type'
    },
    {
        type: 'belongsTo',
        model: 'Status'
    },
    {
        type: 'belongsTo',
        model: 'Purpose'
    },
    {
        type: 'belongsTo',
        model: 'Organization'
    }],

    init: function() {

        if (app.stores.isLoadingXML) return;

        this.getOrganization(function(record) {

            this.set('organization', record);
        },
        this);
        this.getStatus(function(record) {
            this.set('status', record);
        },
        this);
        this.getType(function(record) {
            this.set('type', record);
        },
        this);
        this.getPurpose(function(record) {
            this.set('purpose', record);
        },
        this);

        this.products().load();
        this.customers().load();
        this.comments().load();

        this.products().removed = [];
        this.customers().removed = [];
        this.comments().removed = [];
    }

});