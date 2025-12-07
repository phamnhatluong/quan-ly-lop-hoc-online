// js/app.js
// small safety check: ensure no injected scripts exist in DOM head/footer
(function(){
  // remove known malicious scripts if any (best-effort)
  const suspicious = ['inject.js','inject2.js','pass.work.ink','pdfeditor'];
  document.querySelectorAll('script').forEach(s=>{
    try{
      const src = s.getAttribute('src') || '';
      for(const key of suspicious) if(src.includes(key)) s.remove();
    }catch(e){}
  });
})();
