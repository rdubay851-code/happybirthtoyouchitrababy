const TARGET = new Date("2027-07-03T00:00:00+05:30");
const CREATOR_KEY="chitra_creator_v2";
const MODE_KEY="chitra_mode_v2";
const VISITED_KEY="chitra_visited_v2";
const app=document.getElementById("main"), nav=document.getElementById("nav"), drawer=document.getElementById("drawer"), toast=document.getElementById("toast");
const rooms=[
["garden","The Living Garden","Plant light and watch a private sky grow."],
["letters","Letters Never Sent","Long letters for the feelings that never fit inside a chat."],
["poetry","Poetry Room","English, Hinglish, and verses written only for this universe."],
["memory","Memory Vault","A cabinet of tiny things that become important later."],
["timeline","The Unwritten Timeline","A future made from possibilities, not promises."],
["signals","Signal Station","A small machine hiding seven messages."],
["dream","Dream Lab","Change the feeling; change the atmosphere."],
["observatory","Observatory","A quiet place to look outward and think inward."],
["modeworld","The Four Skies","Four visual worlds, each with its own emotional weather."],
["finale","The Last Door","The page that completes itself on her birthday."]
];

const creator=new URLSearchParams(location.search).get("creator")==="1" || sessionStorage.getItem(CREATOR_KEY)==="yes";
function birthdayOpen(){return new Date()>=TARGET}
function openNow(){return creator||birthdayOpen()}
function escape(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toastMsg(s){toast.textContent=s;toast.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove("show"),2200)}
function setMode(m){document.body.dataset.mode=m;localStorage.setItem(MODE_KEY,m);document.getElementById("modeLabel").textContent=m.toUpperCase();toastMsg("The universe changed to "+m+".")}
function currentMode(){return localStorage.getItem(MODE_KEY)||"aurora"}

function countdown(){
 const ids=["d","h","m","s"], vals=[];
 let diff=Math.max(0,TARGET-Date.now());
 vals.push(Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60);
 ids.forEach((id,i)=>{const e=document.getElementById(id);if(e)e.textContent=String(vals[i]).padStart(2,"0")});
 const gate=document.getElementById("gateActions");
 if(gate && birthdayOpen()) render();
}
setInterval(countdown,1000);

function home(){
 const open=birthdayOpen();
 return `<section class="page"><div class="hero"><div class="hero-grid"><div>
 <div class="kicker">03 · 07 · 2027 / ${open?"THE SKY IS OPEN":"A LETTER WAITING FOR MIDNIGHT"}</div>
 <h1>CHITRA.<span>The unfinished sky.</span></h1>
 <p class="lede">I could have made a birthday page. Instead, I made a place. A place with doors, weather, silence, stars, words, little discoveries and enough corners to get pleasantly lost in.</p>
 ${open?`<div class="quote">Today the waiting ends. Not because everything is suddenly perfect, but because some beautiful things are worth opening slowly.</div>`:
 `<div class="count"><div class="cell"><div class="num" id="d">--</div><div class="lab">days</div></div><div class="cell"><div class="num" id="h">--</div><div class="lab">hours</div></div><div class="cell"><div class="num" id="m">--</div><div class="lab">minutes</div></div><div class="cell"><div class="num" id="s">--</div><div class="lab">seconds</div></div></div>
 <div class="notice">The doors open automatically at midnight on July 3, 2027 · India Standard Time.</div>`}
 <div class="deep">“There are people we meet for a season, people we remember for a reason, and a rare few who quietly become part of the <em>architecture of our memories.</em> This little universe exists because your name deserved a sky around it.”</div>
 <div class="actions-row">${open?`<button class="primary" data-route="garden">ENTER THE UNIVERSE →</button>`:`<button class="primary" data-route="poetry">READ WHILE YOU WAIT →</button>`}${!open&&!birthdayOpen()?`<button class="secondary" id="creatorBtn">CREATOR PREVIEW</button>`:""}</div>
 <div class="explore" style="margin-top:18px">exploration: <span id="explore">0%</span></div>
 </div>
 <aside class="side-note"><span class="eyebrow">A NOTE BEFORE THE DOORS OPEN</span><div class="big">Some gifts are objects. Some are moments.</div><p>This one is neither. It is a small world made from code, words and unreasonable amounts of time. You do not have to finish it. You do not have to understand every room. Wander until something makes you smile.</p><p>And if you ever wonder why there are so many pages: because “happy birthday” felt too small for everything a person can mean without even trying.</p></aside>
 </div></div></section>`
}

