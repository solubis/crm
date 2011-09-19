/**
*    SelectField.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/


app.utils.SelectField = Ext.extend(Ext.form.Select, {

    initComponent: function() {
        app.utils.SelectField.superclass.initComponent.call(this);
    },

    /* 

		onAfterRender: function() {


        var list = this.listPanel.getComponent('list');
        var rec = this.store.getAt(10);
        var ehtml = list.getNode(rec);

        var el = Ext.get(ehtml);

        var ykor = el.getY() - list.getHeight();

        var xkor = el.getX();


        this.listPanel.scroller.scrollTo({
            x: xkor,
            y: ykor
        },
        true);

    },*/


    getListPanel: function() {

        this.listPanel = new Ext.Panel({
            floating: true,
            stopMaskTapEvent: false,
            hideOnMaskTap: true,
            cls: 'x-select-overlay',
            scroll: 'vertical',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                layout: {
                    type: 'fit',
                    align: 'stretch'
                },

                items: [{
                    xtype: 'searchfield',
                    itemId: 'search',
                    useClearIcon: false,
                    listeners: {
                        scope: this,

                        el: {
                            scope: this,
                            search: function(e) {
                                if (e.target.value == '') {
                                    this.store.clearFilter(false);
                                }
                            },
                            delegate: '.x-input-search'
                        },

                        keyup: function(field) {

                            var value = field.getValue();

                            if (!value) {
                                this.store.clearFilter(true);
                            } else {
                                var searches = value.split(' '),
                                regexps = [],
                                i;

                                for (i = 0; i < searches.length; i++) {
                                    if (!searches[i]) {
                                        return;
                                    }
                                    regexps.push(new RegExp(searches[i],
                                    'i'));
                                };

                                this.store.filterBy(function(record) {
                                    var matched = [];

                                    for (i = 0; i < regexps.length; i++) {
                                        var search = regexps[i];

                                        if (record.get('name').match(search)) {
                                            matched.push(true);
                                        }
                                        else {
                                            matched.push(false);
                                        }
                                    };

                                    if (regexps.length > 1
                                    && matched.indexOf(false) != -1) {
                                        return false;
                                    } else {
                                        return matched[0];
                                    }
                                });

                                this.listPanel.scroller.scrollTo({
                                    x: 0,
                                    y: 0
                                })
                            }
                        }
                    }
                }]
            }],
            items: {
                xtype: 'list',
                store: this.store,
                itemId: 'list',
                scroll: false,
                grouped: true,
                indexBar: true,
                itemTpl: [
                '<span class="x-list-label"> {' + this.displayField
                + '}</span>',
                '<span class="x-list-selected"></span>'],
                listeners: {
                    select: this.onListSelect,
                    //afterrender: this.onAfterRender,
                    change: function() {
                        this.fireEvent('change', arguments)
                    },
                    scope: this
                }
            }
        });

        this.store.clearFilter(true);
        this.listPanel.down('.searchfield').setValue('');

        return this.listPanel;
    }
});

Ext.reg('extendedselectfield', app.utils.SelectField);