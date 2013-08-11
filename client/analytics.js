var name = "analytics";
var version = "1.0";

analytics = function(){};

analytics.prototype = new Greenlight.Package();

analytics.prototype.routes =   {
    
    '/analytics': function()
    {
	console.log("calling /analytics route");

	return 'analytics_page';
    },
    
    '/analytics/:dataset' : function(dataset)
    { 
	console.log("calling /analytics/:dataset route");

	Session.set('analytics_dataset', dataset);

	var dataset = Greenlight.Dataset.findOne({ name: dataset });

	if(dataset)
	{
	    Greenlight.Dataset.load(dataset);
	}
	
	return 'analytics_page';
    }
};

analytics.prototype.default_route = {

    '/' : function()
    {
	console.log("calling default route");

	return 'analytics_page';
    }

};

Greenlight.Packages.Analytics = analytics.prototype;

Meteor.startup(function(){

    console.log("loading analytics package");
    
    Greenlight.register_package(name, version, Greenlight.Packages.Analytics);

});

