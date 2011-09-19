/**
*    DateTimePicker.js	
*    
*    Created by Jerzy Błaszczyk on 2011-09-01.
*    Copyright 2011 Client and Friends. All rights reserved.
**/


app.utils.DateTimePicker = Ext.extend(Ext.Picker, {

    yearFrom: 2010,

    yearTo: new Date().getFullYear() + 1,

    monthText: 'Month',


    dayText: 'Day',

    hourText: 'Hour',

    minuteText: 'Min',

    yearText: 'Year',

    slotOrder: ['month', 'day', 'hour', 'minute'],

    initComponent: function() {
        var yearsFrom = this.yearFrom,
        yearsTo = this.yearTo,
        hours = [],
        days = [],
        months = [],
        minutes = [
        {
            text: '00',
            value: 0
        },
        {
            text: '15',
            value: 15
        },
        {
            text: '30',
            value: 30
        },
        {
            text: '45',
            value: 45
        }],
        years = [],
        ln,
        tmp,
        i,
        daysInMonth;

        if (yearsFrom > yearsTo) {
            tmp = yearsFrom;
            yearsFrom = yearsTo;
            yearsTo = tmp;
        }

        for (i = yearsFrom; i <= yearsTo; i++) {
            years.push({
                text: i,
                value: i
            });
        }

        for (i = 0; i <= 24; i++) {
            hours.push({
                text: i,
                value: i
            });
        }

        daysInMonth = this.getDaysInMonth(1, new Date().getFullYear());

        for (i = 0; i < daysInMonth; i++) {
            days.push({
                text: i + 1,
                value: i + 1
            });
        }

        for (i = 0, ln = Date.monthNames.length; i < ln; i++) {
            months.push({
                text: Date.monthNames[i],
                value: i + 1
            });
        }

        this.slots = [];

        this.slotOrder.forEach(function(item) {
            this.slots.push(this.createSlot(item, years, months, days,
            hours, minutes));
        },
        this);

        app.utils.DateTimePicker.superclass.initComponent.call(this);
    },

    afterRender: function() {
        app.utils.DateTimePicker.superclass.afterRender.apply(this, arguments);

        this.setValue(this.value);
    },

    createSlot: function(name, years, months, days, hours, minutes) {
        switch (name) {
        case 'year':
            return {
                name:
                'year',
                align: 'right',
                data: years,
                title: this.useTitles ? this.yearText: false,
                flex: 3
            };
        case 'hour':
            return {
                name:
                'hour',
                align: 'center',
                data: hours,
                title: this.useTitles ? this.hourText: false,
                flex: 3
            };
        case 'minute':
            return {
                name:
                'minute',
                align: 'center',
                data: minutes,
                title: this.useTitles ? this.minuteText: false,
                flex: 3
            };
        case 'month':
            return {
                name:
                name,
                align: 'right',
                data: months,
                title: this.useTitles ? this.monthText: false,
                flex: 4
            };
        case 'day':
            return {
                name:
                'day',
                align: 'center',
                data: days,
                title: this.useTitles ? this.dayText: false,
                flex: 2
            };
        }
    },

    onSlotPick: function(slot, value) {
        var name = slot.name,
        date,
        daysInMonth,
        daySlot;

        if (name === "month" || name === "year") {
            daySlot = this.child('[name=day]');
            date = this.getValue();
            daysInMonth = this.getDaysInMonth(date.getMonth() + 1, date
            .getFullYear());
            daySlot.store.clearFilter();
            daySlot.store.filter({
                fn: function(r) {
                    return r.get('extra') === true
                    || r.get('value') <= daysInMonth;
                }
            });
            daySlot.scroller.updateBoundary(true);
        }

        app.utils.DateTimePicker.superclass.onSlotPick.apply(this, arguments);
    },

    getValue: function() {
		
        var value = app.utils.DateTimePicker.superclass.getValue.call(this);

		if (!value.year) {
			value.year = 2011;
		}

        var daysInMonth = this
        .getDaysInMonth(value.month, value.year),
        day = Math.min(
        value.day, daysInMonth),
        hour = value.hour,
        minute = value.minute;

        var d = new Date(value.year, value.month - 1, day, hour, minute);

        return d;
    },

    setValue: function(value, animated) {
        if (!Ext.isDate(value) && !Ext.isObject(value)) {
            value = null;
        }

        if (Ext.isDate(value)) {
            this.value = {
                day: value.getDate(),
                year: value.getFullYear(),
                month: value.getMonth() + 1,
                hour: value.getHours(),
                minute: value.getMinutes()
            };
        } else {
            this.value = value;
        }

        return app.utils.DateTimePicker.superclass.setValue.call(this,
        this.value, animated);
    },

    getDaysInMonth: function(month, year) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return month == 2 && this.isLeapYear(year)
        ? 29
        : daysInMonth[month - 1];
    },

    isLeapYear: function(year) {
        return !! ((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
    }
});

Ext.reg('datetimepicker', app.utils.DateTimePicker);
