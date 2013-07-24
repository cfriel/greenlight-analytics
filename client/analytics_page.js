Template.analytics_page.rendered = function() 
{
    $('#btn-run').click(function() {
	
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
						   
						   var data = Data.find(query).fetch();
						   
						   var columns = [];
						   var keys = Object.keys(schema);
						   
						   for(var i = 0; i < keys.length; i++)
						   {
						       columns[i] = { id: keys[i], name: keys[i], field: keys[i], width: 120, editor: Slick.Editors.Text };
						   }
						   
						   grid = new Slick.Grid("#slick-container", data, columns, options);
						   
						   grid.setSelectionModel(new Slick.CellSelectionModel()); 
						   
					       });
			       }
		   );
	}
    });

    $('#slick-container').height($(window).height() - 110);

    $(window).resize(function() {
	$('#slick-container').height($(window).height() - 110);
	$(".slick-viewport").height($("#slick-container").height() + 110);
    });

    var grid,
    data = [],
    columns = [],
    options = {
	enableCellNavigation: true,
	enableColumnReorder: false,
	rowHeight: 30,
	editable: false,
	autoEdit: true
    };

    grid = new Slick.Grid("#slick-container", data, columns, options);


};

