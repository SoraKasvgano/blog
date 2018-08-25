url = "https://api.github.com/repos/"+urlcf+"/contents/_post?callback=sa";
indexhtml = '';
html = '';
function get(url,cb){
  l.innerHTML = '<div class="ct"><img src="s/loading.gif"></div>';
  var xmlhttp;
  if (window.XMLHttpRequest){
    xmlhttp=new XMLHttpRequest();
  }else{
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4){
    	cb(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}

function gn(u){
	var tmp = "";
	for (var jj = 1; jj < u.length; jj++) {
		if (jj==1) {
			tmp += u[jj];
		}else{
			tmp += " "+u[jj];
		}
	}
	return tmp.replace(/\.md$/i,"");
}

function sa(jj){
	var j = jj["data"];
	var u;
	for (var i = 0; i < j.length; i++) {
		u = gn(j[i]['name'].split(" "));
		if (u !== "") {
			indexhtml += "<div data-href='"+j[i]['download_url']+"'><div>"+u+"</div><small>大小："+j[i]['size']+"</small></div>";
		}
	}
	l.innerHTML = indexhtml;
	ula();
}
function h2m(text){
    var converter = new showdown.Converter();
    return converter.makeHtml(text);
}
function sas(jj){
	get(jj,function(s){
		s = h2m(s);
		l.innerHTML = "<div class='pd'>"+s+"</div>";
		l.innerHTML += "<div class='ct'><a href=\"javascript:void 0\" onclick=\"window.location.hash=\'\';\">回到首页</a></div>"
	});
	window.location.hash = jj.replace("https://raw.githubusercontent.com/"+urlcf+"/master/_post/","");
}

function ula(){
	var dom_a = document.querySelectorAll("div[data-href]");
	for (var i = 0; i < dom_a.length; i++) {
		dom_a[i].onclick=function(){
			sas(this.getAttribute("data-href"));
		}
	}
	var dom_precode = document.querySelectorAll("pre code");
	for (var i = 0; i < dom_precode.length; i++) {
		dom_precode[i].setAttribute("contenteditable",true);
	}
}
function onhash(){
	var hash = window.location.hash.replace(/#/g,"");
	if (hash!=="") {
		sas("https://raw.githubusercontent.com/"+urlcf+"/master/_post/"+hash);
	}else{
		if (indexhtml!=="") {
			l.innerHTML = indexhtml;
			ula();
		}else{
			get(url,function(s){
				eval(s);
			});
		}
	}
}


//---------------



if (window.location.hash == "") {
	get(url,function(s){
		eval(s);
	});
}else{
	onhash();
}

window.onhashchange=function(){
	onhash();
}