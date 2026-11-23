// 広告カルーセル: 手動操作のみ（自動再生なし）
(function(){
  var root=document.querySelector('[data-carousel]');
  if(!root) return;
  var track=root.querySelector('.carousel-track');
  var cards=track.children;
  var dotsBox=root.querySelector('[data-dots]');
  var dots=[];
  for(var i=0;i<cards.length;i++){
    var d=document.createElement('button');
    d.type='button';
    d.setAttribute('aria-label',(i+1)+'番目の広告へ');
    if(i===0) d.setAttribute('aria-current','true');
    (function(idx){
      d.addEventListener('click',function(){ goTo(idx); });
    })(i);
    dotsBox.appendChild(d);
    dots.push(d);
  }
  function current(){
    var w=track.clientWidth;
    return Math.min(cards.length-1, Math.round(track.scrollLeft/(w*0.9)));
  }
  function goTo(idx){
    track.scrollTo({left: cards[idx].offsetLeft - track.offsetLeft, behavior:'smooth'});
  }
  function sync(){
    var c=current();
    dots.forEach(function(d,i){ d.setAttribute('aria-current', i===c ? 'true':'false'); });
  }
  track.addEventListener('scroll', function(){ window.requestAnimationFrame(sync); }, {passive:true});
  root.querySelector('[data-prev]').addEventListener('click', function(){ goTo(Math.max(0, current()-1)); });
  root.querySelector('[data-next]').addEventListener('click', function(){ goTo(Math.min(cards.length-1, current()+1)); });
  if(cards.length<=1){
    root.querySelector('.carousel-ui').style.display='none';
  }
})();
