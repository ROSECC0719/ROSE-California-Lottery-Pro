'use strict';
const APP_VERSION='1.1.0';
const UI_VERSION='ROSE-CA-F5-V1.1';
const panel=document.getElementById('panel');
document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>{const name=btn.dataset.view;panel.innerHTML=`<h2>${btn.textContent.trim().split('\n')[0]}</h2><p>${name}模組已預留獨立入口。V1.1 先完成可部署 UI；後續加入真實歷史資料與研究引擎時，會維持 Walk-forward 防偷看規範。</p><div class="notice">版本：${APP_VERSION}｜畫面：${UI_VERSION}</div>`;panel.scrollIntoView({behavior:'smooth',block:'nearest'});}));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));}