function garden(){return room("01","The Living Garden",`<p>Every click plants another light. Nothing here is permanent except the little record your browser keeps of having been here.</p><div class="interactive"><canvas id="gardenCanvas" class="garden-canvas"></canvas><div class="meter"><i id="gardenMeter"></i></div><div class="actions-row"><button class="primary" id="plant">PLANT A LIGHT</button><button class="secondary" id="clearGarden">LET THE GARDEN SLEEP</button></div><p id="gardenText" class="signal"></p></div><div class="quote">A garden does not ask the flower why it took so long. It simply makes room when it arrives.</div>`)}
function letters(){return room("02","Letters Never Sent",`<article class="letter"><span class="kicker">LETTER I · FOR THE PERSON WHO KEPT GOING</span><h3>Dear Chitra,</h3><p>There are days when life feels like a room with all the lights switched off. On those days, I hope you remember that darkness is not a verdict. It is only a condition of the room. You are allowed to wait for the window. You are allowed to become your own window.</p><p>I hope the future is gentler with you than your fears predict. I hope you find friendships that do not require performance, laughter that arrives without permission, and people who understand that caring for someone is not the same thing as owning a place in their life.</p></article>
<article class="letter"><span class="kicker">LETTER II · FOR THE QUIET DAYS</span><h3>Dear tomorrow-Chitra,</h3><p>Please be kind to the girl who made it here. She did not know every answer. She still showed up. She survived versions of herself she thought would last forever. She learned that some endings are not punishments; sometimes they are doors wearing the costume of loss.</p><p>Do not make yourself smaller just because a room is crowded. Do not apologise for needing softness. Keep your strange interests. Keep your stupid jokes. Keep the parts of yourself that make absolutely no practical sense.</p></article>
<article class="letter"><span class="kicker">LETTER III · THE ONE I ACTUALLY WANTED TO WRITE</span><h3>Hey Chitra,</h3><p>If this entire website ever feels like too much, remember the simplest thing: somewhere, someone decided your birthday deserved more than a copied template. So they stayed up, wrote words, broke code, fixed code, broke it again, and kept building until a blank screen started feeling like a place.</p><p>That is all this is. A long way of saying: I am glad your story exists.</p></article>`)}
function poetry(){return room("03","Poetry Room",`<div class="poem"><p>Maybe you were never meant to be</p><p>a chapter I could understand.</p><p>Maybe you were meant to be</p><p>the sentence that changed the paragraph.</p><p>────────</p><p>Some people arrive like fireworks—</p><p>bright, loud, impossible to miss.</p><p>You arrived more quietly.</p><p>Like moonlight finding a floor</p><p>after everyone had gone to sleep.</p><p>────────</p><p>And if someday the distance between us</p><p>becomes a road neither of us crosses,</p><p>I hope the memory still knows</p><p>how to be warm without asking to return.</p></div>
<div class="quote">Hinglish: “Kabhi kabhi koi insaan zindagi mein isliye nahi aata ki woh hamesha rahe; woh aata hai taaki hum apne andar ka woh hissa dekh sakein, jise hum khud bhi bhool chuke the.”</div>
<div class="longread">Chitra, agar words ka koi ghar hota na, toh kuch words tumhare naam ke kamre mein rakhne padte. “Sukoon” ek shelf par. “Himmat” khidki ke paas. “Laughter” bed ke neeche chhupa hua, because obviously the best things are always found in ridiculous places.

Aur “you are enough” ko main front door ke bilkul paas likhta. Isliye nahi ki tumhe roz padhna zaroori hai, balki isliye ki agar kabhi duniya tumhe convince karne lage ki tumhe kisi aur version mein badalna padega, toh ghar se nikalte waqt tumhe ek baar woh line dikh jaaye.

You do not need to become extraordinary every morning. Sometimes getting through an ordinary Tuesday with your softness intact is its own kind of courage.</div>`)}
function memory(){return room("04","Memory Vault",`<div class="cards"><div class="card"><span class="kicker">CABINET 01</span><h3>Tiny Things</h3><p>The joke that made no sense but was still funny. The random late-night conversation. The moment a normal day became memorable for no obvious reason.</p></div><div class="card"><span class="kicker">CABINET 02</span><h3>Unimportant, Therefore Important</h3><p>Most beautiful memories do not announce themselves. They hide inside “btw”, “wait”, “listen”, and “you won't believe what happened”.</p></div><div class="card"><span class="kicker">CABINET 03</span><h3>Keep This</h3><p>Not every memory needs to become a monument. Some can simply be a warm little stone in your pocket that you touch when the day feels cold.</p></div></div><div class="longread" style="margin-top:35px">If memories were objects, I think the most valuable ones would be almost weightless. A voice note you forgot you saved. A sentence that made you laugh at 2:17 AM. A photo where nobody was posing correctly. A stupid nickname. A conversation that started with absolutely nothing and somehow lasted an hour.

Those things never look important while they are happening.

Then one day you remember them and realise they were quietly building a home inside you.</div>`)}
function timeline(){return room("05","The Unwritten Timeline",`<div class="cards"><div class="card"><span class="kicker">NEXT PAGE</span><h3>A morning you haven't seen</h3><p>Sunlight through a window. A song you have not discovered yet. A version of you who has already survived the thing you are currently worried about.</p></div><div class="card"><span class="kicker">SOMEWHERE AHEAD</span><h3>A ridiculous laugh</h3><p>One day you will laugh at something so stupid that you will wonder how the world ever convinced you to take everything seriously.</p></div><div class="card"><span class="kicker">NO DATE ATTACHED</span><h3>A softer chapter</h3><p>Not perfect. Not painless. Just softer. A chapter where peace is not something you chase; it is something you notice.</p></div></div><div class="quote">The future is not a promise that everything will be easy. It is a reminder that the page you are on is not the final page.</div>`)}
function signals(){return room("06","Signal Station",`<p>There are seven little transmissions hidden here. Press the receiver seven times. The machine does not reward speed. It rewards curiosity.</p><div class="interactive"><button class="primary" id="signalBtn">RECEIVE SIGNAL</button><p id="signalCount" class="signal">signal strength: 0 / 7</p><div id="signalOutput" class="longread" style="display:none">TRANSMISSION COMPLETE.<br><br>“If you ever feel lost, remember: lost is a location, not an identity. You can leave a location.”</div></div>`)}
function dream(){return room("07","Dream Lab",`<div class="mode-card"><span class="kicker">EMOTIONAL WEATHER ENGINE</span><h3 id="dreamTitle">Choose a feeling.</h3><p id="dreamBody">The room will rewrite its message around what you choose. Nothing is saved. Some things are better left temporary.</p><div class="actions-row"><button class="secondary dream" data-feel="calm">CALM</button><button class="secondary dream" data-feel="wild">WILD</button><button class="secondary dream" data-feel="hope">HOPE</button><button class="secondary dream" data-feel="nostalgia">NOSTALGIA</button></div></div><div class="quote" id="dreamQuote">A quiet universe is still a universe.</div>`)}
function observatory(){return room("08","Observatory",`<div class="cards"><div class="card"><span class="kicker">STAR / 01</span><h3>Distance</h3><p>Light can travel for years before reaching a place where someone finally sees it. Some feelings work like that too.</p></div><div class="card"><span class="kicker">STAR / 02</span><h3>Perspective</h3><p>From far enough away, entire problems become points of light. It does not make them unreal. It makes breathing possible.</p></div><div class="card"><span class="kicker">STAR / 03</span><h3>Wonder</h3><p>Never underestimate the usefulness of caring about something that has no practical purpose. Wonder is allowed to be useless.</p></div></div><div class="longread" style="margin-top:35px">Tonight, look at the sky for no reason. Not to make a wish. Not to photograph it. Not to turn it into content. Just look.

There is something beautiful about giving your attention to something that does not need anything from you.

Maybe that is one definition of peace: a moment that does not ask you to perform.</div>`)}
function modeworld(){return room("09","The Four Skies",`<p>These are not just colour filters. Each mode is a different emotional weather system. Tap one and stay for a minute. Watch the sky. Then switch again.</p><div class="cards"><div class="card"><span class="kicker">AURORA</span><h3>Wonder</h3><p>Soft violet and teal. The feeling of finding something beautiful when you were not looking.</p><button class="secondary setmode" data-set="aurora">ENTER AURORA</button></div><div class="card"><span class="kicker">MOON</span><h3>Quiet</h3><p>Blue night, slower thoughts. For pages that should feel like 2 AM without the bad decisions.</p><button class="secondary setmode" data-set="moon">ENTER MOON</button></div><div class="card"><span class="kicker">ROSE</span><h3>Warmth</h3><p>Pink and amber. For memories, letters and all the feelings that refuse to be practical.</p><button class="secondary setmode" data-set="rose">ENTER ROSE</button></div></div><div class="card" style="margin-top:12px"><span class="kicker">MIDNIGHT</span><h3>Depth</h3><p>Deep blue and electric cyan. The hidden side of the archive.</p><button class="secondary setmode" data-set="midnight">ENTER MIDNIGHT</button></div>`)}
function finale(){const open=birthdayOpen();return room("10","The Last Door",`<div class="final"><div class="kicker">${open?"03 · 07 · 2027 / OPEN":"LOCKED UNTIL 03 · 07 · 2027"}</div><h2>${open?"Happy Birthday, Chitra.":"Not yet."}</h2><div class="poem"><p>May your mornings find you gently.</p><p>May your nights leave room for stars.</p><p>May you never confuse being needed</p><p>with being loved.</p><p>May you keep your softness</p><p>without letting the world mistake it for weakness.</p><p>May laughter find you in ordinary places.</p><p>May the future surprise you kindly.</p><p>And when life becomes loud,</p><p>may you remember there is always a quieter sky inside you.</p></div><div class="longread">Chitra, this whole strange little universe was built around one simple thought: a birthday can be more than a date. It can be a pause. A place to look back at what survived, look around at what exists now, and look forward without needing to know exactly what comes next.

I hope you collect years that feel like rooms with open windows.

I hope you meet people who do not make you earn your place beside them.

I hope you have the courage to leave what hurts, the patience to build what matters, and the sense of humour to laugh when the code breaks five minutes before someone is supposed to see it.

And most of all, I hope you never become so busy becoming “better” that you forget to notice the person you already are.

Happy birthday, Chitra.

This website ends here.

The universe doesn't.</div></div>`)}
function room(no,title,body){return `<section class="page"><div class="room"><button class="back" data-route="home">← BACK</button><div class="room-head"><div class="kicker">ROOM ${no} / CHITRA ARCHIVE</div><h2>${title}</h2>${body.split("</p>")[0].endsWith("</p>")?"":""}</div>${body}</div></section>`}

