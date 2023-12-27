let coords = [];
var canvas = document.getElementById('canvas');
let mouseCoords = document.getElementById('mouseCoords');
mouseCoords.style.display = 'block'; //Remove in version 1.2
let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
let view = canvas.getBoundingClientRect(); 
let contextMenu = document.getElementById('contextMenu');
let snapVal = document.getElementById('snapRange');
let l = 0;
let c = 0;
let r = 0;
let p = 0;

document.addEventListener('mousemove', function(event) {
    var x = Math.trunc(event.clientX - view.left); 
    var y = Math.trunc(event.clientY - view.top); 
     
    // console.log('Cursor position: ' + x + ',' + y); 

    mouseCoords.style.left = (x + 65) + 'px';
    mouseCoords.style.top = (y - 25) + 'px';
    mouseCoords.innerHTML = '(' + x + ', ' + y + ')';

    if(event.clientX - view.left > 500 || event.clientX - view.left < 0) {
        mouseCoords.style.display = "none";
    } else if(event.clientY - view.top > 500 || event.clientY - view.top < 0) {
        mouseCoords.style.display = "none";
    } else {
        mouseCoords.style.display = "block";
    }
});


canvas.addEventListener('click', function (event) {



});


function clearCanvas() {
    canvas.innerHTML = '';
}

canvas.addEventListener('contextmenu', function(event) {
    
    event.preventDefault();
    var x = Math.trunc(event.clientX - view.left); 
    var y = Math.trunc(event.clientY - view.top); 
    contextMenu.style.left = (x + 50) + 'px';
    contextMenu.style.top = (y + 35) + 'px';
    contextMenu.style.display = 'block';

    document.addEventListener('click', function(event) {
        
        let clickx = Math.trunc(event.clientX - view.left); 
        let clicky = Math.trunc(event.clientY - view.top); 

        if (clickx < x || clickx > (x + contextMenu.offsetWidth)) {
            contextMenu.style.display = 'none';
            document.removeEventListener('click', arguments.callee);
        } else if (clicky < y || clicky > (y + contextMenu.offsetHeight)) {
            contextMenu.style.display = 'none';
            document.removeEventListener('click', arguments.callee);
        }
        
    })

});

function hideCoords() {
    
    if (mouseCoords.style.display == 'block') {
        mouseCoords.style.display = 'none';
        canvas.removeEventListener('mousemove', arguments.callee);
    } else {
        mouseCoords.style.display = 'block';
    }
}


function downloadInnerSVG(elId, mimeType) {
    var filename = document.getElementById("name");
    var elHtml = document.getElementById(elId).innerHTML; 
    if (canvas.innerHTML == '') {
        alert('Create a masterpiece!');
    } else if (document.getElementById("name").value == "") {
        alert('Name your masterpiece!');
    } else {
        // console.log(canvas.innerHTML);
        var link = document.getElementById('download');
        mimeType = mimeType || 'text/plain';
    
        link.setAttribute('download', (filename.value + '.svg'));
        link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
    }
    
}



function lineButton() {
    canvas.addEventListener('click', function(event) {
        addLine(event.clientX, event.clientY);
        canvas.removeEventListener('click', arguments.callee);
    });
}

function addLine(mouseX, mouseY) {
    // console.log(mouseX + ' ' + mouseY);

    l += 1;
    var x = mouseX - view.left;
    var y = mouseY - view.top;
    let initialx = x;
    let initialy = y;
    
    canvas.appendChild(line.cloneNode(true));
    // canvas.appendChild(circle.cloneNode(true));
    canvas.appendChild(line);
    line.setAttribute("x1", x);
    line.setAttribute("y1", y);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);

    if (document.getElementById('construction').checked == true) {
        line.setAttribute("id", 'constructionLine ' + l);
        line.setAttribute("stroke-dasharray", "4");
        line.setAttribute('style', 'stroke:orange; stroke-width:2');
    } else {
        line.setAttribute("id", 'line ' + l);
        line.setAttribute("stroke-dasharray", "0");
        line.setAttribute('style', 'stroke:rgb(100,100,100); stroke-width:2');
    }


    var handler = function(event) {
        if (initialx - (event.clientX - view.left) <= snapVal.value && initialx - (event.clientX - view.left) >= -snapVal.value) {
            x = initialx
        } else {
            x = event.clientX - view.left; 
        }

        if (initialy - (event.clientY - view.top) <= snapVal.value && initialy - (event.clientY - view.top) >= -snapVal.value) {
            y = initialy
        } else {
            y = event.clientY - view.top; 
        }

        let d = Math.sqrt((initialy - (event.clientY - view.top)) ** 2 + (initialx - (event.clientX - view.left)) ** 2);
        document.getElementById('info').innerHTML = "D: " + Math.trunc(d) + ", θ: " + Math.abs(Math.trunc(Math.atan((initialy - y)/(initialx - x)) * (180 / 3.14159)));
    
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);

        
        // canvas.appendChild(circle);
        // circle.setAttribute("cx", x);
        // circle.setAttribute("cy", y);
        // circle.setAttribute("r", 3);
        // circle.setAttribute("style", "stroke: blue; stroke-width:2; fill-opacity: 0");

        // canvas.appendChild(circle);
        // circle.setAttribute("r", 50);

        canvas.addEventListener('click', function(e){
        
            canvas.removeEventListener('mousemove', handler);
        
        });
    }

    coords.push({line: l, x1: initialx, y1: initialy, x2: x, y2: y});

    canvas.addEventListener('mousemove', handler);

}



