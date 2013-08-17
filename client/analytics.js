var name = "analytics";
var version = "1.0";

analytics = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }
};

analytics.prototype = new Greenlight.Package();
analytics.prototype.constructor = analytics;

analytics.prototype.instantiate = function(site)
{
    var url = site.url;

    if(url)
    {
	var siteRoutes = function(site)
	{
	    var root = '/'+site.url;

	    var roots = {};

	    roots[root] = function(){

		Greenlight.log("calling /analytics route");
		Session.set('site', site);

		return 'analytics_page';

	    };
		
	    roots[root+'/:dataset'] = function(dataset){
		
		Greenlight.log("calling /analytics/:dataset route");
		Session.set('site', site);
		Session.set('analytics_dataset', dataset);

		var dataset = Greenlight.Dataset.findOne({ name: dataset });
		
		if(dataset)
		{
		    Greenlight.Dataset.load(dataset);
		}
		
		return 'analytics_page';
	    };
		

	    return roots;

	}(site);
	    
	Meteor.Router.add(siteRoutes);
    }

};

Greenlight.Packages.Analytics = analytics.prototype;

Meteor.startup(function(){

    Greenlight.log("loading analytics package");
    
    Greenlight.register_package(name, version, Greenlight.Packages.Analytics);

});

