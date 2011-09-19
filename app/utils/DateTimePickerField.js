/**
*    DateTimePickerField.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/


app.utils.DateTimePickerField = Ext.extend(Ext.form.Field, {
    ui: 'select',
    

    picker: null,

    destroyPickerOnHide: false,

    initComponent: function() {
        this.addEvents(

            'change'
        );

        this.tabIndex = -1;
        this.useMask = true;
        this.useTitles = true;

        Ext.form.Text.superclass.initComponent.apply(this, arguments);
    },


    getDatePicker: function() {
        if (!this.datePicker) {
            if (this.picker instanceof app.utils.DateTimePicker) {
                this.datePicker = this.picker;
            } else {
                this.datePicker = new app.utils.DateTimePicker(Ext.apply(this.picker || {}));
            }

            this.datePicker.setValue(this.value || null);

            this.datePicker.on({
                scope : this,
                change: this.onPickerChange,
                hide  : this.onPickerHide
            });
        }

        return this.datePicker;
    },

    onMaskTap: function() {
        if (app.utils.DateTimePickerField.superclass.onMaskTap.apply(this, arguments) !== true) {
            return false;
        }
        
        this.getDatePicker().show();
    },
    
    onPickerChange : function(picker, value) {
        this.setValue(value);
        this.fireEvent('change', this, this.getValue());
    },

    onPickerHide: function() {
        if (this.destroyPickerOnHide && this.datePicker) {
            this.datePicker.destroy();
        }
    },

    setValue: function(value, animated) {
        if (this.datePicker) {
            this.datePicker.setValue(value, animated);
            this.value = (value != null) ? this.datePicker.getValue() : null;
        } else {
            if (!Ext.isDate(value) && !Ext.isObject(value)) {
                value = null;
            }

            if (Ext.isObject(value)) {
                this.value = new Date(value.year, value.month-1, value.day, value.hour, value.minute);
            } else {
                this.value = value;
            }
        }

        if (this.rendered) {
            this.fieldEl.dom.value = this.getValue(true);
        }
        
        return this;
    },

    getValue: function(format) {
        var value = this.value || null;
        return (format && Ext.isDate(value)) ? value.format(Ext.util.Format.defaultDateFormat) : value;
    },

    onDestroy: function() {
        if (this.datePicker) {
            this.datePicker.destroy();
        }
        
        app.utils.DateTimePickerField.superclass.onDestroy.call(this);
    }
});

Ext.reg('datetimepickerfield', app.utils.DateTimePickerField);
