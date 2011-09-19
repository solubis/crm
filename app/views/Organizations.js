/**
*    Organizations.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.views.OrganizationsTab = Ext.extend(Ext.Panel, {
	
	className: 'Organizations',
	
    iconCls: 'team',
    title: 'Organizations',
    layout: 'card',

    initComponent: function() {
	
		this.controller = new app.controllers.Controller();
		this.controller.setView(this);
	
        this.organizationsList = new app.views.OrganizationsList();

        this.items = [this.organizationsList];

        app.views.OrganizationsTab.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('organizationstab', app.views.OrganizationsTab);



