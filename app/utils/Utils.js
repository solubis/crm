/**
*    Utils.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/

app.utils.getCSV = function() {
    var result = "";

    for (var i = 0, j = arguments.length; i < j; i++) {
        if (arguments[i]) {
            result += arguments[i];
            if (arguments[i + 1])
            result += ', ';
        }

    }

    return result;
}

app.utils.getCustomerImportanceCode = function(i) {

    switch (i) {
    case 'Decision Maker (DM)':
        return 'MainDM';
        break;

    case 'Key Decision Maker (KDM)':
        return 'MainKDM';
        break;

    case 'Non Decision Maker (NDM)':
        return 'MainNDM';
        break;

    default:
        return 'NotDefined';
        break;
    }
    return "";
};

app.utils.alert = function(message) {

    var popup = new Ext.Panel({
        floating: true,
        modal: true,
        centered: true,
        width: 200,
        data: {
            message: message
        },
        styleHtmlContent: true,
        tpl: '<p>{message}</p>',
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            title: 'Message'
        }],
        scroll: 'vertical'
    });

    popup.show('pop');

};

app.utils.dateFormat = function(date) {

    if (date) {
        return date.format('F d, Y');
    }
    else {
        return "Uknown date";
    }
};

app.utils.dateTimeFormat = function(date) {

    if (date) {
        return date.format(Ext.util.Format.defaultDateFormat);
    }
    else {
        return "Uknown date";
    }
};

app.utils.timeFormat = function(date) {

    if (date) {
        return date.format('h:i a');
    }
    else {
        return "Uknown date";
    }
};