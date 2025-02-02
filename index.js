import{a as w,S as L,i as u}from"./assets/vendor-D0cagnvz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const S="48601287-44eda15d36b20e5cccdc82f7d",f=async(o,t)=>{var i;try{return(await w.get("https://pixabay.com/api/",{params:{key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})).data}catch(l){throw new Error(((i=l.response)==null?void 0:i.status)||"Network Error")}};function p(o){return o.map(({webformatURL:t,largeImageURL:i,tags:l,likes:e,views:r,comments:c,downloads:b})=>`<li class="gallery-item">
  <a class="gallery-link" href="${i}">
    <img class="gallery-image" src="${t}" alt="${l}" />
  </a>
  <ul class="inform">
    <li class="inform-link">
      <h2 class="inform-title">Likes:</h2>
      <p class="inform-dan">${e}</p>
    </li>
    <li class="inform-link">
      <h2 class="inform-title">Views:</h2>
      <p class="inform-dan">${r}</p>
    </li>
    <li class="inform-link">
      <h2 class="inform-title">Comments:</h2>
      <p class="inform-dan">${c}</p>
    </li>
    <li class="inform-link">
      <h2 class="inform-title">Downloads:</h2>
      <p class="inform-dan">${b}</p>
    </li>
  </ul>
</li>`).join("")}let n=1;const m=15,d=document.querySelector(".input");document.querySelector(".button-submit");const y=document.querySelector(".gallery"),h=document.querySelector(".group-form"),a=document.querySelector(".loader"),s=document.querySelector(".lm-btn");h.addEventListener("submit",k);s.addEventListener("click",q);a.style.display="none";s.style.display="none";const g=new L(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});async function k(o){if(o.preventDefault(),y.innerHTML="",!d.value.trim()){u.error({title:"Error",message:"Please enter your search terms",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",titleColor:"#fff"});return}a.style.display="inline-block";try{const t=await f(d.value,n);t.hits.length===0&&u.show({title:"",backgroundColor:"#EF4040",messageColor:"#FFFFFF",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}),n=1,y.insertAdjacentHTML("beforeend",p(t.hits)),g.refresh(),a.style.display="none",n*m<t.totalHits&&(s.style.display="inline-block")}catch(t){console.log(t.message)}finally{a.style.display="none"}}async function q(){n+=1,s.disabled=!0,s.style.display="none",a.style.display="inline-block";try{const o=await f(d.value,n);y.insertAdjacentHTML("beforeend",p(o.hits)),g.refresh(),a.style.display="none",n*m>=o.totalHits?(s.style.display="none",u.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter",timeout:1e3}),h.reset()):s.style.display="inline-block";const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}catch(o){alert(o.message)}finally{s.disabled=!1}}
//# sourceMappingURL=index.js.map
