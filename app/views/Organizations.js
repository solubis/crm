/**
*    Organizations.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.views.Organizations = Ext.extend(Ext.Panel, {
	
	className: 'Organizations',
	
    iconCls: 'team',
    title: 'Organizations',
    layout: 'card',
	
	listeners: {
        activate: function() {
            app.log('OrganizationsTab ACTIVATE');
            this.updateData(null, true);
        }
    },

    initComponent: function() {
	
		this.controller = new app.controllers.Controller();
		this.controller.setView(this);
	
        this.organizationsList = new app.views.OrganizationsList();

        this.items = [this.organizationsList];

        app.views.Organizations.superclass.initComponent.apply(this, arguments);
    },

	updateData: function(record, filter) {
		
		this.organizationsList.updateData();
       
    },

	closeTab: function(){
		
	}
});

Ext.reg('organizations', app.views.Organizations);



