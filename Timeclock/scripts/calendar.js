
/* Credit to: http://stackoverflow.com/questions/2483719/get-weeks-in-month-through-javascript */
Date.prototype.countWeeksOfMonth = function() {
    var year         = this.getFullYear();
    var month_number = this.getMonth();
    var firstOfMonth = new Date(year, month_number, 1);
    var lastOfMonth  = new Date(year, month_number+1, 0);
    var used         = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil( used / 7 );
}

Date.prototype.getMonthName = function() {
    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    return monthNames[this.getMonth()];
}

function Calendar(
    element, /* jQuery object */
    loadedCallback /* JS function object */
    )
{
    this.element = element;
    var currentDate = new Date( 2000, 1, 1);
    
    element.load( "scripts/calendartemplate.html", function () {
        var headElement = element.find( "thead" );
        var dayRow = $( "<tr id='dayRow'>" );
        dayRow.append( "<td>Sun</td>" );
        dayRow.append( "<td>Mon</td>" );
        dayRow.append( "<td>Tue</td>" );
        dayRow.append( "<td>Wed</td>" );
        dayRow.append( "<td>Thu</td>" );
        dayRow.append( "<td>Fri</td>" );
        dayRow.append( "<td>Sat</td>" );
        headElement.append( dayRow );
        
        this.updateDisplay( );
        
        loadedCallback( );
    }.bind( this ));
    
    /* Returns an index that can be used for later modifying the newly-created column */
    this.addColumn = function(
        columnName, /* Label of the column that will be inserted at the end of the table */
        aggregator /* Callback that will be referenced for filling in the values of the column */
        )
    {
        var dayRow = element.find( "#dayRow" );
        newColumn = $( "<td>" + columnName + "</td>" );
        newColumn.get( 0 ).aggregator = aggregator;
        dayRow.append( newColumn );
        
        return dayRow.children( ).length;
    }
    
    this.updateDisplay = function(
        )
    {
        $( "#month-header" ).empty( );
        $( "#month-header" ).append( currentDate.getMonthName( ) );
        
        var weekCount = currentDate.countWeeksOfMonth( );
        
        var tableBody = element.find( "tbody" );
        tableBody.empty( );
        
        var currentDisplayDate = new Date( currentDate.getFullYear( ), currentDate.getMonth( ), 1 );
        currentDisplayDate.setDate( -currentDisplayDate.getDay( ) + 1 );
        
        for( var week = 0; week < weekCount; week++ )
        {
            var newRow = $( "<tr>" );
            
            for( var i = 0; i < 7; i++ )
            {
                var currentDayElement = $("<td>" + currentDisplayDate.getDate( ).toString( ) + "</td>");
                if( currentDisplayDate.getMonth( ) != currentDate.getMonth( ) )
                    currentDayElement.addClass( "dayOutsideMonth" );
                newRow.append( currentDayElement );
                currentDisplayDate.setDate( currentDisplayDate.getDate( ) + 1 );
            }
            
            tableBody.append( newRow );
        }
    }
    
    this.setDate = function(
        date /* A JavaScript date object */
        )
    {
        currentDate = date;
    }
    
    this.setMonth = function(
        monthIndex /* Month, in the range [1, 12] */
        )
    {
        currentDate.setMonth( monthIndex - 1 );
    }
    
    this.setYear = function(
        year
        )
    {
        currentDate.setFullYear( year );
    }
    
    this.setSelectedDay = function(
        day /* The numerical day within the current month to be set. Will be clamped appropriately. */
        )
    {
        
    }
}