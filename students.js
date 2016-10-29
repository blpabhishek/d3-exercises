var students = [
	{name:'ramesh',subject:'maths',score:87},
	{name:'suresh',subject:'maths',score:45},
	{name:'pokemon',subject:'english',score:65},
	{name:'mary',subject:'kannada',score:44},
	{name:'riya',subject:'science',score:72},
	{name:'katie',subject:'social studies',score:82},
	{name:'katie',subject:'maths',score:98},
	{name:'ramesh',subject:'bengali',score:25},
	{name:'suresh',subject:'science',score:55},
	{name:'riya',subject:'tamil',score:75},
	{name:'pokemon',subject:'sports',score:95},
	{name:'pokemon',subject:'social studies',score:32}
];

var getSubjects = function(students){
	return students.map((d)=>d.subject).filter((v,i,a)=>a.indexOf(v) == i);
}

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
		.attr("id",function(d){return d;})
		.on("click",function(r){ return sortBy(r.toLowerCase());})
		.text(function(d){return d;});

	//Legend
	var legend = container.append('div').classed('legend',true).text('Subjects:');

	var subjectLegend = legend.selectAll('button').data(subjects);

	subjectLegend	
		.enter()
		.append('button')
		.style('background-color',function(d,i){return colorScale(d);})
		.text(function(d){return d;});
}

var sortBy = function(key){
	return d3.selectAll('.students').sort(function(a,b){ 
		return d3.ascending(a[key],b[key]); 
	});
};

var subjects = getSubjects(students);
displayStudents(students,subjects);