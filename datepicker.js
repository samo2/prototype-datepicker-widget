/**
 * DatePicker widget using Prototype and Scriptaculous.
 * (c) 2007 Mathieu Jondet <mathieu@eulerian.com>
 * Eulerian Technologies
 *
 * DatePicker is freely distributable under the same terms as Prototype.
 *
 */

/**
 * DatePickerFormatter class for matching and stringifying dates.
 *
 * By Arturas Slajus <x11@arturaz.net>.
 */
var DatePickerFormatter = Class.create();
DatePickerFormatter.prototype = {
    /**
     * Create a DatePickerFormatter.
     *
     * format: specify a format by passing 3 value array consisting of
     *   "yyyy", "mm", "dd". Default: ["yyyy", "mm", "dd"].
     *
     * separator: string for splitting the values. Default: "-".
     *
     * Use it like this:
     *   var df = new DatePickerFormatter(["dd", "mm", "yyyy"], "/");
     *   df.current_date();
     *   df.match("7/7/2007");
     */
    initialize: function(format, separator) {
        if (typeof(format) == "undefined") { format = ["yyyy", "mm", "dd"] }
        if (typeof(separator) == "undefined") { separator = "-" }

        this._format = format;
        this.separator = separator;
                
        this._format_year_index = format.indexOf("yyyy");
        this._format_month_index = format.indexOf("mm");
        this._format_day_index = format.indexOf("dd");
                
        this._year_regexp = /^\d{4}$/;
        this._month_regexp = /^0\d|1[012]|\d$/;
        this._day_regexp = /^0\d|[12]\d|3[01]|\d$/;
    },
    
    /**
     * Match a string against date format.
     * Returns: [year, month, day]
     */
    match: function(str) {
        d = str.split(this.separator);
        
        if (d.length < 3) {
            return false;
        }
        
        year = d[this._format_year_index].match(this._year_regexp);
        if (year) { year = year[0] } else { return false }
        month = d[this._format_month_index].match(this._month_regexp);
        if (month) { month = month[0] } else { return false }
        day = d[this._format_day_index].match(this._day_regexp);
        if (day) { day = day[0] } else { return false }
        
        return [year, month, day];
    },
    
    /**
     * Return current date according to format.
     */
    current_date: function() {
        var d = new Date;
        return this.date_to_string(
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDay()
        );
    },
    
    /**
     * Return a stringified date accordint to format.
     */
    date_to_string: function(year, month, day, separator) {
        if (typeof(separator) == "undefined") { separator = this.separator }

        var a = [0, 0, 0];
        a[this._format_year_index] = year;
        a[this._format_month_index] = this.leftpad_with_zeroes(month, 2);
        a[this._format_day_index] = this.leftpad_with_zeroes(day, 2);
        
        return a.join(separator);
    },
    
    /**
     * Pad string from left with zeroes.
     *
     * Shameleslly stolen from http://www.eulerian.com/misc/datepicker/
     */
    leftpad_with_zeroes: function(str, padToLength) {
        var result	= '';
        for (var i = 0; i < (padToLength - String(str).length); i++ )
            result	+= '0';
        return result + str;
    }
}; 


/**
 * DatePicker
 */

var DatePicker	= Class.create();

