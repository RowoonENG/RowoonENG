
const tabs=[...document.querySelectorAll('[role="tab"]')];
const panels=[...document.querySelectorAll('[role="tabpanel"]')];
const pageLabels={home:'홈',about:'회사소개',business:'사업분야',projects:'프로젝트 실적',contact:'문의하기'};
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let pageAnimations=[];
function animatePage(id){
 pageAnimations.forEach(animation=>animation.cancel());pageAnimations=[];
 if(reducedMotion.matches)return;
 const selectors={home:'.hero-inner .eyebrow,.hero h1,.hero-copy,.hero .actions,.hero-bottom',about:'.about-intro,.greeting p',business:'.section-head,.card',projects:'.section-head,.project-table,.partners',contact:'.contact-grid>div,.form'};
 const nodes=document.getElementById(id).querySelectorAll(selectors[id]);
 nodes.forEach((node,index)=>{
  const offset=id==='about'?'translateX(18px)':id==='projects'?'translateY(12px)':id==='contact'?'translateY(20px)':'translateY(24px)';
  if(typeof node.animate!=='function')return;
  pageAnimations.push(node.animate([{opacity:0,transform:offset},{opacity:1,transform:'translate(0,0)'}],{duration:id==='home'?650:480,delay:Math.min(index*65,390),easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
 });
}
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){pageAnimations.forEach(a=>a.cancel());pageAnimations=[]}});
function showPage(id,scroll=true){
 if(!Object.hasOwn(pageLabels,id))id='home';
 panels.forEach(panel=>{panel.hidden=panel.id!==id});
 tabs.forEach(tab=>{const active=tab.getAttribute('aria-controls')===id;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});
 document.title=pageLabels[id]+' | 로운이엔지 Rowoon ENG';
 if(scroll)window.scrollTo({top:0,behavior:'instant'});
 animatePage(id);
}
function navigate(id){if(location.hash==='#'+id){showPage(id)}else{location.hash=id}}
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const id=link.getAttribute('href').slice(1);if(Object.hasOwn(pageLabels,id)){event.preventDefault();navigate(id)}}));
tabs.forEach((tab,index)=>tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();tabs[next].focus();navigate(tabs[next].getAttribute('aria-controls'))}));
window.addEventListener('hashchange',()=>showPage(location.hash.slice(1)));
showPage(location.hash.slice(1),false);
document.getElementById('year').textContent=new Date().getFullYear();
const contactForm=document.getElementById('contact-form');
contactForm.addEventListener('submit',async e=>{
 e.preventDefault();
 const status=document.getElementById('form-status');
 const button=contactForm.querySelector('button[type=submit]');
 if(contactForm.elements._honey.value)return;
 const originalLabel=button.textContent;
 button.disabled=true;button.textContent='전송 중…';status.textContent='문의 내용을 전송하고 있습니다.';
 try{
  const response=await fetch(contactForm.action,{method:'POST',headers:{Accept:'application/json'},body:new FormData(contactForm)});
  const result=await response.json();
  if(!response.ok||result.success===false)throw new Error(result.message||'전송에 실패했습니다.');
  contactForm.reset();status.textContent='문의가 sales@rweng.net으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.';
 }catch(error){
  status.textContent='전송하지 못했습니다. 잠시 후 다시 시도하거나 sales@rweng.net으로 직접 문의해 주세요.';
 }finally{button.disabled=false;button.textContent=originalLabel}
});
// 카카오 지도 연동: JavaScript 키를 입력하고 서비스 도메인을 Kakao Developers에 등록하세요.
// 키가 비어 있거나 지도 로딩에 실패하면 주소와 카카오맵 검색 링크를 유지합니다.
const KAKAO_JAVASCRIPT_KEY=window.ROWOON_CONFIG?.kakaoJavascriptKey || '';
if(KAKAO_JAVASCRIPT_KEY){const script=document.createElement('script');script.src='https://dapi.kakao.com/v2/maps/sdk.js?appkey='+encodeURIComponent(KAKAO_JAVASCRIPT_KEY)+'&libraries=services&autoload=false';script.onload=()=>{kakao.maps.load(()=>{const geocoder=new kakao.maps.services.Geocoder();geocoder.addressSearch('경기도 오산시 수목원로88번길 35',(results,status)=>{if(status!==kakao.maps.services.Status.OK)return;const el=document.getElementById('kakao-map');document.getElementById('naver-map').hidden=true;el.hidden=false;el.replaceChildren();const center=new kakao.maps.LatLng(results[0].y,results[0].x);const map=new kakao.maps.Map(el,{center,level:3});new kakao.maps.Marker({map,position:center});window.addEventListener('resize',()=>{map.relayout();map.setCenter(center)})})})};document.head.appendChild(script)}
