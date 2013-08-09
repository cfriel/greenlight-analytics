Template.analytics_page.databases = function () 
{
    return Databases.find({}, {sort: {name: 1}});
};

Deps.autorun(function(){

    var database = Session.get("analytics_page_database");
    var collection = Session.get("analytics_page_collection");
 
    if(database && collection)
    {   
	Meteor.call('load', database, collection, {}, 0, 100, function(loadErr, loadResult){
	    Meteor.call('schema', database, collection, function(schemaErr, schemaResult){
		var schema = schemaResult;
		
		var query = { _collection : collection };
		
		var data = Data.find(query, {limit : 100}).fetch();
		
		var columns = [];
		var keys = Object.keys(schema);
		
		for(var i = 0; i < keys.length; i++)
		{
		    columns[i] = { id: keys[i], name: keys[i], field: keys[i], minWidth: 100, editor: Slick.Editors.Text, sortable: true };
		}

		renderGrid(columns, data);
		
	    });
	});
    }
});

var configureEditor = function()
{
    var mime = ' text/javascript';
    
    window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets : true,
        autofocus: true
    });
    
    window.editor.on("change", function(cm) { 
	var text = cm.getValue(); 
	
	clearTimeout($(this).data('timeout'));
	$(this).data('timeout', setTimeout(function(){
	    eval(text);
	}, 2000));
	
    });

};

var Local = null;

var renderGrid = function(columns, data)
{    
    Local = data;

    var options = {
	enableCellNavigation: true,
	enableColumnReorder: false,
	rowHeight: 30,
	editable: false,
	autoEdit: true,
        forceFitColumns: true
    };
    
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
	     
    //$('#slick-container').height($(window).height() - 500);
    //$('#visualization-container').height($(window).height() - 500);
    
    //$(window).resize(function() {
//	$('#slick-container').height($(window).height() - 300);
//	$('#visualization-container').height($(window).height() - 300);
//	$(".slick-viewport").height($("#slick-container").height());
  //  });   
}

var rendered = false;

Template.analytics_page.created = function()
{
    rendered = false;
}

Template.analytics_page.rendered = function() 
{

    if(!rendered)
    {
	rendered = true;

	configureEditor();
    }
}




