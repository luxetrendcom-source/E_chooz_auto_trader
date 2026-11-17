// E_CHOOZ starter: illustrative market values only; not connected to a live feed.
const markets = [
  {pair:"EUR/USD",name:"Euro / US Dollar",price:"1.08425",change:"+0.24%"},
  {pair:"GBP/USD",name:"British Pound / US Dollar",price:"1.27180",change:"+0.11%"},
  {pair:"USD/JPY",name:"US Dollar / Japanese Yen",price:"149.625",change:"-0.18%"},
  {pair:"USD/CHF",name:"US Dollar / Swiss Franc",price:"0.88210",change:"-0.07%"},
  {pair:"AUD/USD",name:"Australian Dollar / US Dollar",price:"0.65340",change:"+0.32%"},
  {pair:"USD/CAD",name:"US Dollar / Canadian Dollar",price:"1.35820",change:"+0.05%"}
];
let balance = 10000, side = "BUY", trades = [];
const $ = id => document.getElementById(id);
function renderMarkets(){
  $("market-list").innerHTML = markets.map(m => `<div class="market-row"><div><div class="pair-name">${m.pair}</div><div class="pair-sub">${m.name}</div></div><div class="price">${m.price}</div><div><div class="change ${m.change.startsWith("-")?"down":""}">${m.change}</div></div></div>`).join("");
}
function render(){
  $("balance").textContent = "$" + balance.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
  $("open-count").textContent = trades.length;
  $("history").innerHTML = trades.length ? trades.map(t => `<div class="history-item"><div><strong>${t.pair}</strong><small>${t.time} · Virtual size $${t.amount.toFixed(2)}</small></div><span class="${t.side==="BUY"?"side-buy":"side-sell"}">${t.side}</span></div>`).join("") : '<p class="muted empty">No demo trades yet. Try a paper trade above.</p>';
}
document.querySelectorAll(".direction").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".direction").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); side=btn.dataset.side;
}));
$("place-trade").addEventListener("click",()=>{
  const amount = Number($("amount").value);
  if(!Number.isFinite(amount)||amount<=0||amount>1000){alert("Enter a virtual position size between $1 and $1,000.");return;}
  if(amount>balance){alert("Not enough virtual demo balance.");return;}
  const pair=$("pair").value;
  balance-=amount;
  trades.unshift({pair,side,amount,time:new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})});
  render();
  alert("Demo trade recorded. This is a simulation only; no broker order was sent.");
});
document.querySelectorAll(".nav-item").forEach(item=>item.addEventListener("click",()=>{
  document.querySelectorAll(".nav-item").forEach(n=>n.classList.remove("selected"));item.classList.add("selected");
}));
renderMarkets();render();
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));}
