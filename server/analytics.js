var name = "analytics";
var version = "1.0";

Meteor.startup(function(){
    
    console.log("loading analytics package");

    Greenlight.register_template(name, version);
        
});