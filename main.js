(function (){
function $(id) { return document.getElementById(id); }

function init() {
  let inputs = document.getElementsByClassName("input");
  for (let i=0; i<inputs.length; i++) inputs.item(i).addEventListener("input",main);
  main();
}

function main() {
  reset();
  let p = parseInt($("def_p").value);
  let q = parseInt($("def_q").value);

  if (isNaN(p)){ error("pは数でない"); return; }
  if (isNaN(q)){ error("qは数でない"); return; }
  if (p===q){ error("p,qが等しい"); return; }
  if (!isPrime(p)){ error("p (= "+p+") は素数でない"); return; }
  if (!isPrime(q)){ error("q (= "+q+") は素数でない"); return; }
  
  let n = p*q;
  print("n",n);
  let l = lcm(p-1,q-1);
  print("l",l);
  let e = parseInt($("def_e").value);
  if (isNaN(e)){ error("eは数でない"); return; }
  print("e",e);
  let gcd_l_e = gcd(l,e);
  if (gcd_l_e!==1){ error("e (= "+e+") と l (= "+l+")は互いに素でない（最大公約数 = "+gcd_l_e+"）"); return; }

  let d = gcd2(e,l)[0];
  if (d<0) d += l;
  print("d",d);

  $("result").hidden = false;
  let encode = function (x) { return modpow(x,e,n); }
  let decode = function (x) { return modpow(x,d,n); }
  let enc = parseInt($("def_enc").value);
  let dec = parseInt($("def_dec").value);
  print("enc",encode(enc));
  print("dec",decode(dec));
  // for (let i=0; i<1; i++) $("encode").appendChild(makeListItem(encode));
  // for (let i=0; i<1; i++) $("decode").appendChild(makeListItem(decode));
}

function print(name,num){
  let outputs = document.getElementsByClassName("out_"+name);
  for (let i=0; i<outputs.length; i++) outputs.item(i).innerText = ""+num;
}

function error(mes){
  let err = document.getElementById("err");
  err.innerText="Error: "+mes;
  err.hidden=false;
}

function reset(){
  let errs = document.getElementsByClassName("error");
  for (let i=0; i<errs.length; i++) errs.item(i).hidden=true;
  let outputs = document.getElementsByClassName("output");
  for (let i=0; i<outputs.length; i++) outputs.item(i).innerText = "NaN";
  // $("encode").innerHTML = null;
  // $("decode").innerHTML = null;
  $("result").hidden = true;
}

function gcd(a, b) {
	if (a < b) return gcd(b, a);
	else if (b === 0) return a;
	else return gcd(b, a % b);
}

function gcd2(a, b){
  if (b === 0) return [1, 0];
  else {
    let q = Math.floor(a/b);
    let r = a%b;
    let res = gcd2(b,r);
    return [res[1],(res[0] - q * res[1])];
  }
}

function lcm(a, b) {
	return a * b / gcd(a, b);
}

function modpow(b,e,m) {
  let res = 1;
  while (e>0){
    if ((e & 1) === 1) res = (res * b) % m;
    e >>= 1;
    b = (b * b) % m;
  }
  return res;
}

function isPrime(num) {
	if (num < 2) return false;
	else if (num === 2) return true;
	else if (num % 2 === 0) return false;
	var sqrtNum = Math.sqrt(num);
	for (var i = 3; i <= sqrtNum; i += 2)
		if (num % i === 0) return false;
	return true;
}

// <li><input type="number" class="input" id="enc_1">  <span class="output out_enc_1"></span></li>
// function makeListItem(f){
//   let li = document.createElement("li");
//   let input = document.createElement("input");
//   let text = document.createElement("span");
//   let span = document.createElement("span");
//   li.appendChild(input);
//   li.appendChild(text);
//   li.appendChild(span);
//   input.type = "number";
//   input.className = "input";
//   text.innerText = " → ";
//   span.className = "output";
//   input.addEventListener("input",function(){
//     span.innerText = ""+f(parseInt(input.value));
//   });
//   return li;
// }

window.addEventListener("load",init);
})();