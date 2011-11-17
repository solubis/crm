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
	width: Ext.is.Phone ? 300 : 500,
	height: Ext.is.Phone ? 250 : 280,
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
		height: 40
	},
	{
		xtype: 'button',
		ui: 'action',
		height: 40,
		text: 'Login',
		handler: function() {
			app.stores.initStoresFromXML(function() {
				app.openMain();
			});
			this.ownerCt.destroy();
		}
	}]
});