DatePicker.prototype	= {
 Version	: 'dev',
 _relative	: null,
 _div		: null,
 _zindex	: 1,
 _keepFieldEmpty: false,
 _daysInMonth	: [31,28,31,30,31,30,31,31,30,31,30,31],
 /* language */
 _language	: 'en',
 _language_month	: $H({
  'fr'	: [ 'Janvier', 'F&#233;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 
   'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'D&#233;cembre' ],
  'en'	: [ 'January', 'February', 'March', 'April', 'May',
   'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
  'sp'	: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
  'it'	: [ 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
   'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre' ],
  'de'	: [ 'Januar', 'Februar', 'M&#228;rz', 'April', 'Mai', 'Juni',
   'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember' ],
  'pt'	: [ 'Janeiro', 'Fevereiro', 'Mar&#231;o', 'Abril', 'Maio', 'Junho',
   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
  'hu'	: [ 'Janu&#225;r', 'Febru&#225;r', 'M&#225;rcius', '&#193;prilis', 
   'M&#225;jus', 'J&#250;nius', 'J&#250;lius', 'Augusztus', 'Szeptember', 
   'Okt&#243;ber', 'November', 'December' ],
  'lt'  : [ 'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegu&#382;&#279;',
   'Bir&#382;elis', 'Liepa', 'Rugj&#363;tis', 'Rus&#279;jis', 'Spalis', 
   'Lapkritis', 'Gruodis' ]
 }),
 _language_day	: $H({
  'fr'	: [ 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim' ],
  'en'	: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
  'sp'	: [ 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'S&#224;b', 'Dom' ],
  'it'	: [ 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom' ],
  'de'	: [ 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam', 'Son' ],
  'pt'	: [ 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S&#225;', 'Dom' ],
  'hu'	: [ 'H&#233;', 'Ke', 'Sze', 'Cs&#252;', 'P&#233;', 'Szo', 'Vas' ],
  'lt'  : [ 'Pir', 'Ant', 'Tre', 'Ket', 'Pen', '&Scaron;e&scaron;', 'Sek' ]
 }),
 _language_close	: $H({
  'fr'	: 'fermer',
  'en'	: 'close',
  'sp'	: 'cierre',
  'it'	: 'fine',
  'de'	: 'schliessen',
  'pt'	: 'fim',
  'hu'	: 'bez&#225;r',
  'lt'  : 'udaryti'
 }),
 _language_date_format : $H({
    'en': [ ["mm", "dd", "yyyy"], "/" ],
    'lt': [ ["yyyy", "mm", "dd"], "-" ],
    'fr': [ ["dd", "mm", "yyyy"], "/" ],
    'sp': [ ["dd", "mm", "yyyy"], "/" ],
    'it': [ ["dd", "mm", "yyyy"], "/" ],
    'de': [ ["dd", "mm", "yyyy"], "/" ],
    'pt': [ ["dd", "mm", "yyyy"], "/" ],
    'hu': [ ["dd", "mm", "yyyy"], "/" ]
 }),
 /* date manipulation */
 _todayDate	: new Date(),
 _current_date	: null,
 _clickCallback	: Prototype.emptyFunction,
 _cellCallback	: Prototype.emptyFunction,
 _id_datepicker	: null,
 /* positionning */
 _topOffset	: 30,
 _leftOffset	: 0,
 _isPositionned	: false,
 _relativePosition : true,
 /* Effects Adjustment */
 _showEffect	: "appear", 
 _showDuration	: 1,
 _closeEffect	: "fade", 
 _closeEffectDuration: 0.3,
 /* afterClose : called when the close function is executed */
 _afterClose	: Prototype.emptyFunction,
 /* return the name of current month in appropriate language */
 getMonthLocale	: function ( month ) {
  return	this._language_month.get(this._language)[month];
 },
 getLocaleClose	: function () {
  return	this._language_close.get(this._language);
 },
 _initCurrentDate : function () {
  /* Create the DateFormatter */
  this._df = new DatePickerFormatter(
   this._language_date_format.get(this._language)[0],
   this._language_date_format.get(this._language)[1]
  );
  /* check if value in field is proper, if not set to today */
  this._current_date = $F(this._relative);
  if (! this._df.match(this._current_date)) {
    this._current_date = this._df.current_date();
   /* set the field value ? */
   if ( !this._keepFieldEmpty )
    $(this._relative).value = this._current_date;
  }
  var a_date = this._df.match(this._current_date);
  this._current_year 	= Number(a_date[0]);
  this._current_mon	= Number(a_date[1]) - 1;
  this._current_day	= Number(a_date[2]);
 },
 /* init */
 initialize	: function ( h_p ) {
  /* arguments */
  this._relative= h_p["relative"];
  if ( h_p["language"] )
   this._language = h_p["language"];
  this._zindex	= ( h_p["zindex"] ) ? parseInt(Number(h_p["zindex"])) : 1;
  if ( typeof(h_p["keepFieldEmpty"]) != 'undefined' )
   this._keepFieldEmpty	= h_p["keepFieldEmpty"];
  if ( typeof(h_p["clickCallback"]) == 'function' )
   this._clickCallback	= h_p["clickCallback"];
  if ( typeof(h_p["leftOffset"]) != 'undefined' )
   this._leftOffset	= parseInt(h_p["leftOffset"]);
  if ( typeof(h_p["topOffset"]) != 'undefined' )
   this._topOffset	= parseInt(h_p["topOffset"]);
  if ( typeof(h_p["relativePosition"]) != 'undefined' )
   this._relativePosition = h_p["relativePosition"];
  if ( typeof(h_p["showEffect"]) != 'undefined' )
   this._showEffect 	= h_p["showEffect"];
  if ( typeof(h_p["showDuration"]) != 'undefined' )
   this._showDuration 	= h_p["showDuration"];
  if ( typeof(h_p["closeEffect"]) != 'undefined' )
   this._closeEffect 	= h_p["closeEffect"];
  if ( typeof(h_p["closeEffectDuration"]) != 'undefined' )
   this._closeEffectDuration = h_p["closeEffectDuration"];
  if ( typeof(h_p["afterClose"]) == 'function' )
   this._afterClose	= h_p["afterClose"];
  if ( typeof(h_p["externalControl"]) != 'undefined' )
   this._externalControl= h_p["externalControl"];
  if ( typeof(h_p["cellCallback"]) == 'function' )
   this._cellCallback	= h_p["cellCallback"];
  this._id_datepicker		= 'datepicker-'+this._relative;
  this._id_datepicker_prev	= this._id_datepicker+'-prev';
  this._id_datepicker_next	= this._id_datepicker+'-next';
  this._id_datepicker_hdr	= this._id_datepicker+'-header';
  this._id_datepicker_ftr	= this._id_datepicker+'-footer';

  /* build up calendar skel */
  this._div = Builder.node('div', { 
    id 		: this._id_datepicker,
    className	: 'datepicker',
    style	: 'display: none; z-index: '+this._zindex 
   }, [
      /* header */
      Builder.node('div', { className : 'datepicker-header' }, [
       Builder.node('span', { 
	id : this._id_datepicker_prev, style : 'cursor: pointer;' }, ' << '),
       Builder.node('span', { id : this._id_datepicker_hdr }),
       Builder.node('span', { 
	id : this._id_datepicker_next, style : 'cursor: pointer;' }, ' >> ')
      ]),
      /* calendar */
      Builder.node('div', { className : 'datepicker-calendar' }, [
       Builder.node('table', { id : this._id_datepicker+'-table' }) ]),
      /* footer */
      Builder.node('div', { 
       id 	: this._id_datepicker_ftr,
       className: 'datepicker-footer' } )
  ]);
  /* finally declare the event listener on input field */
  Event.observe(this._relative, 
    'click', this.click.bindAsEventListener(this), false);
  /* need to append on body when doc is loaded for IE */
  Event.observe(window, 'load', this.load.bindAsEventListener(this), false);
 },
 /**
  * load	: called when document is fully-loaded to append datepicker
  *		  to main object.
  */
 load		: function () {
  /* if externalControl defined set the observer on it */
  if ( this._externalControl ) 
   Event.observe(this._externalControl, 'click',
    this.click.bindAsEventListener(this), false);
  /* append to page */
  if ( this._relativePosition ) {
   /* append to parnent node */
   if ( $(this._relative).parentNode ) 
    $(this._relative).parentNode.appendChild( this._div );
  } else {
   /* append to body */
   var body	= document.getElementsByTagName("body").item(0);
   if ( body )
    body.appendChild( this._div ); 
  }
  /* init the date in field if needed */
  this._initCurrentDate();
  /* set the close locale content */
  $(this._id_datepicker_ftr).innerHTML = this.getLocaleClose();
  /* declare the observers for UI control */
  Event.observe($(this._id_datepicker_prev), 
    'click', this.prevMonth.bindAsEventListener(this), false);
  Event.observe($(this._id_datepicker_next), 
    'click', this.nextMonth.bindAsEventListener(this), false);
  Event.observe($(this._id_datepicker_ftr), 
    'click', this.close.bindAsEventListener(this), false);
 },
 /**
  * click	: called when input element is clicked
  */
 click		: function () {
  if ( !this._isPositionned && this._relativePosition ) {
   /* position the datepicker relatively to element */
   var a_lt = Position.positionedOffset($(this._relative));
   $(this._id_datepicker).setStyle({
    'left'	: Number(a_lt[0]+this._leftOffset)+'px',
    'top'	: Number(a_lt[1]+this._topOffset)+'px'
   });
   this._isPositionned	= true;
  }
  if ( !$(this._id_datepicker).visible() ) {
   this._initCurrentDate();
   this._redrawCalendar();
  }
  /* eval the clickCallback function */
  eval(this._clickCallback());
  /* Effect toggle to fade-in / fade-out the datepicker */
  new Effect.toggle(this._id_datepicker, 
    this._showEffect, { duration: this._showDuration });
 },
 /**
  * close	: called when the datepicker is closed
  */
 close		: function () {
  eval(this._afterClose());
  switch(this._closeEffect) {
   case 'puff': 
    new Effect.Puff(this._id_datepicker, { duration : this._closeEffectDuration });
    break;
   case 'blindUp': 
    new Effect.BlindUp(this._id_datepicker, { duration : this._closeEffectDuration });
    break;
   case 'dropOut': 
    new Effect.DropOut(this._id_datepicker, { duration : this._closeEffectDuration }); 
    break;
   case 'switchOff': 
    new Effect.SwitchOff(this._id_datepicker, { duration : this._closeEffectDuration }); 
    break;
   case 'squish': 
    new Effect.Squish(this._id_datepicker, { duration : this._closeEffectDuration });
    break;
   case 'fold': 
    new Effect.Fold(this._id_datepicker, { duration : this._closeEffectDuration });
    break;
   case 'shrink': 
    new Effect.Shrink(this._id_datepicker, { duration : this._closeEffectDuration });
    break;
   default: 
    new Effect.Fade(this._id_datepicker, { duration : this._closeEffectDuration });
    break;
  }
 },
 /**
  * setPosition	: set the position of the datepicker.
  *  param : t=top | l=left
  */
 setPosition	: function ( t, l ) {
  var h_pos	= { 'top' : '0px', 'left' : '0px' };
  if ( typeof(t) != 'undefined' )
   h_pos['top']	= Number(t)+this._topOffset+'px';
  if ( typeof(l) != 'undefined' )
   h_pos['left']= Number(l)+this._leftOffset+'px';
  $(this._id_datepicker).setStyle(h_pos);
  this._isPositionned	= true;
 },
 /**
  * _leftpad_zero : pad the provided string to given number of 0
  */
  /** CHECK toPaddedString: from http://dev.rubyonrails.org/changeset/6363 */
 _leftpad_zero	: function ( str, padToLength ) {
  var result	= '';
  for ( var i = 0; i < (padToLength - String(str).length); i++ )
   result	+= '0';
  return	result + str;
 },
 /**
  * _getMonthDays : given the year and month find the number of days.
  */
 _getMonthDays	: function ( year, month ) {
  if (((0 == (year%4)) && 
   ( (0 != (year%100)) || (0 == (year%400)))) && (month == 1))
   return 29;
  return this._daysInMonth[month];
 },
 /**
  * _buildCalendar	: draw the days array for current date
  */
 _buildCalendar		: function () {
  var _self	= this;
  var tbody	= document.createElement('tbody');
  /* generate day headers */
  var trDay	= document.createElement('tr');
  this._language_day.get(this._language).each( function ( item ) {
   var td	= document.createElement('td');
   td.innerHTML	= item;
   td.className	= 'wday';
   trDay.appendChild( td );
  });
  tbody.appendChild( trDay );
  /* generate the content of days */
  
  /* build-up days matrix */
  var a_d	= [
    [ 0, 0, 0, 0, 0, 0, 0 ]
   ,[ 0, 0, 0, 0, 0, 0, 0 ]
   ,[ 0, 0, 0, 0, 0, 0, 0 ]
   ,[ 0, 0, 0, 0, 0, 0, 0 ]
   ,[ 0, 0, 0, 0, 0, 0, 0 ]
   ,[ 0, 0, 0, 0, 0, 0, 0 ]
  ];
  /* set date at beginning of month to display */
  var d		= new Date(this._current_year, this._current_mon, 1, 12);
  /* start the day list on monday */
  var startIndex	= ( !d.getDay() ) ? 6 : d.getDay() - 1;
  var nbDaysInMonth	= this._getMonthDays(
    this._current_year, this._current_mon);
  var daysIndex		= 1;
  for ( var j = startIndex; j < 7; j++ ) {
   a_d[0][j]	= { 
     d : daysIndex
    ,m : this._current_mon
    ,y : this._current_year 
   };
   daysIndex++;
  }
  var a_prevMY	= this._prevMonthYear();
  var nbDaysInMonthPrev	= this._getMonthDays(a_prevMY[1], a_prevMY[0]);
  for ( var j = 0; j < startIndex; j++ ) {
   a_d[0][j]	= { 
     d : Number(nbDaysInMonthPrev - startIndex + j + 1) 
    ,m : Number(a_prevMY[0])
    ,y : a_prevMY[1]
    ,c : 'outbound'
   };
  }
  var switchNextMonth	= false;
  var currentMonth	= this._current_mon;
  var currentYear	= this._current_year;
  for ( var i = 1; i < 6; i++ ) {
   for ( var j = 0; j < 7; j++ ) {
    a_d[i][j]	= { 
      d : daysIndex
     ,m : currentMonth
     ,y : currentYear
     ,c : ( switchNextMonth ) ? 'outbound' : ( 
      ((daysIndex == this._todayDate.getDate()) &&
        (this._current_mon  == this._todayDate.getMonth()) &&
        (this._current_year == this._todayDate.getFullYear())) ? 'today' : null)
    };
    daysIndex++;
    /* if at the end of the month : reset counter */
    if ( daysIndex > nbDaysInMonth ) {
     daysIndex	= 1;
     switchNextMonth = true;
     if ( this._current_mon + 1 > 11 ) {
      currentMonth = 0;
      currentYear += 1;
     } else {
      currentMonth += 1;
     }
    }
   }
  }

  /* generate days for current date */
  for ( var i = 0; i < 6; i++ ) {
   var tr	= document.createElement('tr');
   for ( var j = 0; j < 7; j++ ) {
    var h_ij	= a_d[i][j];
    var td	= document.createElement('td');
    /* id is : datepicker-day-mon-year or depending on language other way */
    /* don't forget to add 1 on month for proper formmatting */
    var id	= $A([
     this._relative,
     this._df.date_to_string(h_ij["y"], h_ij["m"]+1, h_ij["d"], '-')
    ]).join('-');
    /* set id and classname for cell if exists */
    td.setAttribute('id', id);
    if ( h_ij["c"] )
     td.className	= h_ij["c"];
    /* on onclick : rebuild date value from id of current cell */
    td.onclick	= function () { 
     $(_self._relative).value = String($(this).readAttribute('id')
        ).replace(_self._relative+'-','').replace(/-/g, _self._df.separator);
     /* if we have a cellCallback defined call it and pass it the cell */
     if ( _self._cellCallback )
       _self._cellCallback(this);
     _self.close(); 
    };
    td.innerHTML= h_ij["d"];
    tr.appendChild( td );
   }
   tbody.appendChild( tr );
  }
  return	tbody;
 },
 /**
  * nextMonth	: redraw the calendar content for next month.
  */
 _nextMonthYear	: function () {
  var c_mon	= this._current_mon;
  var c_year	= this._current_year;
  if ( c_mon + 1 > 11 ) {
   c_mon	= 0;
   c_year	+= 1;
  } else {
   c_mon	+= 1;
  }
  return	[ c_mon, c_year ];
 },
 nextMonth	: function () {
  var a_next		= this._nextMonthYear();
  this._current_mon	= a_next[0];
  this._current_year 	= a_next[1];
  this._redrawCalendar();
 },
 /**
  * prevMonth	: redraw the calendar content for previous month.
  */
 _prevMonthYear	: function () {
  var c_mon	= this._current_mon;
  var c_year	= this._current_year;
  if ( c_mon - 1 < 0 ) {
   c_mon	= 11;
   c_year	-= 1;
  } else {
   c_mon	-= 1;
  }
  return	[ c_mon, c_year ];
 },
 prevMonth	: function () {
  var a_prev		= this._prevMonthYear();
  this._current_mon	= a_prev[0];
  this._current_year 	= a_prev[1];
  this._redrawCalendar();
 },
 _redrawCalendar	: function () {
  this._setLocaleHdr();
  var table	= $(this._id_datepicker+'-table');
  try {
   while ( table.hasChildNodes() )
    table.removeChild(table.childNodes[0]);
  } catch ( e ) {}
  table.appendChild( this._buildCalendar() );
 },
 _setLocaleHdr	: function () {
  /* next link */
  var a_next	= this._nextMonthYear();
  $(this._id_datepicker_next).setAttribute('title',
   this.getMonthLocale(a_next[0])+' '+a_next[1]);
  /* prev link */
  var a_prev	= this._prevMonthYear();
  $(this._id_datepicker_prev).setAttribute('title',
   this.getMonthLocale(a_prev[0])+' '+a_prev[1]);
  /* header */
  $(this._id_datepicker_hdr).update('&nbsp;&nbsp;&nbsp;'+this.getMonthLocale(this._current_mon)+'&nbsp;'+this._current_year+'&nbsp;&nbsp;&nbsp;');
 }
};
