/**
*    Stores.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.stores.createStores = function() {

    app.stores.Product = new app.utils.OfflineStore({
        model: 'Product',
        autoLoad: false,

        getGroupString: function(record) {
            return record.get('name')[0];
        },
        sorters: [{
            property: 'name',
            direction: 'ASC'
        }]
    });

    app.stores.ActivityProduct = new app.utils.OfflineStore({
        model: 'ActivityProduct',
        autoLoad: false
    });

    app.stores.Comment = new app.utils.OfflineStore({
        model: 'Comment',
        autoLoad: false
    });

    app.stores.Customer = new app.utils.OfflineStore({
        model: 'Customer',
        autoLoad: false,

        getGroupString: function(record) {
            return (record.get('lastName') ? record.get('lastName')[0] : 'Noname');
        },

        sorters: [{
            property: 'lastName',
            direction: 'ASC'
        }]
    });

    app.stores.ActivityCustomer = new app.utils.OfflineStore({
        model: 'ActivityCustomer',
        autoLoad: false
    });

    app.stores.Type = new app.utils.OfflineStore({
        model: 'Type',
        autoLoad: false
    });

    app.stores.Purpose = new app.utils.OfflineStore({
        model: 'Purpose',
        autoLoad: false
    });

    app.stores.Status = new app.utils.OfflineStore({
        model: 'Status',
        autoLoad: false
    });

    app.stores.Organization = new app.utils.OfflineStore({
        model: 'Organization',
        sorters: 'name',
        getGroupString: function(record) {
            return record.get('name')[0];
        },
        autoLoad: false
    });

    app.stores.Activity = new app.utils.OfflineStore({
        model: 'Activity',
        getGroupString: function(record) {
            if (record.get('startDate')) {
                var time = record.get('startDate');
                var date = new Date(time.getFullYear(), time.getMonth(), time.getDate());

                return app.utils.dateFormat(date);
            }
            else {
                return "All records";
            }
        },
        sorters: [{
            property: 'startDate',
            direction: 'ASC'
        }],
        autoLoad: false,

        todayFilter: function() {

            var start = new Date(2011, 8, 22);
            //var today = new Date();
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);

            var end = new Date(2011, 8, 22);
            //var tomorrow = new Date();
            end.setHours(0);
            end.setMinutes(0);
            end.setSeconds(0);
            end.setDate(end.getDate() + 1);

            var filter = new Ext.util.Filter({
                filterFn: function(item) {
                    return item.get('startDate') >= start && item.get('startDate') < end;
                }
            });

			console.log('Today Filter: ' + start + ' - ' + end);

			this.clearFilter(true);
            this.filter(filter);
            this.sort();
        },

        thisWeekFilter: function() {

            var start = new Date(2011, 8, 22);

            var dow = start.getDay();

            start.setDate(start.getDate() - dow);
            //var today = new Date();
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);

            var end = new Date();
            //var tomorrow = new Date();
            end.setHours(0);
            end.setMinutes(0);
            end.setSeconds(0);
            end.setDate(start.getDate() + 7);

            var filter = new Ext.util.Filter({
                filterFn: function(item) {
                    return item.get('startDate') >= start && item.get('startDate') < end;
                }
            });
			
			console.log('This Week Filter: ' + start + ' - ' + end);

            this.clearFilter(true);
			this.filter(filter);
            this.sort();
        },

        thisMonthFilter: function() {

            var start = new Date(2011, 8, 22);

            start.setDate(1);
            //var today = new Date();
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);

            var end = new Date(2011, 8, 22);
            //var tomorrow = new Date();
            end.setHours(0);
            end.setMinutes(0);
            end.setSeconds(0);
            end.setDate(1);
			end.setMonth(start.getMonth()+1);

            var filter = new Ext.util.Filter({
                filterFn: function(item) {
                    return item.get('startDate') >= start && item.get('startDate') < end;
                }
            });

			console.log('This Month Filter: ' + start + ' - ' + end);

			this.clearFilter(true);
            this.filter(filter);
            this.sort();
        }

    });
};


app.stores.initStoresFromXML = function(afterLoadCallback) {

    app.stores.isLoadingXML = true;

    app.stores.createStores();

    app.stores.Status.initFromXML('db/Status.xml');
    app.stores.Purpose.initFromXML('db/Purpose.xml');
    app.stores.Type.initFromXML('db/Type.xml');
    app.stores.Product.initFromXML('db/Product.xml');
    app.stores.Comment.initFromXML('db/Comment.xml');

    app.stores.ActivityProduct.initFromXML('db/ActivityProduct.xml',
    function() {
        app.stores.Customer.initFromXML('db/Customer.xml',
        function() {
            app.stores.ActivityCustomer.initFromXML('db/ActivityCustomer.xml',
            function() {
                app.stores.Organization.initFromXML('db/Organization.xml',
                function() {
                    app.stores.Activity.initFromXML('db/Activity.xml',

                    function() {
                        app.stores.isLoadingXML = false;
                        app.stores.destroyStores();
                        if (typeof afterLoadCallback == 'function') {
                            afterLoadCallback.call();
                        }
                    });
                });
            });
        });
    });

};

app.stores.clearStorage = function() {

    app.stores.Status.clearStorage();
    app.stores.Product.clearStorage();
    app.stores.Comment.clearStorage();
    app.stores.ActivityProduct.clearStorage();
    app.stores.Customer.clearStorage();
    app.stores.ActivityCustomer.clearStorage();
    app.stores.Purpose.clearStorage();
    app.stores.Type.clearStorage();
    app.stores.Organization.clearStorage();
    app.stores.Activity.clearStorage();
};

app.stores.destroyStores = function() {

    console.log('Destroying Stores');

    app.stores.Status.destroy();
    app.stores.Product.destroy();
    app.stores.Comment.destroy();
    app.stores.ActivityProduct.destroy();
    app.stores.Customer.destroy();
    app.stores.ActivityCustomer.destroy();
    app.stores.Purpose.destroy();
    app.stores.Type.destroy();
    app.stores.Organization.destroy();
    app.stores.Activity.destroy();
};

app.stores.clearStores = function() {

    app.stores.Status.clearStore();
    app.stores.Product.clearStore();
    app.stores.Comment.clearStore();
    app.stores.ActivityProduct.clearStore();
    app.stores.Customer.clearStore();
    app.stores.ActivityCustomer.clearStore();
    app.stores.Purpose.clearStore();
    app.stores.Type.clearStore();
    app.stores.Organization.clearStore();
    app.stores.Activity.clearStore();
};

app.stores.loadStores = function(afterLoadCallback) {

    app.stores.createStores();

    app.stores.Status.load();
    app.stores.Product.load();
    app.stores.Product.sort();
    app.stores.Comment.load();
    app.stores.Purpose.load();
    app.stores.Type.load();

    app.stores.ActivityProduct.load(function() {
        app.stores.Customer.load(function() {
            app.stores.ActivityCustomer.load(function() {
                app.stores.Organization.load(function() {
                    app.stores.Activity.load(afterLoadCallback);
                });
            });
        });
    });

};
