/**
*    OrganizationsList.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-11.
*    Copyright 2011 Client and Friends. All rights reserved.
**/


app.views.OrganizationsList = Ext.extend(Ext.Panel, {

    layout: 'fit',
    cls: 'list-panel',

    initComponent: function() {

        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            title: 'Organizations',
            ui: 'dark'
        }];

        this.items = [{
            xtype: 'list',
            store: app.stores.Organization,
            itemTpl: new Ext.XTemplate(
            '<div class="icon" style="background-image: url(images/{group}.png)"></div>',
            '<span class="name">{name}<br/>',
            '<h4>{[this.getPhonesString(values)]}</h4> ',
            '<h4>{[this.getEmailString(values)]}</h4></span>',
            {
                compiled: true,

                getAddressString: function(values) {

                    var a = values.address,
                    b = values.city,
                    c = values.postalCode;

                    return app.utils.getCSV(a, b, c);
                },

                getPhonesString: function(values) {

                    if (!values.phone && !values.mobile)
                    return '';

                    var a,
                    b;
                    if (Ext.is.Phone) {
                        a = '<a href="tel:' + values.phone + '">' + values.phone + "</a>";
                        b = '<a href="tel:' + values.mobile + '">' + values.mobile + "</a>";
                    } else {
                        a = values.phone;
                        b = values.mobile;
                    }

                    return 'Phones: ' + a + (values.mobile ? ', ' + b: '');
                },

                getEmailString: function(values) {
                    if (!values.email)
                    return '';

                    var result = 'Email: <a href="mailto:' + values.email + '">' + values.email +
                    '</a>';

                    return result;
                }

            }),
            grouped: true,
            indexBar: false,
            disableSelection: true,
            onItemDisclosure: function(record, btn, index) {
                if (record !== undefined) {
                    Ext.dispatch({
                        controller: app.currentTab.controller,
                        record: record,
                        action: 'showOrganization'
                    });
                }
            },

            listeners: {

                selectionchange: function(sel, records) {

                    if (records[0] !== undefined) {
                        Ext.dispatch({
                            controller: app.currentTab.controller,
                            action: 'showActivityInfo',
                            record: records[0]
                        });
                    }
                }
            }
        }];

        app.views.OrganizationsList.superclass.initComponent.apply(this, arguments);
    },

    updateData: function() {
        this.down('.list').bindStore(app.stores.Organization);
        this.down('.list').store.clearFilter();

    }

});

Ext.reg('organizationslist', app.views.OrganizationsList);