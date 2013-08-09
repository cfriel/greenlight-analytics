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
    
    '/analytics/:database/:collection' : function(database, collection)
    { 
	console.log("calling /analytics/:database/:collection route");

	Session.set('analytics_page_database', database);
	Session.set('analytics_page_collection', collection);
	
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

Analytics = analytics.prototype;

console.log("loading analytics package");

Greenlight.register_template(name, version, Analytics);


