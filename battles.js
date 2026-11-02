'use strict';
(() => {
const battles={
gyokko:{name:'Гёкко',rank:'Высшая луна · Пять',glyph:'伍',portrait:'asset-3.png',intro:'Деревня кузнецов. Водяная тюрьма, ядовитые рыбы и туман, в котором противник теряет мечника из виду.',forms:[
{index:0,context:'Попытка пробить водяную тюрьму Гёкко. Первый выпад не позволяет выбраться.'},
{index:1,context:'Получив воздух от Котэцу, Муичиро разрезает водяную тюрьму и освобождается.'},
{index:3,tag:'ДОПОЛНЕНИЕ АНИМЕ',context:'В аниме Муичиро применяет этот приём против рыб-демонов Гёкко.'},
{index:4,context:'Быстрая серия ударов рассекает щупальца и позволяет приблизиться к шее Гёкко.'},
{index:5,context:'Муичиро уничтожает множество призванных Гёкко рыб.'},
{index:2,context:'Круговое движение клинка отводит ядовитое облако после уничтожения рыб.'},
{index:6,context:'Смена темпа делает движения Муичиро неуловимыми и открывает путь к завершающему удару.'}
],sources:[['Хроника боя','https://kimetsu-no-yaiba.fandom.com/wiki/Muichiro_Tokito_vs_Gyokko'],['Кадры аниме и манги','https://kimetsu-no-yaiba.fandom.com/wiki/Muichiro_Tokito/Image_Gallery']]},
kokushibo:{name:'Кокушибо',rank:'Высшая луна · Один',glyph:'壱',portrait:'asset-4.webp',intro:'Бесконечная крепость. Муичиро противопоставляет Дыхание Тумана мечнику Высшей первой луны.',forms:[
{index:1,context:'Первая серия ударов Муичиро: Кокушибо уклоняется от атаки.'},
{index:4,context:'Муичиро продолжает атаку скоростной серией, но противник вновь уходит от ударов.'},
{index:6,context:'Активировав метку, Муичиро меняет темп. Кокушибо замечает необычную форму и уклоняется.'},
{index:3,tag:'АТАКА ПРЕРВАНА',context:'Муичиро начинает четвёртую форму, но Кокушибо перехватывает его клинок. Приём не доведён до конца.'}
],sources:[['Глава 165 — применённые формы','https://kimetsu-no-yaiba.fandom.com/wiki/Chapter_165']]},
hantengu:{name:'Хантенгу',rank:'Высшая луна · Четыре',glyph:'肆',portrait:'asset-2.png',intro:'Деревня кузнецов. Короткое столкновение Муичиро с Хантенгу перед разделением противника на воплощения эмоций.',forms:[
{index:3,context:'Муичиро атакует Хантенгу, появившегося в комнате. Тот прыгает к потолку и избегает решающего удара.'}
],sources:[['Глава 106 — начало столкновения','https://kimetsu-no-yaiba.fandom.com/wiki/Chapter_106'],['Хроника боя','https://kimetsu-no-yaiba.fandom.com/wiki/Demon_Slayers_vs_Hantengu']]}
};
const battleDialog=$('battle-dialog');let battleTrigger=null,previousOverflow='';
function openBattle(id,trigger){const battle=battles[id];if(!battle||battleDialog.open)return;battleTrigger=trigger;battleDialog.dataset.theme=id;$('battle-title').textContent=battle.name;$('battle-intro').textContent=battle.intro;$('battle-rank').textContent=battle.rank;document.querySelector('.battle-glyph').textContent=battle.glyph;$('battle-portrait').src='assets/'+battle.portrait;$('battle-portrait').alt=battle.name;$('battle-count').textContent=String(battle.forms.length).padStart(2,'0')+' / ПРИЁМЫ';$('battle-forms').replaceChildren();
battle.forms.forEach(item=>{const kata=katas[item.index];const li=document.createElement('li');li.className='battle-form';const picture=document.createElement('img');picture.src='assets/'+kata.image;picture.alt='Иллюстрация: '+kata.title;picture.loading='lazy';const copy=document.createElement('div');const meta=document.createElement('p');meta.className='battle-form-meta';meta.textContent='ФОРМА '+pad(item.index+1)+' / '+kata.kanji;if(item.tag){const badge=document.createElement('span');badge.textContent=item.tag;meta.append(badge)}const title=document.createElement('h4');title.textContent=kata.title;const context=document.createElement('p');context.className='battle-form-context';context.textContent=item.context;const link=document.createElement('button');link.type='button';link.className='battle-kata-link';link.textContent='Карточка приёма ↗';link.addEventListener('click',()=>{showKata(item.index);battleDialog.close();requestAnimationFrame(()=>{document.querySelector('#kats').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('kata-panel').focus({preventScroll:true})})});copy.append(meta,title,context,link);li.append(picture,copy);$('battle-forms').append(li)});
$('battle-source-links').replaceChildren();battle.sources.forEach(([label,url])=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label+' ↗';$('battle-source-links').append(a)});previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';battleDialog.showModal();battleDialog.scrollTop=0;document.querySelector('.battle-close').focus({preventScroll:true})}
document.querySelectorAll('[data-battle]').forEach(card=>{const id=card.dataset.battle;const button=document.createElement('button');button.type='button';button.className='battle-open';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','battle-dialog');button.setAttribute('aria-label','Открыть хронику боя: '+battles[id].name);const text=document.createElement('span');text.className='battle-card-hint';text.textContent='ХРОНИКА БОЯ ↗';button.append(text);card.append(button);button.addEventListener('click',()=>openBattle(id,button))});
document.querySelector('.battle-close').addEventListener('click',()=>battleDialog.close());battleDialog.addEventListener('click',event=>{if(event.target===battleDialog){const r=battleDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)battleDialog.close()}});battleDialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;if(battleTrigger)battleTrigger.focus({preventScroll:true})});

})();
