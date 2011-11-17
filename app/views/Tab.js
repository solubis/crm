/**
*    Tab.js	
*    
*    Created by Jerzy Blaszczyk on 2011-11-01.
*    Copyright 2011 Client and Friends. All rights reserved.
*/

app.views.Tab = Ext.extend(Ext.Panel, {
	
	iconCls: 'favorites',
    title: 'Today',

	listeners: {
		scope: this,
		activate: function(tab) {
			tab.add(tab.innerView);
			tab.doLayout();
		},
		deactivate: function(tab) {
			tab.removeAll(true);
		}
	},
	
	setInnerView: function(innerView){
		this.innerView = innerView;
	}
});
