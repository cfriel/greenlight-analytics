

Template.analytics_page.datasets = function () 
{
    var site = Session.get('site');

    if(site)
    {
	return Greenlight.Datasets.find({_id : {$in : site.collections}}, {sort: {name: 1}});
    }
};

Template.analytics_page.root = function()
{
    var site = Session.get('site');
    
    if(site)
    {
	return '/'+site.url;
    }
    else
    {
	return "/analytics";
    }
};

var configureEditor = function()
{
    window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
	mode: "javascript",
        //indentWithTabs: true,
        //smartIndent: true,
        lineNumbers: true,
        //matchBrackets : true,
        //autofocus: true
    });
    
    window.editor.on("change", function(cm) { 

	var text = cm.getValue(); 

	renderVisualization(text);

    });

};

var renderVisualization = function(text)
{    
    clearTimeout($(this).data('timeout'));
 
    $(this).data('timeout', setTimeout(function(){
	$('#visualization-container').html('');
	eval(text);
    }, 2000));
    
};

Template.analytics_page.events = {
    'click #visualization-tab': function(){
	var text = window.editor.getValue();
	renderVisualization(text);
    }
};

Deps.autorun(function(){
    
    var data = [];
    var columns = [];
    
    var datasetName = Session.get("analytics_dataset");

    var dataset = Greenlight.Datasets.findOne({name: datasetName});

    if(dataset != undefined)
    {
	var schema = dataset.schema;
	
	var query = { _collection : dataset.collection };
	
	var data = Data.find(query, {limit : 100}).fetch();
	Greenlight.Packages.Analytics.Data = data;

	var columns = [];
	var keys = Object.keys(schema);
	
	for(var i = 0; i < keys.length; i++)
	{
	    columns[i] = { id: keys[i], name: keys[i], field: keys[i], minWidth: 120, editor: Slick.Editors.Text, sortable: true };
	}
	
	var grid = Greenlight.Helpers.create_slickgrid("#analytics-container", data, columns);	
    }
});


var rendered = false;

Template.analytics_page.created = function()
{
    rendered = false;

    var title = "Analytics page loaded";
    var description = "The created event of the profile page was called";
    var source = "Template.analytics_page";
    var audience = "";
    var activity = new Greenlight.Activity({title:title, description:description, source:source, audience:audience});

    activity.save();

}

Template.analytics_page.rendered = function() 
{
    if(!rendered)
    {
	rendered = true;

	configureEditor();
    }
}
