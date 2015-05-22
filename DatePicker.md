#Documentation for the DatePicker class.

# Introduction #

The DatePicker object is instantiated, tied to a form text input, such that clicking in the input will bring up a calendar widget for picking dates.

The constructer takes an associative array of configuration parameters.  The one required parameter is "relative", which is a string containing the id of the input field to bind to.
```
<input type="text" name="mydate" id="mydate_id" />
<script type="text/javascript">
var dpicker = new DatePicker({
 relative : 'mydate_id'
});
</script>
```

# Parameters #

The full list of available configuration parameters is as follows:
  * **relative** _required_ - string containing the id of the form input to bind to
  * **language** _optional_ (default `'en'`) - two-letter language code (currently supporting `'en'`, `'fr'`, `'sp'`, `'it'`, `'pt'`, `'de'`, `'nl'`, `'hu'`, `'ro'`, `'lt'`, `'lv'`, `'sv'`, `'dk'`, `'no'`, `'fi'`, `'ja'`, and `'zh'`)
  * **zindex** _optional_ (default 1) - CSS zindex to use for the popup calendar
  * **keepFieldEmpty** _optional_ (default `false`) - whether or not to keep the field empty when closing the calendar without picking a date.  When false, it will use today's date to fill in an empty field.
  * **clickCallback** _optional_ - a function with no parameters that is called when the input field is clicked.
  * **cellCallback** _optional_ - a function with no parameters that is called when a calendar date is picked.
  * **leftOffset** _optional_ (default 0) - number of pixels to shift the left of the popup calendar right.
  * **topOffset** _optional_ (default 30) - number of pixels to shift the top of the popup calendar down.
  * **relativePosition** _optional_ (default `true`) - whether or not we are positioning relative to the input itself, or relative to its containing positioned element.
  * **showEffect** _optional_ (default `"appear"`) - Scriptaculous effect to use when the popup is shown.
  * **enableShowEffect** _optional_ (default `true`) - whether or not `showEffect` is used.
  * **showDuration** _optional_ (default 0.2) - the duration for the `showEffect`.
  * **closeEffect** _optional_ (default `"fade"`) - Scriptaculous effect to use when the popup is closed.
  * **enableCloseEffect** _optional_ (default `true`) - whether or not `closeEffect` is used.
  * **closeEffectDuration** _optional_ (default 0.2) - the duration for the `closeEffect`.
  * **afterClose** _optional_ - function to be called after the popup closes.
  * **externalControl** _optional_ - a string holding the id of another element to bind an onclick listener to for opening and closing the popup calendar.
  * **dateFormat** _optional_ - manual control of the date format, requires an array of two elements, the first itself being an array of three elements indicating how to order "dd" "mm" and "yyyy", and the second element being the character to use to separate the three date parts.  For example, standard ANSI/ISO format would be `[ ["yyyy","mm","dd"], "-" ]`.  If this is not specified, a default will be chosen based on the `language` setting.
  * **setPositionTop** _optional_ (default 0) - if `relativePosition` is false, this is used  as the CSS `top` attribute of the popup.
  * **setPositionLeft** _optional_ (default 0) - if `relativePosition` is false, this is used  as the CSS `left` attribute of the popup.
  * **enableCloseOnBlur** _optional_ (default `false`) - causes the datepicker to close when the form input loses focus.
  * **dateFilter** _optional_ - a DatePickerFilter object that specifies what months and dates to exclude from the datepicker.

## Deprecated ##

Still supported somewhat for backwards compatibility, though defaults are no longer the same:
  * disablePastDate - when true, past dates are not selectable. Since the addition of dateFilter, setting this to true appends "DatePickerUtils.noDatesBefore(0)" to the existing date filter, if any.
  * disableFutureDate - when true, future dates are not selectable. Since the addition of dateFilter, setting this to true appends "DatePickerUtils.noDatesAfter(0)" to the existing date filter, if any. This takes place after the check on disablePastDate, so if for some reason you set both true, this one will be ignored.