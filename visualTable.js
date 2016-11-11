var loadData = function() {

	var title  = ['Title'];
	var number = [1,2,3,4,5,6,7,8,9,10];
	var container = d3.select('.container');
	var table = container.append('table');

var addRow = function(title,scale,type){
	type = type || 'td';
	var row  = table.append('tr');
	var td = row.selectAll(type).data(title.concat(number))
	td.enter()
		.append(type)
		.text(function(d,i){ if(i==0) return d; return scale(d);})
}	
	
addRow(title,d3.scaleIdentity() ,'th');
addRow(['n'],d3.scaleIdentity());
addRow(['n square'],d3.scalePow().exponent(2));
addRow(['log(n)'],d3.scaleLog());
addRow(['log(n) rounded'],d3.scaleLog().rangeRound([0,1]));

}

window.onload = loadData;