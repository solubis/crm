/**
*    app.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-13.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

function f(n) {

    return n < 10 ? '0' + n: n;
}

Date.prototype.toJSON = function(key) {

    return isFinite(this.valueOf()) ? this.getFullYear() + '-'
    + f(this.getMonth() + 1) + '-' + f(this.getDate()) + ' '
    + f(this.getHours()) + ':' + f(this.getMinutes()) + ':' + f(this.getSeconds()) : null;
};

Ext.regApplication({

    name: 'app',
    tabletStartupScreen: 'images/tablet_startup.png',
    phoneStartupScreen: 'images/phone_startup.png',
    icon: 'images/icon.png',
    glossOnIcon: true,

    launch: function() {

        this.launched = true;
        this.mainLaunch();
    },

    mainLaunch: function() {
	
		// Sencha Error - selecting an item on list throws TypeError when list is not shown yet
       /* Ext.override(Ext.DataView, {
            onItemSelect: function(record) {
                var node = this.getNode(record);
                var node_el = Ext.get(node)
                if (node_el) {
                    node_el.addCls(this.selectedItemCls);
                }
            }
        });*/

        Ext.util.Format.defaultDateFormat = "F d, Y, h:i a";

        this.logging = false;

        //Ext.is.Phone = true;
        app.views.login.show();
        //this.openViewport();
    },

    openViewport: function() {

        this.stores.loadStores(function() {
            this.viewport = new app.views.Viewport();
        });
    }
});

Ext.ns('app.utils');