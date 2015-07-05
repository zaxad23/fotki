// engine.js
// for Webcam+
// developed by Adam Skorupski
// under the MIT License

// <3

$(document).ready(function(){
   // cross-browser getUserMedia
   navigator.UserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
   
   $("#zacznij-button").click(function(){ // start and run getUserMedia
      function complete(){
         $("#screen2").fadeIn(1000);
         waitingForStream=true;
         getStream();
         
         $(window).blur(function(){
            if(waitingForStream) getStream();
         });
      }
      $("#screen1").fadeOut(1000, complete);
   });
   
   cameraButton = $("#camera-button");
   cameraIcon   = $("#przyciskAparat");
   cameraCount  = $("#numerOdliczania");
   
   cameraButton.click(odliczanie); // on click it's counting
   
   $("#menuclick").click(function(){ // show settings
      $("#superbar").hide("drop",function(){
         $("#settings").show("drop");
      });
   });
   
   $(".navbar > i").click(function(){ // hide settings
      $("#settings").hide("drop",function(){
         $("#superbar").show("drop");
      });
   });
   
   c = $("#canvas");
   ctx = c[0].getContext('2d');
   
   previewIMG = $("#preview");
   $("#kolor").val("black");
   
   img = $("#preview")[0];
   
   watC = $("#watermarkCount");
});

function getStream(){
   if(navigator.UserMedia){
     navigator.UserMedia({video:true},function(stream){ // chcemy video w postaci stream
        waitingForStream=false;
        
        $("#screen2").fadeOut(1000, function(){
           $("#screen4").fadeIn(1000);
        });
        $("#video").attr("height","auto");
        $("#video").attr("width","auto");
        
        $("#video").attr("src",window.URL.createObjectURL(stream)); // wirtualny atrybut src dla video
        $("#video")[0].play(); // włączamy
        $("#video").attr("onclick","poo()");
        $("#scr0").hide();
        $("#scr4").show();
     
     
     },function(){
        // error
        waitingForStream=false;
        $("#screen2").fadeOut(1000, function(){
           $("#screen3").fadeIn(1000);
        });      
     });
  } else {
     alert("Niestety, twoja przeglądarka nie obsługuje navigator.getUserMedia");
     waitingForStream=false;
  }
}

var color="black";
var penSize=5;

var url,link,t,
    count = 3;// globalne zmienne, DO BOJU   
    
var counting=false;

var znakwodny = true;
  
function odliczanie(){
  counting=true;
  cameraButton.removeAttr("onclick","odliczanie()");
  cameraIcon.hide();
  cameraCount.show();
  $("#video").removeAttr("onclick","poo()");
  if(count>0){
    cameraCount.text(count);
    count--;
    setTimeout(odliczanie,1000);
  } else {
    cameraIcon.show();
    cameraCount.hide();
    count=3;
    $("#samowyzwalacz").val(3);
    cameraButton.attr("onclick","odliczanie()");
    $("#video").attr("onclick","poo()");
    counting=false;
    poo();
  }
}

function poo(){
  clickX = [];
  clickY = [];
  clickDrag = [];
  clickColor = [];
  clickSize = [];
  
  $("#size").val(5); penSize = 5;
  $("#kolor").val("black"); color = "black";
  
  $("#screen4").fadeOut(1000, function(){
     $("#screen5").fadeIn(1000);
  });
  $("#scr4").hide();
  $("#scr5").show();
  $("#superbar").hide("drop",function(){
    $("#settings").show("drop");
  });
  
  c[0].width = document.querySelector("#video").videoWidth;
  c[0].height = document.querySelector("#video").videoHeight; // szerokosc i wysokosc canvasu = video
  
  wzdj = c[0].width; 
  hzdj = c[0].height; 
  
  ctx.drawImage(document.querySelector("#video"),0,0); // malujemy obraz
  
}
console.log("A kto ci tu pozwolił wchodzić? :D"); // fun

// rysowanie

