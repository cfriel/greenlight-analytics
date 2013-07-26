Template.analytics_page.rendered = function() 
{
    var data = [];
    var columns = [];
    
    var options = {
	enableCellNavigation: true,
	enableColumnReorder: false,
	rowHeight: 30,
	editable: false,
	autoEdit: true
    };
    
    var grid = new Slick.Grid("#slick-container", data, columns, options);
    $('#query-info').html('Query running')

    grid.setData({});
    
    var database = Session.get("analytics_page_database");
    var collection = Session.get("analytics_page_collection");
    
    if(collection != undefined && database != undefined)
    {
	Meteor.call('load', database, collection, {}, 0, 100, function(loadErr, loadResult)
		    {
			Meteor.call('schema', database, collection, function(schemaErr, schemaResult)
				    {
					var schema = schemaResult;
					
					var query = { _collection : collection };
					
					var data = Data.find(query, {limit : 100}).fetch();
					
					var columns = [];
					var keys = Object.keys(schema);
					
					for(var i = 0; i < keys.length; i++)
					{
					    columns[i] = { id: keys[i], name: keys[i], field: keys[i], width: 120, editor: Slick.Editors.Text, sortable: true };
					}
					
					grid = new Slick.Grid("#slick-container", data, columns, options);

					grid.onSort.subscribe(function(e, args){ // args: sort information. 
					    var field = args.sortCol.field;
					    
					    data.sort(function(a, b){
						var result = 
						    a[field] > b[field] ? 1 :
						    a[field] < b[field] ? -1 :
						    0;
						
						return args.sortAsc ? result : -result;
					    });
					    
					    grid.invalidate();         
					});
					
					grid.setSelectionModel(new Slick.CellSelectionModel()); 
					
				    });
		    });
    }

    $('#slick-container').height($(window).height() - 65);

    $(window).resize(function() {
	$('#slick-container').height($(window).height() -65);
	$(".slick-viewport").height($("#slick-container").height() + 65);
    });
    
    
}