function circleButton() {
    canvas.addEventListener('click', function(event) {
        // console.log("click");
        addCircle(event.clientX, event.clientY);
        canvas.removeEventListener('click', arguments.callee);
    });
}

function addCircle(mouseX, mouseY) {
    
    // console.log("click");

    c += 1;
    var x = mouseX - view.left;
    var y = mouseY - view.top;
    let r = 0;
    let initialx = x;
    let initialy = y;

    canvas.appendChild(circle);
    canvas.appendChild(circle.cloneNode(true));
    circle.setAttribute("id", 'circle' + c);
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 0);
    // circle.setAttribute("r", r);
    
    if (document.getElementById('construction').checked == true) {
        circle.setAttribute("id", 'constructionCircle ' + l);
        circle.setAttribute("stroke-dasharray", "4");
        circle.setAttribute('style', 'stroke:orange; stroke-width:2; fill-opacity: 0;');
    } else {
        circle.setAttribute("id", 'circle ' + l);
        circle.setAttribute("stroke-dasharray", "0");
        circle.setAttribute('style', 'stroke:rgb(100,100,100); stroke-width:2; fill-opacity: 0;');
    }
    
    
    
    
    var handler = function(event) {

        let d = Math.sqrt((initialy - (event.clientY - view.top)) ** 2 + (initialx - (event.clientX - view.left)) ** 2);
        document.getElementById('info').innerHTML = "R: " + Math.trunc(d);
        
        // console.log("D: " + snapVal.value);

        // if (initialx ** 2 + initialy ** 2 (event.clientX - rect.left))


        // console.log(initialy - (event.clientY - rect.top));
        // console.log(initialx - (event.clientX - rect.left));
        
    
        circle.setAttribute("r", d);
        
        canvas.addEventListener('click', function(e){
        
            canvas.removeEventListener('mousemove', handler);
        
        });
        
        // canvas.addEventListener('click', function(event) {
            
        //     addLine(event.clientX, event.clientY);
        //     canvas.removeEventListener('click', arguments.callee);
        
        // });
    }

    canvas.addEventListener('mousemove', handler);

}



function rectangleButton() {
    canvas.addEventListener('click', function(event) {
        // console.log("click");
        addRectangle(event.clientX, event.clientY);
        canvas.removeEventListener('click', arguments.callee);
    });
}

