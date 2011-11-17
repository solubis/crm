/**
 *    app.js	
 *    
 *    Created by Jerzy Błaszczyk on 2011-09-13.
 *    Copyright 2011 Client and Friends. All rights reserved.
 **/

Date.prototype.toJSON = function(key) {
	
	function f(n) {

		return n < 10 ? '0' + n : n;
	}

	return isFinite(this.valueOf()) ? this.getFullYear() + '-' + f(this.getMonth() + 1) + '-' + f(this.getDate()) + ' ' + f(this.getHours()) + ':' + f(this.getMinutes()) + ':' + f(this.getSeconds()) : null;
};

Ext.regApplication({

	name: 'app',
	tabletStartupScreen: 'images/tablet_startup.png',
	phoneStartupScreen: 'images/phone_startup.png',
	icon: 'images/icon.png',
	glossOnIcon: true,

	launch: function() {
		Ext.util.Format.defaultDateFormat = "F d, Y, h:i a";
		this.logging = true;
		app.views.login.show();
	},

	openMain: function() {
		this.stores.loadStores(function() {
			this.viewport = new app.views.Main();
		});
	},

	log: function(message) {
		if (this.logging) console.log(message);
	}
});

Ext.ns('app.utils');
