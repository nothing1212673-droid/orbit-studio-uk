(()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const storage={get(k,f){try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
let timer;function toast(text){const t=$('.toast');if(!t)return;t.textContent=text;t.hidden=false;clearTimeout(timer);timer=setTimeout(()=>t.hidden=true,3500)}
function download(name,text){const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
const money=n=>Number(n).toLocaleString('uk-UA')+' грн';
const toggle=$('.menu-toggle'),links=$('.navlinks');
function closeMenu(focus=false){if(!toggle||!links)return;links.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Відкрити меню');if(focus)toggle.focus()}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';links.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрити меню':'Відкрити меню')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu(true)});
document.addEventListener('click',e=>{if(links?.classList.contains('open')&&!e.target.closest('.site-header'))closeMenu()});
$$('.navlinks a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
$$('[data-dialog]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.dialog)?.showModal()));
$$('dialog .close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
let scheduled=false;function progress(){scheduled=false;const y=window.scrollY,max=document.documentElement.scrollHeight-innerHeight;$('.progress-line')?.style.setProperty('transform','scaleX('+(max>0?Math.min(1,y/max):0)+')');$('.site-header')?.classList.toggle('scrolled',y>10);$('.back-top')?.classList.toggle('visible',y>550)}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(progress)}},{passive:true});progress();
$('.back-top')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver'in window){document.documentElement.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');observer.unobserve(e.target)}}),{threshold:.06});$$('[data-reveal]').forEach(el=>observer.observe(el))}
function pop(el){if(!el||reduced)return;el.classList.remove('animate-pop');void el.offsetWidth;el.classList.add('animate-pop')}
window.ui={$,$$,storage,toast,download,money,pop,reduced};
})();