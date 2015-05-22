#Documentation of DatePickerUtils object.

# Introduction #

This object (note, not a class!) is basically a namespace to collect some functions and values of general use in the DatePicker classes.

# Public Properties #

  * oneDayInMs - how many milliseconds in a day?

# Public Methods #

  * getMonthDays(year, month) - how many days in the given year and (0-based) month.
  * parseDate(dateString) - dateString can be either an ANSI/ISO-formatted date or a real number.  It returns a Date object set according to what is passed in:
    * ANSI date -> midnight that morning
    * real number -> that many days relative to the current local time
  * ansiDateToObject(ansiDate) - returns a Date object set to midnight on the morning of the date represented by ansiDate.
  * dateObjectToAnsi(dateObj) - returns an ANS/ISO-formatted string representing the date object passed in.
  * yearMonthToAnsiStub(year, month) - take a year and (0-based) month and present the ANSI-formatted date minus the two-digit date-of-month at the end.  Useful for generating ANSI dates when looping through a month.
  * noDatesBefore(startDate) - returns a DatePickerFilter object that excludes any dates before the date specified by parseDate(startDate).
  * noDatesAfter(endDate) - returns a DatePickerFilter object that excludes any dates after the date specified by parseDate(endDate).
  * noWeekends() - returns a DatePickerFilter object that excludes Saturdays and Sundays.