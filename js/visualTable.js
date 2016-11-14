var loadData = function() {

	var title  = ['Title'];
	var number = [1,2,3,4,5,6,7,8,9,10];
	var container = d3.select('.container');
	var table = container.append('table');

var addHeader = function(title,scale){
	var type = 'th';
	var row  = table.append('tr');
	var td = row.selectAll(type).data(title.concat(number))
	td.enter()
		.append(type)
		.text(function(d,i){ return i ? scale(d) : d ;})
		.classed('header',true);
}

var addRow = function(title,scale,type){
	var header = d3.selectAll('.header');
	// type = type || 'td';
	type = 'td';
	var row  = table.append('tr');
	var data = header.data();
	data[0] = title[0];
	var td = row.selectAll(type).data(data)
	td.enter()
		.append(type)
		.text(function(d,i){ return i ? scale(d) : d ;})
}	
	
addHeader(title,d3.scaleIdentity());
addRow(['n'],d3.scaleIdentity());
addRow(['n square'],d3.scalePow().exponent(2));
addRow(['log(n)'],d3.scaleLog());
addRow(['log(n) rounded'],d3.scaleLog().rangeRound([0,1]));

}

window.onload = loadData;