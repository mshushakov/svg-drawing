var svg = document.querySelector('svg');
var stage = new SVGStage(svg);
var elem, point, dragging = false;

var colorClass = document.querySelector('.colors .selected').classList[0];


document.querySelector('.colors').addEventListener('click', function(e) {
	if (e.target.tagName === 'LI') {
		document.querySelector('.colors .selected').classList.remove('selected');
		e.target.classList.add('selected');
		colorClass = e.target.classList[0];
	}
});

svg.addEventListener('mousedown', function(e) {
	if (e.target.tagName === 'circle' && e.shiftKey) {
		elem = e.target;
		stage.remove(elem);
	}
	else if (e.target.tagName === 'circle') {
		elem = e.target;
		dragging = true;
	}
	else {
		point = { x: e.clientX, y: e.clientY };
		elem = SVGShapes.createCircle({ x: point.x, y: point.y, r: 10 });
		elem.classList.add(colorClass);
		stage.add(elem);
	}
});

svg.addEventListener('mousemove', function(e) {
	if (elem && !dragging) {
		var dx = point.x - e.clientX;
		var dy = point.y - e.clientY;
		var r = Math.abs(Math.sqrt(dx * dx + dy * dy));
		elem.setAttribute("r", r);
	}

	if (elem && dragging) {
		elem.setAttribute("cx", e.clientX);
		elem.setAttribute("cy", e.clientY);
	}
});

svg.addEventListener('mouseup', function(e) {
	elem = null;
	dragging = false;
});