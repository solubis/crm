/**
*    ActivityInfo.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.views.ActivityInfo = Ext.extend(Ext.Panel, {

    className: 'ActivityInfo',

    scroll: 'vertical',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    cls: 'activity-info',

    initComponent: function() {

        this.record = Ext.ModelMgr.create({},
        'Activity');

        this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Activity',
            ui: 'dark',
            layout: {
                pack: 'right'
            },
            items: [{
                text: 'Back',
                ui: 'back',
                hidden: !Ext.is.Phone,
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

        this.activityInfo = new Ext.Panel({
            tpl: new Ext.XTemplate(
            '<div style="padding-right:2em;"><h3>{[values.purpose.get("name")]} at <small>{[values.organization.get("name")]}</small></h3>',
            '<h4>Scheduled from {[app.utils.dateTimeFormat(values.startDate)]} <br/>to {[app.utils.dateTimeFormat(values.endDate)]}</h4>',
            '{[values.type.get("name")]} / {[values.status.get("name")]}',
            '<img src="images/{[values.status.get("name")]}.png" style="margin-left: 10px;margin-bottom:-3px;"/></div>',
            '<div class = "blueArrow" />'),
            styleHtmlContent: true,
            style: 'width: 100%;',
            listeners: {

                body: {
                    click: function() {

                        Ext.dispatch({
                            controller: app.currentTab.controller,
                            action: 'editActivity'
                        });

                    },
                    delegate: '.blueArrow'
                }
            }
        });

        this.companyHeader = {
            xtype: 'toolbar',
            title: 'Organization',
            ui: 'gray',
            cls: 'x-list-header'
        };

        this.companyInfo = new Ext.Panel({
            tpl: new Ext.XTemplate(
            '<div style="padding-right:2em;"><h3>{[values.organization.get("name")]} ',
            '<small>{[values.organization.get("type")]} / {[values.organization.get("status")]}</small></h3>',
            '<h4>{[this.getAddressString(values)]}</h4>',
            '<h4>{[this.getPhonesString(values)]}</h4> ',
            '<h4>{[this.getEmailString(values)]}</h4></div>',
            '<div class="blueArrow"/>',
            {
                compiled: true,

                getAddressString: function(values) {

                    var a = values.organization
                    .get('address'),
                    b = values.organization
                    .get('city'),
                    c = values.organization
                    .get('postalCode');

                    return app.utils.getCSV(a, b, c);
                },

                getPhonesString: function(values) {

                    if (!values.organization.get('phone') && !values.organization.get('mobile'))
                    return '';

                    var a,
                    b;

                    if (Ext.is.Phone) {
                        a = '<a href="tel:' + values.organization
                        .get('phone') + '">' + values.organization
                        .get('phone') + "</a>";
                        b = '<a href="tel:' + values.organization
                        .get('mobile') + '">' + values.organization
                        .get('mobile') + "</a>";
                    } else {
                        a = values.organization
                        .get('phone');
                        b = values.organization
                        .get('mobile');
                    }

                    return 'Phones: ' + a + (values.organization
                    .get('mobile') ? ', ' + b: '');
                },

                getEmailString: function(values) {
                    if (!values.organization.get('email'))
                    return '';

                    var result = 'Email: <a href="mailto:' + values.organization.get("email") + '">' + values.organization.get("email") +
                    '</a>';

                    return result;
                }

            }),
            styleHtmlContent: true,
            style: 'width: 100%;',
            listeners: {

                body: {
                    click: function() {

                        Ext.dispatch({
                            controller: app.currentTab.controller,
                            action: 'showOrganization'

                        });
                    },
                    delegate: '.blueArrow'
                }
            }
        });

        this.productsHeader = {
            xtype: 'toolbar',
            title: 'Products',
            cls: 'x-list-header'
        };

        this.productList = new Ext.List({
            itemTpl: new Ext.XTemplate(
            '<div class="icon" style="background-image: url(images/product.png)"></div>',
            '<h3>{[values.product.get("name")]}</h3>'),
            store: this.record.products(),
            scroll: false,
            autoHeight: true,
            style: 'width: 100%;',
            disableSelection: true
        });

        this.customersHeader = {
            xtype: 'toolbar',
            title: 'Customers',
            cls: 'x-list-header'
        };

        this.commentList = new Ext.List({
            itemTpl: new Ext.XTemplate(
            '<div class="icon" style="background-image: url(images/comment.png)"></div>',
            '<span class="comment"><strong>{[app.utils.dateTimeFormat(values.date)]}</strong><br/>',
            '<span>{text}</span></span>'),
            store: this.record.comments(),
            scroll: false,
            autoHeight: true,
            style: 'width: 100%;',
            disableSelection: true
        });

        this.commentsHeader = {
            xtype: 'toolbar',
            title: 'Comments',
            cls: 'x-list-header'
        };

        this.customerList = new Ext.List({
            itemTpl: new Ext.XTemplate(
            '<div class="icon" style="background-image: url(images/customer.png)"></div>',
            '<span>{[values.customer.get("firstName")]} {[values.customer.get("lastName")]}<br/>',
            '<small style="color: #D40E3F ">{[values.customer.get("importance")]}</small></span>',
            '<img style="margin-bottom: -3px;margin-left:10px" src="images/{[app.utils.getCustomerImportanceCode(values.customer.get("importance"))]}.gif "/>'),
            store: this.record.customers(),
            disableSelection: true,
            scroll: false,
            autoHeight: true,
            style: 'width: 100%;',
            onItemDisclosure: function(record, btn, index) {
                if (record !== undefined) {
                    Ext.dispatch({
                        controller: app.currentTab.controller,
                        record: record,
                        action: 'showCustomer'
                    });
                }
            }
        });

        this.items = [this.activityInfo, this.companyHeader, this.companyInfo,
        this.customersHeader, this.customerList, this.productsHeader,
        this.productList, this.commentsHeader, this.commentList];

        app.views.ActivityInfo.superclass.initComponent.call(this);
    },

    updateWithRecord: function(record) {

        if (record) {

            this.activityInfo.update(record.data);
            this.companyInfo.update(record.data);
            this.customerList.bindStore(record.customers());
            this.productList.bindStore(record.products());
            this.commentList.bindStore(record.comments());

            this.record = record;
        }
    }
});

Ext.reg('activityinfo', app.views.ActivityInfo);
