(() => {
  const r = window.SITE_DATA?.recruitment;
  if (!r) return;
  const $ = (s) => document.querySelector(s);
  const set = (s, v) => { const n=$(s); if(n) n.textContent=v ?? ""; };
  set("#recruit-title", r.title);
  set("#recruit-catch", r.catch);
  set("#recruit-lead", r.catch);
  const img=$("#recruit-image"); if(img){img.src=r.image||"";img.alt=r.imageAlt||"求人募集";}
  const rows=$("#recruit-rows");
  (r.rows||[]).forEach(([label,value])=>{
    const w=document.createElement("div");
    const dt=document.createElement("dt"); dt.textContent=label;
    const dd=document.createElement("dd"); dd.textContent=value;
    w.append(dt,dd); rows.appendChild(w);
  });
  set("#recruit-contact-title", r.contactTitle);
  set("#recruit-contact-person", r.contactPerson);
  set("#recruit-phone", r.phoneDisplay);
  set("#recruit-email", r.email);
  $("#recruit-phone-link").href=`tel:${r.phoneLink||""}`;
  $("#recruit-mail-link").href=`mailto:${r.email||""}`;
})();
