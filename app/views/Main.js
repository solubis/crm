/**
 *    Viewport.js
 *    	
 *    Created by Jerzy Błaszczyk on 2011-09-01.
 *    Copyright 2011 Client and Friends. All rights reserved.
 **/

app.views.Main = Ext.extend(Ext.TabPanel, {

	fullscreen: true,
	layout: 'card',
	cardSwitchAnimation: 'slide',
	tabBar: {
		dock: 'bottom',
		ui: 'dark',
		layout: {
			pack: 'center'
		}
	},

	listeners: {
		cardswitch: function(me, newTab, oldTab) {
			app.currentTab = newTab;
			oldTab.setActiveItem(0);
		}
	},

	initComponent: function() {
		if (Ext.is.Phone) {
			this.items = [{xtype:'today'}, {xtype:'locationmap'}, {xtype:'activities'}, {xtype:'organizations'}];
		} else {
			this.items = [{xtype:'today'}, {xtype:'activities'}, {xtype:'organizations'}];
		}
		
		//this.optimizeTabs();

		app.views.Main.superclass.initComponent.apply(this, arguments);

		app.currentTab = this.items.items[0];
	},
	
	optimizeTabs: function() {
		for (var i = 0; i < this.items.length; i++){
			var tab = new app.views.Tab();	
			tab.setInnerView(this.items[i]);
			this.items[i] = tab; 	
		}
	}
});
