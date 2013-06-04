
function Calendar(
    element /* jQuery object */
    )
{
    this.element = element;
    
    element.load( "scripts/calendartemplate.html", function () {
        var headElement = element.find( "thead" );
        var dayRow = $( "<tr>" );
        dayRow.append( "<td>Sun</td>" );
        dayRow.append( "<td>Mon</td>" );
        dayRow.append( "<td>Tue</td>" );
        dayRow.append( "<td>Wed</td>" );
        dayRow.append( "<td>Thu</td>" );
        dayRow.append( "<td>Fri</td>" );
        dayRow.append( "<td>Sat</td>" );
        headElement.append( dayRow );
        
        for( var i = 0; i < 7; i++ )
        {
            var weekRow = tableElement.append( "<tr>" );
        }
    });
    
    this.addColumn = function( )
    {
        
    }
}