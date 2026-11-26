"use strict";
const STORAGE_KEY="tus-kartlari-progress-v1",SETTINGS_KEY="tus-kartlari-settings-v2";
const DEFAULTS={speechEnabled:false,voiceURI:"",speechRate:1,timingMode:"fixed",questionSeconds:8,answerSeconds:12,wordsPerMinute:180,minSeconds:4,maxSeconds:35,loopEnabled:false,frontColor:"#172943",backColor:"#192f45",accentColor:"#78a9ff"};
const state={decks:[],deckId:null,category:"Tümü",filtered:[],index:0,flipped:false,progress:{},settings:{...DEFAULTS},playing:false,phaseTimer:null,phaseToken:0,speechUtterance:null,voices:[],shuffleOrder:false};
const $=id=>document.getElementById(id);
function loadProgress(){try{state.progress=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");}catch{state.progress={};}}
function saveProgress(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state.progress));renderProgress();}
function loadSettings(){try{state.settings={...DEFAULTS,...JSON.parse(localStorage.getItem(SETTINGS_KEY)||"{}")};}catch{state.settings={...DEFAULTS};}}
function saveSettings(){const s=state.settings;localStorage.setItem(SETTINGS_KEY,JSON.stringify(s));applyColors();$("settings-status").textContent="Kaydedildi.";toast("Ayarlar kaydedildi");}
function deck(){return state.decks.find(d=>d.id===state.deckId)||state.decks[0];}
function cards(){return deck()?.cards||[];}
function status(card){return state.progress[card.id]?.status||"new";}
function isStarred(card){return !!state.progress[card.id]?.starred;}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2300);}
function categoryOf(d){return (d.title.split(" · ")[0]||"Diğer").trim();}
function shortTitle(d){return d.title.split(" · ").slice(1).join(" · ")||d.title;}
function renderCategories(){
 const groups=["Tümü",...new Set(state.decks.map(categoryOf))],root=$("category-list");root.replaceChildren();
 groups.forEach(name=>{const b=document.createElement("button");b.type="button";b.className="category-chip"+(state.category===name?" active":"");b.textContent=name;b.setAttribute("aria-pressed",String(state.category===name));b.addEventListener("click",()=>{state.category=name;renderCategories();renderTopics();});root.append(b);});
}
function renderTopics(){
 const query=$("topic-search").value.trim().toLocaleLowerCase("tr"),list=$("topic-list");
 const found=state.decks.filter(d=>(state.category==="Tümü"||categoryOf(d)===state.category)&&(!query||d.title.toLocaleLowerCase("tr").includes(query)));
 $("topic-count").textContent=found.length+" deste · "+found.reduce((n,d)=>n+d.cards.length,0)+" kart";list.replaceChildren();
 if(!found.length){const p=document.createElement("p");p.className="muted small";p.textContent="Eşleşen konu bulunamadı.";list.append(p);return;}
 found.forEach(d=>{const b=document.createElement("button");b.type="button";b.className="topic-item"+(d.id===state.deckId?" selected":"");const title=document.createElement("span"),count=document.createElement("small");title.textContent=shortTitle(d);count.textContent=d.cards.length+" kart";b.append(title,count);b.setAttribute("aria-pressed",String(d.id===state.deckId));b.addEventListener("click",()=>selectDeck(d.id));list.append(b);});
}
function selectDeck(id){stopAutoplay();state.deckId=id;state.index=0;state.shuffleOrder=false;$("search").value="";$("status-filter").value="all";applyFilter();renderProgress();renderTopics();}
function applyFilter(){
 const q=$("search").value.trim().toLocaleLowerCase("tr"),filter=$("status-filter").value;
 state.filtered=cards().filter(c=>{
  const text=[c.question,c.answer,c.explanation].join(" ").toLocaleLowerCase("tr");
  const matchesText=!q||text.includes(q),s=status(c);
  const matchesStatus=filter==="all"||(filter==="starred"?isStarred(c):s===filter);
  return matchesText&&matchesStatus;
 });
 if(state.shuffleOrder)state.filtered=shuffle([...state.filtered]);
 state.index=Math.min(state.index,Math.max(0,state.filtered.length-1));renderCard();
}
function current(){return state.filtered[state.index];}
function renderCard(){
 const c=current();$("empty-state").hidden=!!c;$("flashcard").hidden=!c;$("card-position").textContent=c?"Kart "+(state.index+1)+" / "+state.filtered.length:"Kart bulunamadı";$("card-topic").textContent=deck()?.title.toLocaleUpperCase("tr")||"";
 if(!c){$("star-btn").disabled=true;return;}
 $("star-btn").disabled=false;$("question").textContent=c.question;$("answer").textContent=c.answer;$("explanation").textContent=c.explanation||"";
 state.flipped=false;$("flashcard").classList.remove("flipped");$("flip-btn").textContent="Yanıtı göster";$("prev-btn").disabled=state.index===0;$("next-btn").disabled=state.index>=state.filtered.length-1;
 $("star-btn").textContent=isStarred(c)?"★ Yıldızlı":"☆ Yıldızla";$("star-btn").classList.toggle("starred",isStarred(c));
}
function renderProgress(){
 const all=cards(),known=all.filter(c=>status(c)==="known").length,review=all.filter(c=>status(c)==="again").length,total=all.length;
 $("total-count").textContent=total;$("known-count").textContent=known;$("review-count").textContent=review;$("new-count").textContent=total-known-review;$("progress-percent").textContent=(total?Math.round(known/total*100):0)+"%";$("progress-bar").style.width=(total?known/total*100:0)+"%";
}
function flip(){if(!current())return;state.flipped=!state.flipped;$("flashcard").classList.toggle("flipped",state.flipped);$("flip-btn").textContent=state.flipped?"Soruyu göster":"Yanıtı göster";}
function move(delta){if(!state.filtered.length)return;stopAutoplay();state.index=Math.max(0,Math.min(state.filtered.length-1,state.index+delta));renderCard();}
function mark(value){const c=current();if(!c)return;state.progress[c.id]={...state.progress[c.id],status:value,updatedAt:new Date().toISOString()};saveProgress();if($("status-filter").value!=="all"){applyFilter();}else{renderCard();}toast(value==="known"?"Öğrenildi olarak işaretlendi":"Tekrar listesine eklendi");}
function toggleStar(){const c=current();if(!c)return;state.progress[c.id]={...state.progress[c.id],starred:!isStarred(c),updatedAt:new Date().toISOString()};saveProgress();if($("status-filter").value==="starred"){applyFilter();}else{renderCard();}}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function wordCount(text){return (text.trim().match(/[\p{L}\p{N}]+/gu)||[]).length;}
function phaseDuration(text,kind){
 const s=state.settings;if(s.timingMode==="fixed")return (kind==="question"?s.questionSeconds:s.answerSeconds)*1000;
 const raw=wordCount(text)/Math.max(60,s.wordsPerMinute)*60000+1000;
 return Math.max(s.minSeconds*1000,Math.min(s.maxSeconds*1000,raw));
}
function stopSpeech(){if("speechSynthesis"in window){window.speechSynthesis.cancel();}state.speechUtterance=null;}
function speak(text){
 return new Promise(resolve=>{
  if(!("speechSynthesis"in window)||typeof SpeechSynthesisUtterance==="undefined"){resolve();return;}
  const utter=new SpeechSynthesisUtterance(text);utter.lang="tr-TR";utter.rate=Number(state.settings.speechRate)||1;
  const voice=state.voices.find(v=>v.voiceURI===state.settings.voiceURI);if(voice)utter.voice=voice;
  state.speechUtterance=utter;let finished=false;const done=()=>{if(finished)return;finished=true;if(state.speechUtterance===utter)state.speechUtterance=null;resolve();};
  utter.onend=done;utter.onerror=done;window.speechSynthesis.speak(utter);
 });
}
function beginPhase(text,kind,onDone){
 const token=state.phaseToken,duration=phaseDuration(text,kind);let timerDone=false,speechDone=!state.settings.speechEnabled,finished=false;
 const finish=()=>{if(finished||!timerDone||!speechDone||!state.playing||token!==state.phaseToken)return;finished=true;onDone();};
 state.phaseTimer=setTimeout(()=>{timerDone=true;finish();},duration);
 if(state.settings.speechEnabled)speak(text).then(()=>{speechDone=true;finish();});
}
function runQuestion(){
 if(!state.playing)return;const c=current();if(!c){stopAutoplay();return;}if(state.flipped)flip();
 beginPhase(c.question,"question",()=>{if(!state.playing)return;flip();runAnswer();});
}
function runAnswer(){
 const c=current();if(!c||!state.playing)return;const text=[c.answer,c.explanation].filter(Boolean).join(". ");
 beginPhase(text,"answer",()=>{if(!state.playing)return;if(state.index>=state.filtered.length-1){if(state.settings.loopEnabled){state.index=0;renderCard();runQuestion();}else stopAutoplay();}else{state.index++;renderCard();runQuestion();}});
}
function stopAutoplay(){
 state.playing=false;state.phaseToken++;if(state.phaseTimer)clearTimeout(state.phaseTimer);state.phaseTimer=null;stopSpeech();$("autoplay-btn").textContent="▶ Otomatik oynat";$("autoplay-btn").classList.remove("playing");
}
function startAutoplay(){
 if(!state.filtered.length)return;stopAutoplay();state.playing=true;state.phaseToken++;$("autoplay-btn").textContent="Ⅱ Duraklat";$("autoplay-btn").classList.add("playing");runQuestion();
}
function toggleAutoplay(){if(state.playing)stopAutoplay();else startAutoplay();}
function readCurrent(which){
 stopSpeech();const c=current();if(!c)return;const text=which==="question"?c.question:[c.answer,c.explanation].filter(Boolean).join(". ");speak(text);
}
function refreshVoices(){
 if(!("speechSynthesis"in window))return;state.voices=window.speechSynthesis.getVoices();const select=$("voice-select"),previous=state.settings.voiceURI;select.replaceChildren();
 const defaultOpt=document.createElement("option");defaultOpt.value="";defaultOpt.textContent="Varsayılan sistem sesi";select.append(defaultOpt);
 state.voices.forEach(v=>{const o=document.createElement("option");o.value=v.voiceURI;o.textContent=v.name+" ("+v.lang+")";select.append(o);});
 select.value=previous;
}
function applyColors(){const s=state.settings,root=document.documentElement;root.style.setProperty("--card-front",s.frontColor);root.style.setProperty("--card-back",s.backColor);root.style.setProperty("--accent",s.accentColor);$("front-color").value=s.frontColor;$("back-color").value=s.backColor;$("accent-color").value=s.accentColor;}
function syncSettingsUI(){
 const s=state.settings; $("speech-enabled").checked=s.speechEnabled;$("voice-select").value=s.voiceURI;$("speech-rate").value=s.speechRate;$("speech-rate-value").textContent=Number(s.speechRate).toFixed(1)+"×";$("timing-mode").value=s.timingMode;
 $("question-seconds").value=s.questionSeconds;$("answer-seconds").value=s.answerSeconds;$("words-per-minute").value=s.wordsPerMinute;$("min-seconds").value=s.minSeconds;$("max-seconds").value=s.maxSeconds;$("loop-enabled").checked=s.loopEnabled;applyColors();
}
function readSettingsUI(){
 const s=state.settings;s.speechEnabled=$("speech-enabled").checked;s.voiceURI=$("voice-select").value;s.speechRate=Number($("speech-rate").value);s.timingMode=$("timing-mode").value;
 s.questionSeconds=clamp($("question-seconds").value,2,120,8);s.answerSeconds=clamp($("answer-seconds").value,2,180,12);s.wordsPerMinute=clamp($("words-per-minute").value,60,360,180);s.minSeconds=clamp($("min-seconds").value,2,60,4);s.maxSeconds=clamp($("max-seconds").value,5,180,35);if(s.maxSeconds<s.minSeconds)s.maxSeconds=s.minSeconds;s.loopEnabled=$("loop-enabled").checked;
 s.frontColor=$("front-color").value;s.backColor=$("back-color").value;s.accentColor=$("accent-color").value;
}
function clamp(v,min,max,fallback){const n=Number(v);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):fallback;}
function exportProgress(){const payload={format:"tus-kartlari-progress",version:1,exportedAt:new Date().toISOString(),progress:state.progress};const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="tus-kartlari-ilerleme.json";a.click();URL.revokeObjectURL(url);toast("İlerleme dosyası indirildi");}
function importProgress(file){const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(data.format!=="tus-kartlari-progress"||!data.progress||typeof data.progress!=="object")throw Error("invalid");state.progress={...state.progress,...data.progress};saveProgress();renderCard();toast("İlerleme içe aktarıldı");}catch{toast("Dosya okunamadı veya biçimi geçersiz");}};reader.readAsText(file);}
function bindEvents(){
 $("topic-search").addEventListener("input",renderTopics);$("search").addEventListener("input",()=>{stopAutoplay();state.index=0;applyFilter();});$("status-filter").addEventListener("change",()=>{stopAutoplay();state.index=0;applyFilter();});
 $("flashcard").addEventListener("click",()=>{stopAutoplay();flip();});$("flip-btn").addEventListener("click",()=>{stopAutoplay();flip();});$("prev-btn").addEventListener("click",()=>move(-1));$("next-btn").addEventListener("click",()=>move(1));
 $("again-btn").addEventListener("click",()=>mark("again"));$("known-btn").addEventListener("click",()=>mark("known"));$("star-btn").addEventListener("click",toggleStar);
 $("autoplay-btn").addEventListener("click",toggleAutoplay);$("read-question-btn").addEventListener("click",()=>readCurrent("question"));$("read-answer-btn").addEventListener("click",()=>readCurrent("answer"));$("stop-speech-btn").addEventListener("click",()=>{if(state.playing)stopAutoplay();else stopSpeech();});
 $("test-voice-btn").addEventListener("click",()=>{readSettingsUI();speak("TUS kartları sesli okuma testi.");});$("shuffle-btn").addEventListener("click",()=>{stopAutoplay();state.filtered=shuffle([...state.filtered]);state.index=0;state.shuffleOrder=true;renderCard();toast("Kart sırası karıştırıldı");});
 $("export-btn").addEventListener("click",exportProgress);$("import-btn").addEventListener("click",()=>$("import-file").click());$("import-file").addEventListener("change",e=>{if(e.target.files[0])importProgress(e.target.files[0]);e.target.value="";});
 $("reset-btn").addEventListener("click",()=>{if(!confirm("Bu desteye ait tüm ilerleme silinsin mi?"))return;for(const c of cards())delete state.progress[c.id];saveProgress();renderCard();toast("Deste ilerlemesi sıfırlandı");});
 $("settings-toggle").addEventListener("click",()=>{const open=$("settings-content").hidden;$("settings-content").hidden=!open;$("settings-toggle").setAttribute("aria-expanded",String(open));$("settings-chevron").textContent=open?"−":"＋";});
 $("speech-rate").addEventListener("input",()=>{$("speech-rate-value").textContent=Number($("speech-rate").value).toFixed(1)+"×";});
 $("save-settings-btn").addEventListener("click",()=>{readSettingsUI();saveSettings();});
 $("reset-colors-btn").addEventListener("click",()=>{state.settings.frontColor=DEFAULTS.frontColor;state.settings.backColor=DEFAULTS.backColor;state.settings.accentColor=DEFAULTS.accentColor;applyColors();});
 ["front-color","back-color","accent-color"].forEach((id)=>$(id).addEventListener("input",()=>{readSettingsUI();applyColors();}));
 document.addEventListener("keydown",e=>{if(["INPUT","SELECT","TEXTAREA"].includes(document.activeElement.tagName)||e.target.isContentEditable)return;if(e.key==="ArrowRight")move(1);if(e.key==="ArrowLeft")move(-1);if(e.code==="Space"){e.preventDefault();stopAutoplay();flip();}if(e.key==="1")mark("again");if(e.key==="2")mark("known");if(e.key.toLowerCase()==="p")toggleAutoplay();});
}
function init(){
 loadProgress();loadSettings();syncSettingsUI();
 fetch("data/cards.json").then(r=>{if(!r.ok)throw Error("Kart verisi yüklenemedi");return r.json();}).then(data=>{
  state.decks=data.decks||[];state.deckId=state.decks[0]?.id;renderCategories();renderTopics();bindEvents();refreshVoices();
  if("speechSynthesis"in window)window.speechSynthesis.onvoiceschanged=refreshVoices;
  applyFilter();renderProgress();
 }).catch(err=>{$("question").textContent=err.message;$("card-position").textContent="Yükleme hatası";});
}
init();