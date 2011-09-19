/**
*    ActivityForm.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.views.ActivityForm = Ext.extend(Ext.form.FormPanel, {

    className: 'ActivityForm',

    iconCls: 'info',
    title: 'Activity',
    scroll: 'vertical',
    submitOnAction: false,

    initComponent: function() {

        this.record = Ext.ModelMgr.create({},
        'Activity');

        this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Edit Activity',
            items: [{
                text: 'Cancel',
                ui: 'back',
                scope: this,
                handler: function() {

                    Ext.dispatch({
                        controller: app.currentTab.controller,
                        action: 'cancelActivityForm',
                        form: this
                    });
                }
            },
            {
                xtype: 'spacer'
            },
            {
                text: 'Apply',
                ui: 'action',
                scope: this,
                handler: function() {

                    Ext.dispatch({
                        controller: app.currentTab.controller,
                        action: 'updateActivity',
                        form: this
                    });
                }
            }]
        }];

        this.items = [{
            xtype: 'fieldset',
            title: 'Call Data',
            instructions: 'Please enter the information above. Fields with * are required',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '35%'
            },
            items: [{
                name: 'organization_id',
                label: 'Organization',
                xtype: 'extendedselectfield',
                itemId: 'organization',
                valueField: 'id',
                displayField: 'name',
                store: app.stores.Organization,
                listeners: {
                    change: function(me, value) {
                        var subject = me.ownerCt.getComponent('subject'),
                        organizationName = app.stores.Organization.getById(value).get('name');
                        subject.setValue(organizationName);
                    }
                }
            },
            {
                name: 'subject',
                itemId: 'subject',
                label: 'Subject',
                xtype: 'textfield',
                useClearIcon: true,
                required: false
            },
            {
                name: 'type_id',
                label: 'Type',
                xtype: 'selectfield',
                valueField: 'id',
                displayField: 'name',
                store: app.stores.Type
            },
            {
                name: 'status_id',
                label: 'Status',
                xtype: 'selectfield',
                valueField: 'id',
                displayField: 'name',
                store: app.stores.Status
            },
            {
                name: 'purpose_id',
                label: 'Purpose',
                xtype: 'selectfield',
                valueField: 'id',
                displayField: 'name',
                store: app.stores.Purpose
            }]
        },
        {
            xtype: 'fieldset',
            title: 'Time',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '35%'
            },
            items: [{
                name: 'startDate',
                itemId: 'startDate',
                label: 'Start Time',
                xtype: 'datetimepickerfield',
                listeners: {
                    scope: this,
                    change: function(me, d) {
                        var endField = this.down('#endDate');
                        var interval = this.interval;
                        endField.setValue(new Date(d.getTime() + interval));
                    }
                }
            },
            {
                name: 'endDate',
                itemId: 'endDate',
                label: 'End time',
                xtype: 'datetimepickerfield',
                listeners: {
                    scope: this,
                    change: function(me, d) {
                        var start = this.down('#startDate').getValue();
                        if (start > d) {
                            var interval = this.interval;
                            me.setValue(new Date(start.getTime() + interval));
                        }
                        this.interval = me.getValue() - start;
                    }
                }
            }]
        },
        {
            xtype: 'toolbar',
            title: 'Customers',
            ui: 'gray',
            cls: 'x-list-header',
            layout: {
                pack: 'right'
            },
            items: [{
                xtype: 'button',
                text: 'Add',
                ui: 'confirm-round',
                scope: this,
                handler: function(btn) {

                    var list = this.getComponent('customerList');

                    app.stores.Customer.filterBy(function(item) {
                        var result = (item.get('organization_id') === this.down('#organization').value);

                        return result;
                    },
                    this);

                    var sf = new Ext.form.Select({
                        name: 'customer_id',
                        store: app.stores.Customer,
                        displayField: 'name',
                        valueField: 'id',
                        el: btn
                    });

                    sf.on('change',
                    function(me, value) {
                        var alreadyOnList = (this.record.customers().find('customer_id', value) >= 0);
                        if (!alreadyOnList) {
                            var record = Ext.ModelMgr.create({
                                customer_id: value
                            },
                            'ActivityCustomer');
                            this.record.customers().add(record);
                        }
                    },
                    this);

                    sf.showComponent();
                }
            },
            {
                xtype: 'button',
                text: 'Delete',
                ui: 'decline-round',
                scope: this,
                handler: function() {
                    var list = this.getComponent('customerList');
                    var s = list.getSelectedRecords();
                    for (var i = s.length - 1; i >= 0; i--) {
                        list.store.remove(s[i]);
                    };
                }
            }]
        },
        {
            xtype: 'list',
            itemId: 'customerList',
            itemTpl: new Ext.XTemplate(
            '<div class="icon" style="background-image: url(images/customer.png)"></div>',
            '<span>{[values.customer.get("firstName")]} {[values.customer.get("lastName")]}<br/>',
            '<small style="color: #D40E3F">{[values.customer.get("importance")]}</small></span>',
            '<img style="margin-bottom: -3px; margin-left: 10px" src="images/{[app.utils.getCustomerImportanceCode(values.customer.get("importance"))]}.gif"/>'),
            store: this.record.customers(),
            scroll: false,
            autoHeight: true,
            style: 'width: 100%;',
            multiSelect: true

        },
        {
            xtype: 'spacer',
            height: 30
        },
        {
            xtype: 'toolbar',
            title: 'Products',
            ui: 'gray',
            cls: 'x-list-header',
            layout: {
                pack: 'right'
            },
            items: [{
                xtype: 'button',
                text: 'Add',
                ui: 'confirm-round',
                scope: this,
                handler: function(btn) {

                    var list = this.getComponent('productList');
                    var s = new app.utils.SelectField({
                        name: 'product_id',
                        store: app.stores.Product,
                        displayField: 'name',
                        valueField: 'id',
                        el: btn
                    });

                    s.on('change',
                    function(me, value) {
                        var alreadyOnList = (this.record.products().find('product_id', value) >= 0);
                        if (!alreadyOnList) {
                            var record = Ext.ModelMgr.create({
                                product_id: value
                            },
                            'ActivityProduct');
                            this.record.products().add(record);
                        }
                    },
                    this);

                    s.showComponent();
                }
            },
            {
                xtype: 'button',
                text: 'Delete',
                ui: 'decline-round',
                scope: this,
                handler: function() {
                    var list = this.getComponent('productList');
                    var s = list.getSelectedRecords();
                    for (var i = s.length - 1; i >= 0; i--) {
                        list.store.remove(s[i]);
                    };
                }
            }]
        },
        {
            xtype: 'list',
            itemId: 'productList',
            itemTpl: new Ext.XTemplate(
            '<div class="icon" style="background-image: url(images/product.png)"></div>',
            '<h3>{[values.product.get("name")]}</h3>'),
            store: this.record.products(),
            scroll: false,
            autoHeight: true,
            style: 'width: 100%;',
            multiSelect: true

        },
        {
            xtype: 'spacer',
            height: 30
        },
        {
            xtype: 'toolbar',
            title: 'Comments',
            cls: 'x-list-header',
            layout: {
                pack: 'right'
            },
            items: [{
                xtype: 'button',
                text: 'Add',
                ui: 'confirm-round',
                scope: this,
                handler: function(btn) {

                    var list = this.getComponent('commentList');

                    var overlayTb = new Ext.Toolbar({
                        dock: 'top',
                        layout: {
                            pack: 'right'
                        },
                        items: [{
                            ui: 'action',
                            text: 'Add',
                            handler: function() {
                                var record = Ext.ModelMgr.create({
                                    text: this.ownerCt.ownerCt.items.items[0].getValue(),
                                    date: new Date()
                                },
                                'Comment');
                                list.store.add(record);
                                overlay.destroy();
                            }
                        }]
                    });

                    var overlay = new Ext.Panel({
                        floating: true,
                        stopMaskTapEvent: false,
                        hideOnMaskTap: true,
                        cls: 'x-select-overlay',
                        width: Ext.is.Phone ? 260: 400,
                        styleHtmlContent: false,
                        dockedItems: overlayTb,
                        layout: {
                            type: 'fit',
                            align: 'stretch'
                        },
                        items: [{
                            xtype: 'textareafield',
                            maxRows: 5
                        }]
                    });

                    overlay.setCentered(false);
                    overlayTb.setTitle('Comment');
                    if (Ext.is.Phone) {
                        overlay.fullscreen = true;
                        overlay.show();
                    } else {
                        overlay.showBy(btn);
                    }

                }
            },
            {
                xtype: 'button',
                text: 'Delete',
                ui: 'decline-round',
                scope: this,
                handler: function() {
                    var list = this.getComponent('commentList');
                    var s = list.getSelectedRecords();
                    for (var i = s.length - 1; i >= 0; i--) {
                        list.store.remove(s[i]);
                    };
                }
            }]
        },
        {
            xtype: 'list',
            itemId: 'commentList',
            itemTpl: new Ext.XTemplate(
            '<div class="icon" style="background-image: url(images/comment.png)"></div>',
            '<span class="comment"><strong>{[app.utils.dateTimeFormat(values.date)]}</strong><br/>',
            '<span>{text}</span></span>'),
            store: this.record.comments(),
            scroll: false,
            autoHeight: true,
            style: 'width: 100%;',
            multiSelect: true

        }];

        app.views.ActivityForm.superclass.initComponent.apply(this, arguments);
    },

    updateWithRecord: function(record) {

        var productList = this.getComponent('productList'),
        customerList = this.getComponent('customerList'),
        commentList = this.getComponent('commentList');

        productList.bindStore(record.products());
        customerList.bindStore(record.customers());
        commentList.bindStore(record.comments());

        this.down('#organization').store.clearFilter(true);

        this.load(record);

        this.interval = record.get('endDate') - record.get('startDate');
    }

});

Ext.reg('activityform', app.views.ActivityForm);