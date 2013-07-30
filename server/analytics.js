var name = "analytics";
var version = "1.0";

Meteor.startup(function(){
    
    console.log("loading analytics package");
    
    if(!SiteTemplates.findOne( { name: name, version: version }))
    {
	console.log("registering " + name + " site template");
	SiteTemplates.insert( { name : name, version : version } );
    }
    
});