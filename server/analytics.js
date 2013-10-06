var name = "analytics";
var version = "1.0";

analytics = function(){};

analytics.prototype = new Greenlight.Package();

analytics.prototype.routes =   {
    
    '/analytics': function()
    {
	Greenlight.log("calling /analytics route");

	return 'analytics_page';
    },
    
    '/analytics/:database/:collection' : function(database, collection)
    { 
	Greenlight.log("calling /analytics/:database/:collection route");

	Session.set('analytics_page_database', database);
	Session.set('analytics_page_collection', collection);
	
	return 'analytics_page';
    }
};

analytics.prototype.metadata = function()
{
    
    return {
	description : "The analytics package provides functionality related to data processing and visualization.  Integrated with D3.js, it supports custom charting and visualization of any datasets available in the system."
    };
}();

Greenlight.Packages.Analytics = analytics.prototype;

Meteor.startup(function(){
    
    Greenlight.log("loading analytics package");

    Greenlight.register_package(name, version, Greenlight.Packages.Analytics);
        
});