function addRectangle(mouseX, mouseY) {
    
    // console.log("click");

    r += 1;
    var x = mouseX - view.left;
    var y = mouseY - view.top;
    let initialx = x;
    let initialy = y;

    canvas.appendChild(rect);
    canvas.appendChild(rect.cloneNode(true));
    rect.setAttribute("id", 'rect' + r);
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", 0);
    rect.setAttribute("height", 0);

    if (document.getElementById('construction').checked == true) {
        rect.setAttribute("id", 'constructionRect ' + l);
        rect.setAttribute("stroke-dasharray", "4");
        rect.setAttribute('style', 'stroke:orange; stroke-width:2; fill-opacity: 0;');
    } else {
        rect.setAttribute("id", 'Rect ' + l);
        rect.setAttribute("stroke-dasharray", "0");
        rect.setAttribute('style', 'stroke:rgb(100,100,100); stroke-width:2; fill-opacity: 0;');
    }

    var handler = function(event) {

        let d = Math.sqrt((initialy - (event.clientY - view.top)) ** 2 + (initialx - (event.clientX - view.left)) ** 2);
        document.getElementById('info').innerHTML = "C: " + Math.trunc(d);
        
        // console.log("D: " + snapVal.value);

        // console.log(initialy - (event.clientY - rect.top));
        // console.log(initialx - (event.clientX - rect.left));
        
        if (-(initialx - (event.clientX - view.left)) < 0) {
            rect.setAttribute("x", -(initialx - (event.clientX - view.left)) + x);
            rect.setAttribute("width", (initialx - (event.clientX - view.left)));
            // console.log((initialx - (event.clientX - view.left)));
        } else {
            rect.setAttribute("x", x);
            rect.setAttribute("width", -(initialx - (event.clientX - view.left)));
        }

        if (-(initialy - (event.clientY - view.top)) < 0) {
            rect.setAttribute("y", -(initialy - (event.clientY - view.top)) + y);
            rect.setAttribute("height", (initialy - (event.clientY - view.top)));
            // console.log((initialx - (event.clientX - view.left)));
        } else {
            rect.setAttribute("y", y);
            rect.setAttribute("height", -(initialy - (event.clientY - view.top)));
        }

        // rect.setAttribute("width", -(initialx - (event.clientX - view.left)));
        // rect.setAttribute("height", -(initialy - (event.clientY - view.top)));

        
        canvas.addEventListener('click', function(e){
        
            canvas.removeEventListener('mousemove', handler);
        
        });
        
        // canvas.addEventListener('click', function(event) {
            
        //     addLine(event.clientX, event.clientY);
        //     canvas.removeEventListener('click', arguments.callee);
        
        // });
    }

    canvas.addEventListener('mousemove', handler);

}


function pathButton() {
    canvas.addEventListener('click', function(event) {
        // console.log("click");
        addPath(event.clientX, event.clientY);
        canvas.removeEventListener('click', arguments.callee);
    });
}

function addPath(mouseX, mouseY) {
    
    // console.log("click");

    r += 1;
    var x = mouseX - view.left;
    var y = mouseY - view.top;
    let initialx = x;
    let initialy = y;

    canvas.appendChild(path);
    canvas.appendChild(path.cloneNode(true));
    path.setAttribute("id", 'path' + r);
    path.setAttribute("x", x);
    path.setAttribute("y", y);
    path.setAttribute("width", 0);
    path.setAttribute("height", 0);

    if (document.getElementById('construction').checked == true) {
        path.setAttribute("id", 'constructionPath ' + l);
        path.setAttribute("stroke-dasharray", "4");
        path.setAttribute('style', 'stroke:orange; stroke-width:2; fill-opacity: 0;');
    } else {
        path.setAttribute("id", 'path ' + l);
        path.setAttribute("stroke-dasharray", "0");
        path.setAttribute('style', 'stroke:rgb(100,100,100); stroke-width:2; fill-opacity: 0;');
    }

    var handler = function(event) {

        let d = Math.sqrt((initialy - (event.clientY - view.top)) ** 2 + (initialx - (event.clientX - view.left)) ** 2);
        document.getElementById('info').innerHTML = "C: " + Math.trunc(d);
        
        // console.log("D: " + snapVal.value);
        
        if (-(initialx - (event.clientX - view.left)) < 0) {
            path.setAttribute("x", -(initialx - (event.clientX - view.left)) + x);
            path.setAttribute("width", (initialx - (event.clientX - view.left)));
            // console.log((initialx - (event.clientX - view.left)));
        } else {
            path.setAttribute("x", x);
            path.setAttribute("width", -(initialx - (event.clientX - view.left)));
        }

        if (-(initialy - (event.clientY - view.top)) < 0) {
            path.setAttribute("y", -(initialy - (event.clientY - view.top)) + y);
            path.setAttribute("height", (initialy - (event.clientY - view.top)));
            // console.log((initialx - (event.clientX - view.left)));
        } else {
            path.setAttribute("y", y);
            path.setAttribute("height", -(initialy - (event.clientY - view.top)));
        }

        // rect.setAttribute("width", -(initialx - (event.clientX - view.left)));
        // rect.setAttribute("height", -(initialy - (event.clientY - view.top)));

        
        canvas.addEventListener('click', function(e){
        
            canvas.removeEventListener('mousemove', handler);
        
        });
        
        // canvas.addEventListener('click', function(event) {
            
        //     addLine(event.clientX, event.clientY);
        //     canvas.removeEventListener('click', arguments.callee);
        
        // });
    }

    canvas.addEventListener('mousemove', handler);

}