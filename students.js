var getSubjects = function(students){
	return students.map((d)=>d.subject);
}

var sortBy = function(key){
	return d3.selectAll('.students').sort(function(a,b){ 
		return d3.ascending(a[key],b[key]); 
	});
};

var displayStudents = function (data,subjects) {
	var colorScale = d3.scaleOrdinal()
		.domain(subjects)
		.range(d3.schemeCategory10);

	var XScale = d3.scaleLinear().domain([0,100]).range([0,500]);

	var container = d3.select('.container');
	var divs = container.selectAll('div').data(data);

	divs.enter()
		.append('div')
		.classed('students',true)
		.style('width',function(d) {return XScale(d.score)+'px';})
		.style('background-color',function(d,i){return colorScale(d.subject);})
		.text(function(d){return d.name +' ' + d.score; })

	//sorting
	var sorts = container.append('div').classed('sorts',true).text('Sort by:');

	var sortButton = sorts.selectAll('button').data(['Name','Subject','Score']);

	sortButton	
		.enter()
		.append('button')
		.on("click",function(k){ return sortBy(k.toLowerCase());})
		.text(function(d){return d;});

	//Legend
	var legend = container.append('div').classed('legend',true).text('Subjects:');

	var subjectLegend = legend.selectAll('button').data(colorScale.domain());

	subjectLegend	
		.enter()
		.append('button')
		.style('background-color',function(d,i){return colorScale(d);})
		.text(function(d){return d;});
}

var parse = function(err,students){
	var subjects = getSubjects(students);
	displayStudents(students,subjects);
}

d3.json("./students.json",parse)