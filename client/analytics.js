var loadDatabases = function()
{
    Meteor.call('databases', function(err, result)
		{
		    if(err)
		    {
			console.log("Failed to load databases");
		    }
		    else
		    {
			Session.set("databases_loaded", true);
		    }
		});
    
};

var ensureLoadDatabases = function()
{
    var databasesLoaded = Session.get("databases_loaded");

    if(!databasesLoaded)
    {
	loadDatabases();
    }
};

Meteor.Router.add({
    '/analytics': function(path)
    {
	ensureLoadDatabases();

	return 'analytics_page';
    },

    '/analytics/:database/:collection' : function(database, collection)
    {
 
	Session.set('analytics_page_database', database);
	Session.set('analytics_page_collection', collection);

	ensureLoadDatabases();

	return 'analytics_page';
    }
});