// dla każdego getUserMedia :)

navigator.UserMedia = function(u,i,o){
  if(navigator.getUserMedia!==undefined){
    return navigator.getUserMedia(u,i,o);
  } else if(navigator.webkitGetUserMedia!==undefined){
    return navigator.webkitGetUserMedia(u,i,o);
  } else if(navigator.mozGetUserMedia!==undefined){
    return navigator.mozGetUserMedia(u,i,o);
  } else if(navigator.msGetUserMedia!==undefined){
    return navigator.msGetUserMedia(u,i,o);
  } else {
    // dla tych złych
    alert("Twoja przeglądarka nie obsługuje navigator.getUserMedia");
  }
};

nsi = document.querySelector("#nowstepinfo");
gz1 = document.querySelector("#gz1");
gz2 = document.querySelector("#gz2");
gz3 = document.querySelector("#gz3");

doit(); // zyskujemy stream
document.querySelector("#video").removeAttribute("onclick","poo()");

function doit(){
navigator.UserMedia({video:true},function(stream){
  document.querySelector("#video").removeAttribute("class","sry");
  document.querySelector("#video").setAttribute("height","auto");
  document.querySelector("#video").setAttribute("width","auto");
  a.style.display="block";
  document.querySelector("#reset").style.display = "none";
  
  document.querySelector("#video").setAttribute("src",window.URL.createObjectURL(stream)); // wirtualny atrybut src dla video
  document.querySelector("#video").play(); // włączamy
  document.querySelector("#video").setAttribute("onclick","poo()");
},function(){
  
  // error
  
  document.querySelector("#video").width = "400";
  document.querySelector("#video").height = "400";
  document.querySelector("#video").setAttribute("class","sry");
  alert("Problem! Aplikacja nie dostała się do kamerki!\nUpewnij się, że żadna inna strona lub program nie korzysta z \nTwojej kamerki i spróbuj ponownie.");
  
});
}

var color;
function kolor(arg){
  color=arg.style.backgroundColor; // pobieranie koloru
}

document.querySelector('#a').setAttribute("onclick","po()"); // atrybut dla guzika

var c,ctx,img,url,link,t,
    count = 3;// globalne zmienne, DO BOJU

  c = document.createElement('canvas'); // canvas
  ctx = c.getContext('2d'); // tresc canvas

a = document.getElementById('a');

function po(){
  a.removeAttribute("onclick","po()");
  document.querySelector("#video").removeAttribute("onclick","po()");
  if(count>0){
    a.innerHTML = count;
    count--;
    setTimeout(function(){po();},1000);
  } else {
    poo();
    count=3;
    a.setAttribute("onclick","po()");
    document.querySelector("#video").setAttribute("onclick","poo()");
    a.innerHTML = "";
  }
}

function poo(){
  ins.innerHTML = "2";
  nsi.innerHTML = "Edytuj fotkę.";
  gz1.style.display = "none";
  gz2.style.display = "block";

  img = document.createElement('img'); // wirtualny obrazek, na razie
  
  c.width = document.querySelector("#video").videoWidth;
  c.height = document.querySelector("#video").videoHeight; // szerokosc i wysokosc canvasu = video
  
  wzdj = c.width; 
  hzdj = c.height; 
  
  ctx.drawImage(document.querySelector("#video"),0,0); // malujemy obraz
  
  document.getElementById('d').appendChild(c); // dodajemy canvas do  nastepnej czesci

  document.getElementById('c').style.display = 'none'; // ukrywamy
  document.getElementById('e').style.display = 'block'; // pokazujemy rysowanie
  
  // teraz dajemy kolorowanie kolorowe :)

  t = document.getElementsByTagName('td').length; // ile tych td'eków jest
  
  for(var i=0;i<t;i++){
    document.getElementsByTagName('td')[i].setAttribute("onclick","kolor(this)"); // po klknieciu komorki w tabeli bedzie kolor(this)
  }
  
}

document.getElementById('f').setAttribute("onclick","convert()");
document.getElementById('j').setAttribute("onclick","wroc()");

// rysowanie

c.setAttribute('onmouseup', 'mouseup()');
c.setAttribute('onmousedown', 'mousedown()');
c.setAttribute('onclick', 'isclick(e)');

function write(e){
  ctx.lineTo(e.pageX - c.offsetLeft,e.pageY - c.offsetTop - y);
  ctx.stroke();
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
}

function mousedown(e){
  c.addEventListener('mousemove', write, false);
  ctx.beginPath();
}

function mouseup(){
  c.removeEventListener('mousemove', write, false);
}

function isclick(e){
  ctx.beginPath();
  ctx.lineTo(e.pageX - c.offsetLeft,e.pageY - c.offsetTop - y);
  ctx.stroke();
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
}

function convert(){ 
  napiszrodlo = new Image();
  napiszrodlo.src = "zrodlo.png";
  napiszrodlo.onload = function () {
<<<<<<< HEAD
      ctx.drawImage(napiszrodlo,hzdj-100,wzdj-190);
=======
      ctx.drawImage(napiszrodlo,hzdj-30,wzdj-260);
      ctx.drawImage(napiszrodlo,hzdj-260,wzdj-30);
>>>>>>> e7f568f6bfdf57170d3fe9c222f680ae606e6c73
      
      gz2.style.display = "none";
      gz3.style.display = "block";
      nsi.innerHTML = "Pobierz fotkę.";
      url = c.toDataURL('image/png');
      
      img.src = url;
      img.alt = "Tu miała być twoja Fotka, ale coś się porąbało...";
    
      link = document.querySelector("#pobierz"); 
      link.setAttribute('href',url); 
      link.setAttribute('download','fotka'); 
      
      document.getElementById('h').appendChild(img); 
      document.getElementById('g').style.display = 'block';
      document.getElementById('e').style.display = 'none'; 
      ins.innerHTML = "3";
  };
}

document.getElementById('i').setAttribute('onclick','znowu()');

function znowu(){
  gz1.style.display = "block";
  gz3.style.display = "none";
  nsi.innerHTML = "Zrób zdjęcie.";
  document.getElementById('g').style.display = 'none';
  document.getElementById('c').style.display = 'block';
  document.getElementById('h').innerHTML = '';
  ins.innerHTML="1";
}

function wroc(){
  gz1.style.display = "block";
  gz2.style.display = "none";
  nsi.innerHTML = "Zrób zdjęcie.";
  document.getElementById('e').style.display = 'none';
  document.getElementById('c').style.display = 'block';
  ins.innerHTML="1";
}

var x=document.body.clientWidth;
x=x-40;
x2=x-73;
document.getElementById("titlebar").style.width = x+"px";
var y=document.getElementById("titlebar").clientHeight;
document.getElementById("in").style.marginTop=y+"px";
document.getElementById("steps").style.width = x+"px";

ins=document.querySelector("#ins");
infobox=document.querySelector("#infoofotkach");
var statusinfo = false;
function informuje(){
  if(statusinfo){
    infobox.style.display = "none";
    statusinfo = false;
  } else {
    infobox.style.display = "block";
    statusinfo = true;
  }
}
