let img;
let cnv;
let level;
let borderRad;
let fileInput;

function preload() {
  img = loadImage("62.jpg");
}

function setup() {
  cnv = createCanvas(img.width, img.height);
  cnv.position(230, 5);

  radiusSlider = select('.radiuss');
  saveitButton = select('.save');
  thresholdButton = select('.binary');
  grayscaleButton = select('.grayscale');
  invertButton = select('.inversion');

  fileInput = createFileInput(handleFile);
  fileInput.position(0, 120);
  
  saveitButton.mousePressed(saveit);
}

//redraw!!!
function handleFile(file) {
  
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      cnv = createCanvas(img.width, img.height);redraw();
    });
  } else {
    console.log('Please select an image file.');
  }
}
function changeRadius() {
  borderRad = radiusSlider.value();
}

function draw() {
  if (!img) {
    return;
  }
  background(255);
  
  radiusSlider.input(changeRadius);
  radiusSlider.class('.radius'); 
  
  for (let col = 0; col < img.width; col += 12) {
    for (let row = 0; row < img.height; row += 12) {
      let c = img.get(col, row);
      
      strokeWeight(0);
      fill(color(c));
      rect(col, row, 12, 12, borderRad);
    }
  }
}


$(document).ready(function(){
  
  $(".grayscale").click(function(){

    // if ( $(".grayscale").text() == "grayscale" ) {
    //   $(".grayscale").text("normal");
    // } else {
    //   $(".grayscale").text("grayscale");
    // }
    
    $("canvas").toggleClass("bandw");
    $("canvas").removeClass("poster");
    $("canvas").removeClass("invert");
    $("canvas").removeClass("tintit");
  });
});

$(document).ready(function(){
  
  $(".binary").click(function(){
    
    $("canvas").toggleClass("poster");
    $("canvas").removeClass("bandw");
    $("canvas").removeClass("invert");
    $("canvas").removeClass("tintit");
  });
});

$(document).ready(function(){
  
  $(".inversion").click(function(){

    $("canvas").toggleClass("invert");
    $("canvas").removeClass("bandw");
    $("canvas").removeClass("poster");
    $("canvas").removeClass("tintit");
  });
});

$(document).ready(function(){
  
  $(".tint").click(function(){

    $("canvas").toggleClass("tintit");
    $("canvas").removeClass("bandw");
    $("canvas").removeClass("poster");
    $("canvas").toggleClass("invert");
  });
});

function saveit() {
  const p5Canvas = document.getElementById('defaultCanvas0');
  const filteredCanvas = document.createElement('canvas')
  const p5CanvasClassList = p5Canvas.classList;
  let chosenFilter
  if (p5CanvasClassList.length > 1) {
    chosenFilter = p5CanvasClassList[1]
  } else {
    chosenFilter = 'default'
  }

  console.log(chosenFilter)
  filteredCanvas.width = p5Canvas.width;
  filteredCanvas.height = p5Canvas.height;

  const filteredContext = filteredCanvas.getContext("2d");

  if (chosenFilter === 'default') {
    
  } else if (chosenFilter === 'poster') {
    filteredContext.filter = 'contrast(40000%) grayscale(100%)'
  } else if (chosenFilter === 'bandw') {
    filteredContext.filter = 'grayscale(100%)';
  } else if (chosenFilter === 'invert') {
    filteredContext.filter = 'invert(100%)';
  } else if (chosenFilter === 'tintit') {
    filteredContext.filter = 'hue-rotate(250deg)';
  }
  
  filteredContext.drawImage(p5Canvas,0,0);

  // const image = filteredCanvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");
  // const image = filteredCanvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");

  // window.location.href = image
  saveCanvas(filteredCanvas,'it\'s pixelated now!', 'jpg');

}

