#Documentation for the DatePickerFilter class.

# Introduction #

A DatePickerFilter object is fed into the dateFilter parameter of a [DatePicker](DatePicker.md) object to determine which dates are permissible for the date-picker to pick.

The constructor takes two functions, one which becomes the badDates method, and one which becomes the validMonthP method.  If either are null, they are treated as if they allow all dates/months respectively.

The [DatePickerUtils](DatePickerUtils.md) object has a few methods that generate standard filters for you:
  * noWeekends() - allows all months but disallows Saturdays and Sundays.  (Anyone want to implement a more culturally-flexible weekend mechanism is welcome to do so.)
  * noDatesBefore(startDate) & noDatesAfter(endDate) - these both take a string containing either an ANSI/ISO date, or a (real) number indicating a number of days relative to now at which to set the date cutoff.  If the cutoff lands in the middle of a day, that day is allowed.

Anyone who wants to create a holiday Web service and an AJAX DatePickerFilter is welcome to do so.

# Public Methods #

  * badDates(year, month) - takes a year and a (0-based) month and returns an array listing which dates in that month cannot be selected.  The array is indexed by the 1-based date, and the element is false if allowed, true if disallowed.  (Using this representation allows us to default to an empty array when no date restrictions are in place.)
  * validMonthP(year, month) - takes a year and a (0-based) month and returns a Boolean indicating whether the given month is allowed for the date-picker.  When this function returns false, clicking forward or back to this month is disallowed.  (There may theoretically be cases where you may create a filter with a month that is valid but has no valid dates in it, so that you could still pass through the month to get to valid dates on the other side.)
  * append(newFilter) - takes a second DatePickerFilter object and combines the results, such that a month or date that is invalid in either filter will be invalid in the resulting filter.  The filter on which this is called becomes the combined filter, and the append function returns a reference to it to make chaining easy.