const pages={home,garden,letters,poetry,memory,timeline,signals,dream,observatory,modeworld,finale};
function render(){
 let key=(location.hash.slice(1)||"home").split("?")[0];
 if(!pages[key]) key="home";
 if(!openNow() && key!=="home" && key!=="poetry"){toastMsg("This door is waiting for July 3, 2027.");key="home"}
 app.innerHTML=pages[key]();
 bindPage(key);
 updateExplore(key);
 countdown();
}
function bindPage(key){
 document.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>{location.hash=b.dataset.route;closeDrawer();window.scrollTo(0,0)});
 const creatorBtn=document.getElementById("creatorBtn");
 if(creatorBtn) creatorBtn.onclick=()=>{const p=prompt("Creator access code");if(p==="chitra-creator-2027"){sessionStorage.setItem(CREATOR_KEY,"yes");toastMsg("Creator preview unlocked.");render()}else toastMsg("That code did not open the door.")};
 if(key==="garden"){
  const c=document.getElementById("gardenCanvas"),ctx=c.getContext("2d"),count=Number(localStorage.getItem("garden_count")||0), meter=document.getElementById("gardenMeter"), text=document.getElementById("gardenText");
  function size(){c.width=c.clientWidth*devicePixelRatio;c.height=c.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);draw()}
  function draw(){ctx.clearRect(0,0,c.clientWidth,c.clientHeight);let n=Number(localStorage.getItem("garden_count")||0);for(let i=0;i<n;i++){let x=(i*73)%c.clientWidth,y=c.clientHeight-20-(i*37)%Math.max(40,c.clientHeight-40);ctx.strokeStyle=getComputedStyle(document.body).getPropertyValue("--accent");ctx.globalAlpha=.65;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(i%3-1)*12,y-55-(i%5)*10);ctx.stroke();ctx.globalAlpha=.9;ctx.fillStyle=getComputedStyle(document.body).getPropertyValue("--accent2");ctx.beginPath();ctx.arc(x+(i%3-1)*12,y-55-(i%5)*10,3+(i%4),0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1}
  function update(){let n=Number(localStorage.getItem("garden_count")||0);meter.style.width=Math.min(100,n*5)+"%";text.textContent=n===0?"The soil is waiting.":n<5?"A few lights have found the ground.":n<15?"The garden is beginning to remember you.":"There are enough lights now to call this a sky.";draw()}
  document.getElementById("plant").onclick=()=>{localStorage.setItem("garden_count",Number(localStorage.getItem("garden_count")||0)+1);update();toastMsg("A new light appeared.")};
  document.getElementById("clearGarden").onclick=()=>{localStorage.setItem("garden_count","0");update();toastMsg("The garden is sleeping.")};addEventListener("resize",size);size();update();
 }
 if(key==="signals"){let n=0;const btn=document.getElementById("signalBtn"),out=document.getElementById("signalOutput"),ct=document.getElementById("signalCount");btn.onclick=()=>{n++;ct.textContent="signal strength: "+n+" / 7";if(n>=7){out.style.display="block";toastMsg("Transmission received.")}}}
 if(key==="dream"){const data={calm:["Breathe slowly.","The universe is not asking you to hurry.","Some nights are only asking to be quiet."],wild:["Be unreasonable.","Take the long road just because it has better music.","Not every beautiful decision needs a spreadsheet."],hope:["There are unopened doors.","There are mornings you have not lived yet.","The story is still moving."],nostalgia:["Some memories grow warmer with distance.","The past is allowed to be beautiful without becoming a place you must return to.","Keep the warmth. Release the weight."]};document.querySelectorAll(".dream").forEach(b=>b.onclick=()=>{let a=data[b.dataset.feel];document.getElementById("dreamTitle").textContent=a[0];document.getElementById("dreamBody").textContent=a[1];document.getElementById("dreamQuote").textContent=a[2];toastMsg("The dream changed.")})}
 document.querySelectorAll(".setmode").forEach(b=>b.onclick=()=>setMode(b.dataset.set));
}
function updateExplore(key){let v=JSON.parse(localStorage.getItem(VISITED_KEY)||"[]");if(key!=="home"&&!v.includes(key)){v.push(key);localStorage.setItem(VISITED_KEY,JSON.stringify(v))}const e=document.getElementById("explore");if(e)e.textContent=Math.min(100,Math.round(v.length/rooms.length*100))+"%"}
rooms.forEach(([id,title,desc])=>{const b=document.createElement("button");b.dataset.route=id;b.innerHTML=escape(title)+"<small>"+escape(desc)+"</small>";nav.appendChild(b)});
document.getElementById("openMenu").onclick=()=>{drawer.classList.add("open");drawer.setAttribute("aria-hidden","false")};
document.getElementById("closeMenu").onclick=closeDrawer;
function closeDrawer(){drawer.classList.remove("open");drawer.setAttribute("aria-hidden","true")}
document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{setMode(b.dataset.mode);closeDrawer()});
document.getElementById("modeCycle").onclick=()=>{const modes=["aurora","moon","rose","midnight"],m=currentMode(),next=modes[(modes.indexOf(m)+1)%modes.length];setMode(next)};
setMode(currentMode());
window.addEventListener("hashchange",render);
render();

/* independent star field: UI never depends on this canvas */
const sky=document.getElementById("sky"),ctx=sky.getContext("2d");let stars=[];
function resizeSky(){sky.width=innerWidth*devicePixelRatio;sky.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);stars=Array.from({length:Math.min(220,Math.floor(innerWidth/6))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:.2+Math.random()*1.5,a:.15+Math.random()*.7,v:.05+Math.random()*.25}))}
function animate(){ctx.clearRect(0,0,innerWidth,innerHeight);const accent=getComputedStyle(document.body).getPropertyValue("--accent");for(const s of stars){s.y+=s.v;if(s.y>innerHeight)s.y=-2;ctx.globalAlpha=s.a;ctx.fillStyle=accent;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;requestAnimationFrame(animate)}
addEventListener("resize",resizeSky);resizeSky();animate();
