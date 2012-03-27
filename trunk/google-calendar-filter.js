/**
 * DatePicker integration with Google Calendar Data API.
 * (c) 2010 Titi Ala'ilima <tigre@pobox.com>
 *
 * DatePicker is freely distributable under the same terms as Prototype.
 */

google.load("gdata", "1");

var GoogleDatePickerFilter = Class.create(DatePickerFilter, {
  initialize: function (widget, calendarName) {
    this.widget = widget;
    this.calendarUrl = 'http://www.google.com/calendar/feeds/'+calendarName+'/public/full';
    this.calendarService = new google.gdata.calendar.CalendarService('prototype-datepicker-widget');
  },
  badDates: function (year, month) {
    if (this.calendarEvents == undefined) this.calendarEvents = {};
    if (this.calendarEvents[year] == undefined) this.calendarEvents[year] = {};
    if (this.calendarEvents[year][month] == undefined) {
      var monthDays = DatePickerUtils.getMonthDays(year, month);
      this.calendarEvents[year][month] = [];
      var query = new google.gdata.calendar.CalendarEventQuery(this.calendarUrl);
      query.setOrderBy('starttime');
      query.setSortOrder('ascending');
      query.setSingleEvents(false);
      var ym = DatePickerUtils.yearMonthToAnsiStub(year, month);
      var start = ym + '01';
      var end = ym + monthDays;
      query.setMinimumStartTime(start);
      query.setRecurrenceExpansionStart(start);
      query.setMaximumStartTime(end);
      query.setRecurrenceExpansionEnd(end);
      var filter = this;
      this.calendarService.getEventsFeed(query, function(feedRoot) {
        var dateFilter = new Array(monthDays + 1);
	var entries = feedRoot.feed.getEntries();
        entries.each(function(entry) {
          var times = entry.getTimes();
          if (times.length) {
	    var date = times[0].getStartTime().getDate();
	    if (year == 1900 + date.getYear() && month == date.getMonth()) dateFilter[date.getDate()] = true;
	  }
	});
        filter.calendarEvents[year][month] = dateFilter;
	filter.widget._redrawCalendar();
      });
    }
    return this.calendarEvents[year][month];
  },
});
