/**
*    OfflineStore.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/


app.utils.S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

app.utils.SafariAjaxProxy = Ext.extend(Ext.data.AjaxProxy, {

    createRequestCallback: function(request, operation, callback,
    scope) {

        var me = this;
        return function(options, success, response) {
            var reader = me.getReader(),
            result = reader.read(response);

            Ext.apply(operation, {
                response: response,
                resultSet: result
            });

            operation.setCompleted();
            operation.setSuccessful();

            if (typeof callback == 'function') {
                callback.call(scope || me, operation);
            }

            me.afterRequest(request, true);
        };
    }
});

app.utils.LocalStorageProxy = Ext.extend(Ext.data.LocalStorageProxy, {

    getNextId: function() {
        return this.getGUID();
    },

    getIds: function() {

        var ids = (this.getStorageObject().getItem(this.id) || "").split(","),
        length = ids.length,
        i;

        if (length == 1 && ids[0] == "") {
            ids = [];
        }

        return ids;
    },

    getGUID: function() {

        return (app.utils.S4() + app.utils.S4() + "-" + app.utils.S4() + "-"
        + app.utils.S4() + "-" + app.utils.S4() + "-" + app.utils.S4()
        + app.utils.S4() + app.utils.S4()).toUpperCase();
    },

	getRecord: function(id) {
			//console.log('Proxy GetRecord: ' + this.model.modelName + ' ' + id);
	        if (this.cache[id] == undefined) {
	       // console.log('Proxy NOT IN CACHE GetRecord: ' + id);
	    		var rawData = Ext.decode(this.getStorageObject().getItem(this.getRecordKey(id))),
	                data    = {},
	                Model   = this.model,
	                fields  = Model.prototype.fields.items,
	                length  = fields.length,
	                i, field, name, record;
	
				if (!rawData){
					throw "Proxy Error. " + this.model.modelName + " not found for id: " + id;  
				}

	            for (i = 0; i < length; i++) {
	                field = fields[i];
	                name  = field.name;

	                if (typeof field.decode == 'function') {
	                    data[name] = field.decode(rawData[name]);
	                } else {
	                    data[name] = rawData[name];
	                }
	            }
		//		console.log('Proxy new MODEL ' + id);
	            record = new Model(data, id);
	            record.phantom = false;

	            this.cache[id] = record;
	        }
		//console.log('Proxy FROM CACHE GetRecord: ' + id);
	        return this.cache[id];
	    },

});

app.utils.OfflineStore = Ext.extend(Ext.data.Store, {

    constructor: function(config) {

        config = config || {};

        app.utils.OfflineStore.superclass.constructor
        .call(this, config);

        this.localProxy = new app.utils.LocalStorageProxy({
            model: this.model.modelName,
            id: this.model.modelName
        });

        this.setProxy(this.localProxy);
        this.model.proxy = this.localProxy;

        this.on('load', this.onLoad);
    },

    onLoad: function(store, records, success) {

        var p = this.getProxy().id
        ? 'Local Storage'
        : this.getProxy().url;

      // console.log('[' + this.model.modelName + '] ' + p + ' ' + records.length);
    },

    clearStorage: function() {

        this.clearFilter(true);
        this.getProxy().clear();
        this.removeAll(true);

    },

    clearStore: function() {

        this.clearFilter(true);
        this.removeAll(true);
    },

    initFromXML: function(xmlFile, afterLoadCallback) {

        this.clearStorage();

        this.xmlProxy = new app.utils.SafariAjaxProxy({
            model: this.model.modelName,
            url: xmlFile,
            reader: {
                type: 'xml',
                record: 'RECORD'
            }
        });

        this.setProxy(this.xmlProxy);
        this.load({
            scope: this,
            callback: function(records, operation, success) {
                this.each(function(record) {
                    record.setDirty()
                });
                this.setProxy(this.localProxy);
                this.sync();
                if (typeof afterLoadCallback == 'function') {
                    afterLoadCallback.call();
                }
            }
        });
    }

});
