Template.analytics_page.datasets = function () 
{
    return Greenlight.Dataset.Datasets.find({}, {sort: {name: 1}});
};

Template.analytics_page.root = function()
{
    return "/analytics";
};

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

Deps.autorun(function(){
    
    var data = [];
    var columns = [];
    
    var datasetName = Session.get("analytics_dataset");

    var dataset = Greenlight.Dataset.Datasets.findOne({name: datasetName});

    if(dataset != undefined)
    {
	var schema = dataset.schema;
	
	var query = { _collection : dataset.collection };
	
	var data = Data.find(query, {limit : 100}).fetch();
	
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
    var activity = new Greenlight.Activity(title, description, source, audience);

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
