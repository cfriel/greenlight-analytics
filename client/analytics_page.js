Template.analytics_page.rendered = function() 
{
    var mime = 'text/x-mariadb';

    // get mime type
    if (window.location.href.indexOf('mime=') > -1) {
	mime = window.location.href.substr(window.location.href.indexOf('mime=') + 5);
    }

    window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
	mode: mime,
	indentWithTabs: true,
	smartIndent: true,
	lineNumbers: true,
	matchBrackets : true,
	autofocus: true
    });
    
    $('#btn-run').click(function() {
	
	$('#query-info').html('Query running')
	
	grid.setData({});

	for (var i = 10000; i-- > 0;) {
	    data[i] = {
		row: i,
		title: "Task " + i,
		duration: "5 days",
		percentComplete: Math.round(Math.random() * 100),
		start: "01/01/2009",
		finish: "01/05/2009",
		effortDriven: (i % 5 == 0),
		c7: "C7-" + i,
		c8: "C8-" + i,
		c9: "C9-" + i,
		c10: "C10-" + i,
		c11: "C11-" + i,
		c12: "C12-" + i,
		c13: "C13-" + i,
		c14: "C14-" + i,
		c15: "C15-" + i,
		c16: "C16-" + i,
		c17: "C17-" + i
	    };
	}
	
	var i=0;
	var callbackDuration = 200;
	var queryDuration = 3000;
	var callbackCount = queryDuration / callbackDuration;
		
	var refreshId = setInterval(function() {
	    i++;
	    $('#query-info').html('Query running (' + Math.round(100 * i / callbackCount) + '%)');
	}, callbackDuration);

	setTimeout(function() {
	    clearInterval(refreshId);
	
	    $('#query-info').html('Query completed in <span id="query-time">' +  queryDuration / 1000.+' seconds</span>, processed <span id="query-size">1.3 TB</span>');
	    
	    grid = new Slick.Grid("#slick-container", data, columns, options);
	    
	    grid.setSelectionModel(new Slick.CellSelectionModel());
	}, queryDuration);
	
    })

    $('#slick-container').height($(window).height() - 345);

    $(window).resize(function() {
	$('#slick-container').height($(window).height() - 345);
	$(".slick-viewport").height($("#slick-container").height());
    });

    var grid,
    data = [],
    columns = [
	{ id: "row", name: "Row", field: "row", width: 50},
	{ id: "title", name: "Title", field: "title", width: 120, editor: Slick.Editors.Text },
	{ id: "duration", name: "Duration", field: "duration", width: 120 },
	{ id: "%", name: "% Complete", field: "percentComplete", width: 120 },
	{ id: "start", name: "Start", field: "start", width: 120 },
	{ id: "finish", name: "Finish", field: "finish", width: 120 },
	{ id: "effort-driven", name: "Effort Driven", field: "effortDriven", width: 120 },
	{ id: "c7", name: "C7", field: "c7", width: 120 },
	{ id: "c8", name: "C8", field: "c8", width: 120 },
	{ id: "c9", name: "C9", field: "c9", width: 120 },
	{ id: "c10", name: "C10", field: "c10", width: 120 },
	{ id: "c11", name: "C11", field: "c11", width: 120 },
	{ id: "c12", name: "C12", field: "c12", width: 120 },
	{ id: "c13", name: "C13", field: "c13", width: 120 },
	{ id: "c14", name: "C14", field: "c14", width: 120 },
	{ id: "c15", name: "C15", field: "c15", width: 120 },
	{ id: "c16", name: "C16", field: "c16", width: 120 },
	{ id: "c17", name: "C17", field: "c17", width: 120 }
    ],
    options = {
	enableCellNavigation: true,
	enableColumnReorder: false,
	rowHeight: 30,
	editable: false,
	autoEdit: true
    };

    grid = new Slick.Grid("#slick-container", data, columns, options);


};

