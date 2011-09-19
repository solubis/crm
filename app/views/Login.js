/**
*    Login.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-10.
*    Copyright 2011 Client and Friends. All rights reserved.
**/


app.views.login = new Ext.form.FormPanel({

    floating: true,
    modal: true,
    centered: true,
    width: Ext.is.Phone ? 300: 500,
    height: Ext.is.Phone ? 280: 300,
	hideOnMaskTap: false,
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Login'
    }],
    scroll: 'vertical',
    items: [{
        xtype: 'textfield',
        label: 'ID'
    },
    {
        xtype: 'passwordfield',
        label: 'Password'
    },
    {
        xtype: 'spacer',
        height: 20
    },
    {
        xtype: 'button',
        ui: 'confirm',
        text: 'Login',
        handler: function() {
            this.ownerCt.destroy();
            app.openViewport();
        }
    },
    {
        xtype: 'spacer',
        height: 20
    },
    {
        xtype: 'button',
        ui: 'action',
        text: 'Load initial data',
        handler: function() {
            app.stores.initStoresFromXML(function() {
                app.openViewport();
            });
            this.ownerCt.destroy();
        }
    }]

});