var clickX = [];
var clickY = [];
var clickDrag = [];
var clickColor = [];
var clickSize = [];
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(color);
  clickSize.push(penSize);
}

$(document).ready(function(){
   $('#canvas').mousedown(function(e){
      var mouseX = e.pageX - c[0].offsetLeft - $("#screen")[0].offsetLeft;
      var mouseY = e.pageY - c[0].offsetTop - $("#screen")[0].offsetTop;
            
      paint = true;
      addClick(e.pageX - c[0].offsetLeft - $("#screen")[0].offsetLeft, e.pageY - c[0].offsetTop - $("#screen")[0].offsetTop);
      redraw();
   });
   
   $('#canvas').mousemove(function(e){
      if(paint){
         addClick(e.pageX - c[0].offsetLeft - $("#screen")[0].offsetLeft, e.pageY - c[0].offsetTop - $("#screen")[0].offsetTop, true);
         redraw();
      }
   });
   
   $('#canvas').mouseup(function(e){
      paint = false;
   });
   
   $('#canvas').mouseleave(function(e){
      paint = false;
   });
});

function redraw(){ 
  ctx.lineJoin = "round";
			
  for(var i=0; i < clickX.length; i++) {		
    ctx.beginPath();
    if(clickDrag[i] && i){
      ctx.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       ctx.moveTo(clickX[i]-1, clickY[i]);
     }
     ctx.lineTo(clickX[i], clickY[i]);
     ctx.closePath();
     ctx.strokeStyle = clickColor[i];
     ctx.lineWidth = clickSize[i];
     ctx.stroke();
  }
}

var waiting = false;

function convert(){
   if(!waiting){
      $("#kolor").val("black");   
      napiszrodlo = new Image();
      napiszrodlo.src = "zrodlo.png";
      napiszrodlo.onload = function() {
         if(znakwodny)
            ctx.drawImage(napiszrodlo,hzdj-100,wzdj-190);
      
         url = c[0].toDataURL('image/png');
         
         img.setAttribute("src",url);
      
         link = document.querySelector("#pobierz"); 
         link.setAttribute('href',url); 
         
         if(znakwodny){
            $("#scr5").hide();
            $("#scr0").show();
            $("#settings").hide("drop",function(){
               $("#superbar").show("drop");
            });
            $("#screen5").fadeOut(1000, function(){
               $("#screen6").fadeIn(1000);
            });
         } else {
            countW = 15;
            waiting = true;
            koniec();
         }
      };
   }
}

function koniec(){
   if(countW>0&&waiting){
      watC.text(countW);
      countW--;
      setTimeout(koniec,1000);
   } else {
      countW = 0;
      watC.text("");
      
      if(waiting){
         $("#scr5").hide();
         $("#scr0").show();
         $("#settings").hide("drop",function(){
            $("#superbar").show("drop");
         });
         $("#screen5").fadeOut(1000, function(){
            $("#screen6").fadeIn(1000);
         });
      }
      waiting=false;
   }
}

function znowu(){
   $("#scr0").hide();
   $("#scr4").show();
   $("#settings").hide("drop",function(){
     $("#superbar").show("drop");
   });
   $("#screen6").fadeOut(1000, function(){
     $("#screen4").fadeIn(1000);
   });
}

function wroc(){
   waiting = false;
   $("#scr5").hide();
   $("#scr4").show();
   $("#settings").hide("drop",function(){
     $("#superbar").show("drop");
   });
   $("#screen5").fadeOut(1000, function(){
     $("#screen4").fadeIn(1000);
   });
}

function zmienznak(checkbox){
   if(!checkbox.checked){
      alert("Bardzo mi przykro, że nie chcesz wspierać Webcam+ :(\nJednak rozumiem ciebie, więc jedynie będziesz miał mały, 15 sekundowy odstęp czasu.");
      znakwodny=false;
   } else {
      znakwodny=true;
   }
}

// w webcam+ jest użyty kod z poradnika: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple
