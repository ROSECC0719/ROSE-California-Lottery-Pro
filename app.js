'use strict';
const APP_VERSION='1.7.0', UI_VERSION='ROSE-CA-F5-V1.7'; let D=[];
const panel=document.getElementById('panel'), latest=document.getElementById('latest');
const balls=a=>a.map(n=>`<span class="ball">${String(n).padStart(2,'0')}</span>`).join('');
const inlineBalls=a=>`<span class="inline-balls">${a.map(n=>`<span>${String(n).padStart(2,'0')}</span>`).join('')}</span>`;
const freq=ds=>{let f=Array(40).fill(0);ds.forEach(r=>r.numbers.forEach(n=>f[n]++));return f};
const gaps=a=>a.slice(1).map((n,i)=>n-a[i]);
function latestView(){const r=D[0];latest.innerHTML=`<div class="latest-top"><div><div class="dbline">🎯 最新資料 <span class="status">● 離線可用</span></div><div class="latest-meta">${r.date}｜Draw #${r.draw}｜資料庫 ${D.length} 期</div></div><div class="balls">${balls(r.numbers)}</div></div>`}
function history(){panel.innerHTML=`<h2>📚 歷史資料</h2><p>目前內建 ${D.length} 期真實官方資料樣本。可匯入 CSV 擴充；格式：date,draw,n1,n2,n3,n4,n5</p><input id="csv" type="file" accept=".csv,text/csv"><button class="action" id="clearImport">清除匯入資料</button><div class="tablewrap"><table><thead><tr><th>日期</th><th>期號</th><th>號碼</th></tr></thead><tbody>${D.map(r=>`<tr><td>${r.date}</td><td>#${r.draw}</td><td>${inlineBalls(r.numbers)}</td></tr>`).join('')}</tbody></table></div>`;document.getElementById('csv').onchange=importCSV;document.getElementById('clearImport').onclick=()=>{localStorage.removeItem('rose_ca_f5_import');location.reload()}}
function numbers(){let f=freq(D), last={};D.forEach((r,i)=>r.numbers.forEach(n=>{if(last[n]===undefined)last[n]=i}));let arr=Array.from({length:39},(_,i)=>i+1).sort((a,b)=>f[b]-f[a]||a-b);panel.innerHTML=`<h2>🔢 號碼研究</h2><p>以下是目前資料集的出現次數與距最新一期遺漏期數，不代表未來中獎率。</p><div class="numgrid">${arr.map(n=>`<div><b>${String(n).padStart(2,'0')}</b><small>${f[n]}次｜遺漏 ${last[n]??D.length} 期</small></div>`).join('')}</div>`}
function structure(){let rows=D.map(r=>{let odd=r.numbers.filter(n=>n%2).length,sum=r.numbers.reduce((a,b)=>a+b,0),g=gaps(r.numbers),con=g.filter(x=>x===1).length;return `<tr><td>${r.date}</td><td>${odd}:${5-odd}</td><td>${sum}</td><td>${con}</td><td>${g.join('-')}</td></tr>`});panel.innerHTML=`<h2>🧩 結構研究</h2><div class="tablewrap"><table><thead><tr><th>日期</th><th>奇:偶</th><th>和值</th><th>連號</th><th>Gap</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`}
function stats(){let f=freq(D),last={};D.forEach((r,i)=>r.numbers.forEach(n=>{if(last[n]===undefined)last[n]=i}));let arr=Array.from({length:39},(_,i)=>i+1).sort((a,b)=>f[b]-f[a]||a-b);let r=D[0],odd=r.numbers.filter(n=>n%2).length,sum=r.numbers.reduce((a,b)=>a+b,0),g=gaps(r.numbers);panel.innerHTML=`<h2>📊 統計分析</h2><p>目前使用 <b>${D.length} 期</b>。最新一期：奇偶 ${odd}:${5-odd}｜和值 ${sum}｜Gap ${g.join('-')}。</p><div class="numgrid">${arr.map(n=>`<div><b>${String(n).padStart(2,'0')}</b><small>${f[n]}次｜遺漏 ${last[n]??D.length}期</small></div>`).join('')}</div><p class="muted">統計只描述歷史資料，不是中獎機率。</p>`}
function combo(){
  const pairs=new Map(), triples=new Map();
  D.forEach(r=>{const a=r.numbers;for(let i=0;i<5;i++)for(let j=i+1;j<5;j++){let k=`${a[i]}-${a[j]}`;pairs.set(k,(pairs.get(k)||0)+1);for(let z=j+1;z<5;z++){let t=`${a[i]}-${a[j]}-${a[z]}`;triples.set(t,(triples.get(t)||0)+1)}}});
  const pa=[...pairs].sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])).slice(0,30), ta=[...triples].sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])).slice(0,20);
  panel.innerHTML=`<h2>💥 組合研究</h2><p><b>Pair 前30名</b>｜歷史共同出現次數</p><div class="chips">${pa.map(([k,v])=>`<span>${k}｜${v}次</span>`).join('')}</div><p><b>Triple 前20名</b></p><div class="chips">${ta.map(([k,v])=>`<span>${k}｜${v}次</span>`).join('')}</div><p class="muted">只描述目前 ${D.length} 期資料的共現，不是中獎機率。</p>`
}
function transfer(){
  const rows=[]; const carry=Array(40).fill(0), nextMap=Array.from({length:40},()=>Array(40).fill(0));
  for(let i=0;i<D.length-1;i++){
    const newer=D[i], older=D[i+1], oldSet=new Set(older.numbers), repeated=newer.numbers.filter(n=>oldSet.has(n));
    older.numbers.forEach(a=>newer.numbers.forEach(b=>nextMap[a][b]++)); repeated.forEach(n=>carry[n]++);
    rows.push({newer,older,repeated});
  }
  const hot=Array.from({length:39},(_,i)=>i+1).sort((a,b)=>carry[b]-carry[a]||a-b).slice(0,12);
  const trans=[];for(let a=1;a<=39;a++)for(let b=1;b<=39;b++)if(nextMap[a][b])trans.push([a,b,nextMap[a][b]]);trans.sort((x,y)=>y[2]-x[2]||x[0]-y[0]||x[1]-y[1]);
  panel.innerHTML=`<h2>🔁 拖牌研究</h2><p><b>拖牌＝前一期開過的號碼，在下一期再次出現。</b> 例如前期有 09、14、27，下一期又開 09，就是「09 拖 1 次」。</p><h3>最常被拖的號碼</h3><div class="chips">${hot.map(n=>`<span>${String(n).padStart(2,'0')} 被拖 <b>${carry[n]}</b> 次</span>`).join('')}</div><h3>前一期號碼 → 下一期常一起出現 Top 24</h3><div class="chips">${trans.slice(0,24).map(([a,b,c])=>`<span>${String(a).padStart(2,'0')} → ${String(b).padStart(2,'0')}｜${c}次</span>`).join('')}</div><h3>逐期實際拖牌</h3><div class="tablewrap"><table><thead><tr><th>本期日期</th><th>前一期</th><th>本期</th><th>拖幾碼</th><th>拖了誰</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${x.newer.date}</td><td>${inlineBalls(x.older.numbers)}</td><td>${inlineBalls(x.newer.numbers)}</td><td><b>${x.repeated.length}</b></td><td>${x.repeated.length?inlineBalls(x.repeated):'—'}</td></tr>`).join('')}</tbody></table></div><p class="muted">這是歷史描述統計，不代表下一期必然延續。</p>`
}
function walk(){
  if(D.length<20){panel.innerHTML='<h2>🧪 Walk-forward</h2><p>資料不足。</p>';return}
  const asc=[...D].reverse(),tests=[];
  for(let i=20;i<asc.length;i++){const train=asc.slice(0,i),f=freq(train),pick=Array.from({length:39},(_,k)=>k+1).sort((a,b)=>f[b]-f[a]||a-b).slice(0,5),hit=asc[i].numbers.filter(n=>pick.includes(n)).length;tests.push({date:asc[i].date,pick,actual:asc[i].numbers,hit})}
  const avg=tests.reduce((s,x)=>s+x.hit,0)/tests.length; tests.reverse();
  panel.innerHTML=`<h2>🧪 Walk-forward 嚴格盲測</h2><p>每一期只用該期以前資料；最低訓練窗 20 期。平均命中 <b>${avg.toFixed(2)}</b> 碼／期，這不是中獎率。<b>最新測試固定排最上面。</b></p><div class="tablewrap"><table><thead><tr><th>測試日 ↓最新</th><th>研究組合</th><th>實際</th><th>命中</th></tr></thead><tbody>${tests.map(x=>`<tr><td>${x.date}</td><td>${inlineBalls(x.pick)}</td><td>${inlineBalls(x.actual)}</td><td><b>${x.hit}</b></td></tr>`).join('')}</tbody></table></div>`
}
function daily(){
  panel.innerHTML=`<h2>🎯 今日嚴選五組｜固定研究規則</h2><p>這裡改成你說的「固定規則」輸入：可以直接寫 <b>09、14、27 三期一次常開</b>，或 <b>34 拖 27、37、33</b>。規則會保存在本機，下一次打開還在。</p><div class="rulegrid"><label>固定號碼規則<textarea id="fixedRules" rows="5" placeholder="例如：\n09 14 27｜3期至少出1碼\n05 11｜每組至少出1碼"></textarea></label><label>拖牌規則<textarea id="dragRules" rows="5" placeholder="例如：\n34 -> 27 37 33\n09 -> 14 27"></textarea></label><label>排除號<input id="ban" placeholder="例如 01 39"></label><label>每組奇數數量<select id="odd"><option value="any">不限</option><option value="2">2 奇 3 偶</option><option value="3" selected>3 奇 2 偶</option></select></label><label>鄰期重複最多<select id="repeat"><option>0</option><option>1</option><option selected>2</option><option>3</option><option>5</option></select></label><label>和值範圍<div class="range"><input id="sumMin" type="number" value="65"><span>～</span><input id="sumMax" type="number" value="135"></div></label></div><button class="action big-action" id="saveRules">💾 儲存固定規則</button><button class="action big-action" id="gen5">🎯 依固定規則產生五組</button><div id="ruleStatus" class="notice"></div><div id="picks"></div><p class="muted">固定規則是研究條件，不是中獎保證；產生器仍維持 1～39、每組5碼、不重複。</p>`;
  const saved=JSON.parse(localStorage.getItem('rose_ca_f5_rules')||'{}');
  if(saved.fixedRules)document.getElementById('fixedRules').value=saved.fixedRules;if(saved.dragRules)document.getElementById('dragRules').value=saved.dragRules;if(saved.ban)document.getElementById('ban').value=saved.ban;if(saved.odd)document.getElementById('odd').value=saved.odd;if(saved.repeat!=null)document.getElementById('repeat').value=saved.repeat;if(saved.sumMin)document.getElementById('sumMin').value=saved.sumMin;if(saved.sumMax)document.getElementById('sumMax').value=saved.sumMax;
  document.getElementById('saveRules').onclick=saveRules;document.getElementById('gen5').onclick=()=>{saveRules(false);generateFive()};generateFive()
}
function saveRules(show=true){const o={fixedRules:document.getElementById('fixedRules').value,dragRules:document.getElementById('dragRules').value,ban:document.getElementById('ban').value,odd:document.getElementById('odd').value,repeat:document.getElementById('repeat').value,sumMin:document.getElementById('sumMin').value,sumMax:document.getElementById('sumMax').value};localStorage.setItem('rose_ca_f5_rules',JSON.stringify(o));if(show)document.getElementById('ruleStatus').innerHTML='✅ 固定規則已儲存在這台裝置。'}
function ruleNums(text){return [...new Set((text.match(/\b(?:[1-9]|[12]\d|3[0-9])\b/g)||[]).map(Number))]}
function fixedRuleGroups(text){return text.split(/\n+/).map(line=>({line,nums:ruleNums(line)})).filter(x=>x.nums.length)}
function dragTargets(text){const latest=new Set(D[0].numbers),out=[];text.split(/\n+/).forEach(line=>{const [left,right='']=line.split(/->|→|拖/);const src=ruleNums(left),tar=ruleNums(right);if(src.some(n=>latest.has(n)))out.push(...tar)});return [...new Set(out)]}

function parseNums(id){return [...new Set(document.getElementById(id).value.split(/[ ,，、]+/).map(Number).filter(n=>n>=1&&n<=39))]}
function generateFive(){
  const fixed=fixedRuleGroups(document.getElementById('fixedRules').value),drag=dragTargets(document.getElementById('dragRules').value),ban=new Set(parseNums('ban')),oddRule=document.getElementById('odd').value,repMax=+document.getElementById('repeat').value,min=+document.getElementById('sumMin').value,max=+document.getElementById('sumMax').value,status=document.getElementById('ruleStatus');
  if(min>max){document.getElementById('picks').innerHTML='<p>和值規則衝突，請調整。</p>';return}
  const preferred=[...new Set([...fixed.flatMap(x=>x.nums),...drag])].filter(n=>!ban.has(n));
  status.innerHTML=`固定規則 <b>${fixed.length}</b> 條｜本期觸發拖牌目標 <b>${drag.length?drag.map(n=>String(n).padStart(2,'0')).join('、'):'無'}</b>｜排除 <b>${ban.size?[...ban].map(n=>String(n).padStart(2,'0')).join('、'):'無'}</b>｜和值 <b>${min}～${max}</b>`;
  const F=freq(D),R=freq(D.slice(0,12)),last={};D.forEach((r,i)=>r.numbers.forEach(n=>{if(last[n]===undefined)last[n]=i}));const prev=new Set(D[0].numbers),used=Array(40).fill(0),out=[];
  for(let g=0;g<5;g++){
    const ranked=Array.from({length:39},(_,i)=>i+1).filter(n=>!ban.has(n)).sort((a,b)=>{const bonus=n=>preferred.includes(n)?8:0;const sa=F[a]+R[a]*1.8+Math.min(last[a]??D.length,12)*.22-used[a]*3.2+bonus(a)+((a*7+g*11)%13)*.01,sb=F[b]+R[b]*1.8+Math.min(last[b]??D.length,12)*.22-used[b]*3.2+bonus(b)+((b*7+g*11)%13)*.01;return sb-sa||a-b});
    let best=null; const pool=ranked.slice(0,26);
    for(let tries=0;tries<3500&&!best;tries++){
      let t=[]; if(preferred.length)t.push(preferred[(g+tries)%preferred.length]);
      const offset=(tries*7+g*5)%pool.length;for(let j=0;j<pool.length&&t.length<5;j++){const n=pool[(offset+j*3)%pool.length];if(!t.includes(n))t.push(n)}
      t=[...new Set(t)].slice(0,5).sort((a,b)=>a-b);if(t.length<5)continue;const sum=t.reduce((a,b)=>a+b,0),odd=t.filter(n=>n%2).length,rep=t.filter(n=>prev.has(n)).length;const fixedOK=fixed.every(x=>x.nums.some(n=>t.includes(n)));
      if(sum>=min&&sum<=max&&rep<=repMax&&(oddRule==='any'||odd===+oddRule)&&fixedOK)best=t;
    }
    if(!best)best=ranked.slice(0,5).sort((a,b)=>a-b);best.forEach(n=>used[n]++);out.push(best)
  }
  document.getElementById('picks').innerHTML=out.map((p,i)=>`<div class="pick-card"><strong>第 ${i+1} 組</strong><div class="balls">${balls(p)}</div><small>和值 ${p.reduce((a,b)=>a+b,0)}｜奇數 ${p.filter(n=>n%2).length}｜鄰期重複 ${p.filter(n=>prev.has(n)).length}</small></div>`).join('')
}
function importCSV(e){let file=e.target.files[0];if(!file)return;let rd=new FileReader;rd.onload=()=>{let rows=rd.result.trim().split(/\r?\n/).slice(1).map(line=>line.split(',')).filter(a=>a.length>=7).map(a=>({date:a[0].trim(),draw:+a[1],numbers:a.slice(2,7).map(Number).sort((x,y)=>x-y)})).filter(r=>r.numbers.length===5&&r.numbers.every(n=>n>=1&&n<=39));if(!rows.length)return alert('CSV 格式不符');localStorage.setItem('rose_ca_f5_import',JSON.stringify(rows));location.reload()};rd.readAsText(file)}
const views={history,stats,transfer,combo,walk,daily};
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{views[b.dataset.view]();panel.scrollIntoView({behavior:'smooth'})});
(async()=>{let base=await fetch('./data/fantasy5-history.json',{cache:'no-store'}).then(r=>r.json());let imp=JSON.parse(localStorage.getItem('rose_ca_f5_import')||'[]');let map=new Map([...base,...imp].map(r=>[r.date,r]));D=[...map.values()].sort((a,b)=>b.date.localeCompare(a.date));latestView();daily()})().catch(e=>panel.innerHTML=`<h2>資料載入失敗</h2><p>${e.message}</p>`);
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
