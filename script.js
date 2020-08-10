// обработчик событий
$(document).ready(function() {	
	let data = new Data;	
				
	// Добавление секции
	$(document).on("click", "#js-addsection", function(event) {
		event.preventDefault();
		data.sectionAdd( $(this) );
	});
				
	// Удаление секции
	$(document).on("click", "button[name=remove-section]", function(event) {
		event.preventDefault();
		data.sectionRemove( $(this) );
	});


	// Добавление этажа
	$(document).on("submit", ".addFloor", function(event) {
		event.preventDefault();
		data.floorAdd( $(this) );
	});
	
	// Удаление этажа
	$(document).on("click", ".js-floor", function(event) {
		event.preventDefault();
		data.removeFloor( $(this) );
	});
				
	// (в будущем) выпадающий список особенностей уникальных квратир
	$(document).on("change", ".specialFloorCheckbox input[type=checkbox]", function() {
		let elem = $(this),
			elem2 = $(".specialFloorTags");
						
		if( elem.is(":checked") ) {
			elem2.show();
		} else {
			elem2.hide();
		}				
	})
					
	// Открытие поля добавления новой квартиры
	$(document).on("submit", ".tableFloor form", function(event) {
		event.preventDefault();
		data.openApartmentWindow( $(this) );
	});

	// Добавление новой квартиры
	$(document).on("submit", "#jsCreateFloor form", function(event) {
		event.preventDefault();
		data.addApartment( $(this) );	
	});
	
	// Удаление квартиры
	$(document).on("click", ".js-apartment", function(event) {
		event.preventDefault();
		data.removeApartment( $(this) );
	});










function fnExcelReport() {
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById('xyesos'); // id of table

    for(j = 0 ; j < tab.rows.length ; j++) 
    {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    }  
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

    return (sa);
}

$(".exportExcel").click(function(event) {
	event.preventDefault();
	
	fnExcelReport();
});









var tableToExcel = (function() {
		var uri = 'data:application/vnd.ms-excel;base64,'
		, template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
		, base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
		, format = function(s, c) { 	    	 
			return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) 
		}
		, downloadURI = function(uri, name) {
		    var link = document.createElement("a");
		    link.download = name;
		    link.href = uri;
		    link.click();
		}

		return function(table, name, fileName) {
			if (!table.nodeType) table = document.getElementById(table)
				var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
			var resuri = uri + base64(format(template, ctx))
			downloadURI(resuri, fileName);
		}
	})();  


// params: element id, sheet name, file name
    tableToExcel('resultTable','Смета', 'Ремрайон_смета.xls');

	
});