(function () {
  'use strict';

  var W = 1080, H = 1920;
  var OPT_TOP = [768, 862, 956, 1050];
  var OPT_LABEL = ['A', 'B', 'C', 'D'];
  var PRIORITY = ['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10'];

  var QUESTIONS = [
    { text: '梦开始的时候，你发现自己站在：', opts: ['一条很安静的空街上，路灯亮着','一个老房子的窗边，外面在下雨','一个没人的海边，天快亮了','一间昏暗的小酒吧门口，里面有人在放音乐'], map: ['S1','S3','S8','S5'] },
    { text: '你往前走，路边有一家还亮着灯的小店。你更想：', opts: ['走进去，但不想跟人说话','在门口站一会儿，看看里面','直接走过去，不停留','坐在店外面的台阶上，发会儿呆'], map: ['S5','S8','S1','S2'] },
    { text: '你听到远处有音乐传过来，声音不大。你会：', opts: ['顺着声音走过去看看','站在原地听一会儿','绕开它，往安静的地方走','不刻意理它，但也没躲开'], map: ['S7','S3','S2','S4'] },
    { text: '你走到一座天桥上，底下是零零星星的车流。你更想：', opts: ['趴在栏杆上看下面的车','靠着栏杆站着，什么都不做','在天桥上慢慢走过去','停下来，闭眼听一下周围的声音'], map: ['S4','S8','S9','S3'] },
    { text: '你路过一栋楼，里面有一扇窗户还亮着。你心里想的是：', opts: ['不知道住的是什么人','那个人应该也还没睡','里面可能正在发生什么事','没什么想法，就是看了一眼'], map: ['S10','S1','S7','S2'] },
    { text: '你有点累了，想找一个地方坐一会儿。你会选：', opts: ['路边的长椅','一家还没打烊的小酒馆角落','一个车站的候车亭','随便找个台阶坐下'], map: ['S6','S5','S4','S9'] },
    { text: '你坐在那里，周围很安静。你更希望：', opts: ['完全安静，什么都不想','有一点很远的、模糊的声音','有人在旁边但不说话','有轻微的、规律的声音（像钟或风）'], map: ['S2','S3','S7','S10'] },
    { text: '梦里出现了一个以前你很熟悉的地方，但很久没去过了。你会：', opts: ['停下来看一眼','走进去，看看变成什么样了','站在门口想一想，然后离开','当作没看见，继续往前走'], map: ['S10','S10','S3','S1'] },
    { text: '你在梦里遇到了一个人，但看不清他的脸。你更觉得：', opts: ['你认识这个人','你不认识，但想走近看看','你不想跟他说话','无所谓，反正是在梦里'], map: ['S10','S7','S9','S5'] },
    { text: '梦里的天色开始变了。你更希望是：', opts: ['天快亮了，灰蓝色的那种','刚入夜，路灯刚亮的那种','下雨前的阴沉','很深的夜晚，全黑的那种'], map: ['S6','S9','S3','S1'] },
    { text: '你走到一个路口，两边都能走。你会选择：', opts: ['往更亮的那边走','往更暗的那边走','往有声音的那边走','往更安静的那边走'], map: ['S2','S1','S7','S8'] },
    { text: '你感觉到梦快要醒了。你最后想做的事是：', opts: ['再看一眼你经过的地方','停下来，听最后一段声音','往一个还没去过的地方走','站在原地，什么也不做'], map: ['S10','S3','S4','S2'] },
    { text: '梦里有一段很长的路，两边没有什么东西。你走路的节奏更像：', opts: ['很慢，像在漂','不快不慢，像散步','有点快，像在赶什么','走走停停，不固定'], map: ['S8','S2','S4','S5'] },
    { text: '梦里的声音（如果有的话）更接近：', opts: ['远处传来的、听不清的','很近的、但很轻的','断断续续的、像信号不好','规律的、像呼吸或心跳'], map: ['S3','S10','S4','S6'] },
    { text: '梦结束的时候，你最后留下的感觉是：', opts: ['不想醒，想继续待着','醒来很舒服，像充了电','有点恍惚，一时分不清是不是还在梦里','心里留下一个画面，但说不出是什么'], map: ['S8','S2','S5','S10'] }
  ];

  var RESULTS = {
    S1:  { title: '蜗牛与欢迎光临是平行线',     video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/videos/1.mp4',  body: '你不需要去适应别人，相反，你更喜欢一种独立属于自己的节奏。白天属于别人，属于工作，是一种不得不做的事。只有夜晚，你可以什么都不做，什么都不用想。如果是月亮恐怕不会说出口的话，音乐会替你倾诉。你就在月光下慢慢行走，像一只蜗牛无声地扩展，捕捉着微弱的光。' },
    S2:  { title: '蝉鸣 夏天 和我的尸体',       video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/videos/2.mp4',  body: '你有一种慢慢沉淀的天赋，不是消极，是不被周围的喧嚣所吞噬。夏日午后的阳光有些刺眼——阳台就是。假如不关窗户，风吹得有些慢。虽然光线很刺眼，你不需要太阳为你欢呼，也不敢太嘈杂的人。你不喜欢让嘈杂打破你现实的平衡。你在蓝色的清晨里可以静静地做着，什么都不用想，像一杯放了一会儿的冰水，不冰了，但还是甜。' },
    S3:  { title: '雨中的交织世界',             video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/videos/3.mp4',  body: '雨对你来说不是烦恼，是一种邀请。它邀请你停下来，坐下来，透过玻璃从外面看向远处。你喜欢雨声，因为它不给人任何开口的机会，它只是在那里，不多不少，你会看着窗户上的雨水流下来，成了流动的。这本是一段很久以前的事，你不想把它打破，只想让时间停留得再久一点。你需要一种雨声一样的音乐——品味地享受，不繁杂，不热闹，只是陪着你。' },
    S4:  { title: '愈行愈远，往复挣扎',         video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/videos/4.mp4',  body: '你会喜欢在夜中思考，或者鱼，这总能唤起属于你的回忆。耳边有波浪声，还有打不断的耳边风。你相信哪怕是白天里微弱的小电台在播放，你不会一个人陌生。若平淡享受，你更喜欢回到那种有点说不清不明的熟悉感——有一点温度，还要保持清醒。色调不显太亮，不要打扰哪怕只有窗外的余光。你是一个在晚上找光的人，不愿走远，刚好在此。' },
    S5:  { title: '失焦人格',                   video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/videos/5.mp4',  body: '你不拒人，也不属于人群。你总是在热闹的地方找一个安静的角落，看着别人，但不参与聊天。你口中的坦率不是为了辩解，不是为了社交，是为了每一个在人群中得不到释放的瞬间。你需要一种有力量感的音乐，它不会咆哮，也不会让你感到沉重。你更喜欢一个人待在家里，做一些属于自己的事，但又不会被周围的人找到。' },
    S6:  { title: '留白',                       video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/videos/6.mp4',  body: '你不回避那些似曾相识的陌生人。你更喜欢跟着一些旋律默念一会儿，就跑了慢慢开。天亮前的光是灰蓝色的——不刺眼，才正式。坐在车窗内可以再睡一会儿。你不必太在意声音到底是从哪里传来的。你需要的是节奏强烈的，像心跳一样贯穿，足够清晰稳定。让你觉得新的一天还是与你有关。' },
    S7:  { title: '人群不过是流动的墙',         video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/videos/7.mp4',  body: '你会聚会，但不一定在繁华。你不入场但愿意走近。哪怕坐在一个角落里人满天，你不讨厌热闹，但你不需要逼近那束光。你更喜欢的是那种在人群中慢慢找回自己的节奏的音乐——和别人都不一样的节拍。只要有属于自己的旋律。你是一个观察者，不是参与者。你更期待站在远处的观察，不急着对谁气馁，只是想让自己舒服。' },
    S8:  { title: '风比声音大，海比记忆远',     video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/videos/8.mp4',  body: '你会喜欢那些宏大、不显眼的荒山或旷野。你会去漫步地方，直到想到什么都没有。一板一眼地抬头望旷，海边是在会去的地方。不是为了戏水，是为了独在风里。让脑子里的杂念被吹散。你需要一种像风一样的音乐——不断重复，不需复杂，只是从低处上涨。你是一个需要空间的人，不只是物理距离，还有心里的边界。' },
    S9:  { title: '并不完全城市人格',           video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/videos/9.mp4',  body: '你喜欢城市，但不是白天的城市。白天的城市太忙了，太吵了。晚上的城市才是你的城市——霓虹灯、阴影、偶尔经过的车。透过模糊的灯光，在霓虹窗下，不去看那些。不急着去任何地方。有一段跳跃的旋律让你内心变得轻盈。你不是冷漠，你只是不愿受约束。沉浸在自己的思维，哪怕是去火星，也是最好的安排。' },
    S10: { title: '不再昨日，不在昨日',         video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/videos/10.mp4', body: '你不是那种会把悲伤挂在嘴边的人。你会像待上三四天——旧照片、旧曲、旧故里。不层叠不累，是你安静地盯着哪怕一分钟，你便会跳出来，看一看，等一会儿，你不想被谁拉走，你也不介意在某个地方停下，就这样给自己待一会儿。你需要的是那种不透明的音乐——让你想起一些事，但不逼你承认。你是一个温柔但捕捉不到的人。' }
  };

  var canvas = document.getElementById('canvas');
  var screens = {
    home: document.getElementById('home'),
    quiz: document.getElementById('quiz'),
    transition: document.getElementById('transition'),
    result: document.getElementById('result')
  };

  var cur = 0;
  var picks = new Array(15).fill(null);
  var transitioning = false;

  function forceReflow(el) {
    void el.offsetWidth;
  }

  function hideEl(el) {
    el.className = '';
    el.style.opacity = '0';
    forceReflow(el);
  }

  function fadeInEl(el) {
    el.className = 'anim-in';
    el.style.opacity = '';
  }

  function fadeOutEl(el) {
    return new Promise(function (resolve) {
      el.className = 'anim-out';
      setTimeout(resolve, 1200);
    });
  }

  function loadImage(el, src) {
    return new Promise(function (resolve) {
      hideEl(el);
      el.onload = function () {
        el.onload = null;
        el.onerror = null;
        resolve();
      };
      el.onerror = function () {
        el.onload = null;
        el.onerror = null;
        resolve();
      };
      el.src = src;
    });
  }

  function fitCanvas() {
    var vv = window.visualViewport;
    var vw = vv ? vv.width : window.innerWidth;
    var vh = vv ? vv.height : window.innerHeight;
    var s = Math.max(vw / W, vh / H);
    canvas.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
  }

  function go(name) {
    Object.keys(screens).forEach(function (k) {
      screens[k].classList.toggle('is-active', k === name);
    });
  }

  function delay(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  function buildDots() {
    var box = document.getElementById('progress-dots');
    box.innerHTML = '';
    for (var i = 0; i < 15; i++) {
      var d = document.createElement('span');
      d.className = 'dot' + (i === cur ? ' is-current' : '');
      box.appendChild(d);
    }
  }

  function renderQuiz() {
    var q = QUESTIONS[cur];
    document.getElementById('quiz-stem').textContent = q.text;

    var wrap = document.getElementById('quiz-opts');
    wrap.innerHTML = '';
    q.opts.forEach(function (txt, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt-btn' + (picks[cur] === i ? ' is-picked' : '');
      btn.style.top = OPT_TOP[i] + 'px';
      btn.textContent = OPT_LABEL[i] + '. ' + txt;
      btn.addEventListener('click', function () {
        picks[cur] = i;
        renderQuiz();
      });
      wrap.appendChild(btn);
    });

    document.getElementById('nav-back').disabled = cur === 0;
    buildDots();
  }

  function score() {
    var pts = {};
    PRIORITY.forEach(function (id) { pts[id] = 0; });
    QUESTIONS.forEach(function (q, qi) {
      if (picks[qi] === null) return;
      pts[q.map[picks[qi]]] += 3;
    });
    var best = PRIORITY[0], top = -1;
    PRIORITY.forEach(function (id) {
      if (pts[id] > top) { top = pts[id]; best = id; }
    });
    return RESULTS[best];
  }

  async function playTransition() {
    if (transitioning) return;
    transitioning = true;

    go('transition');
    var img = document.getElementById('phone-content');
    var cap = document.getElementById('phone-caption');

    hideEl(img);
    img.removeAttribute('src');
    hideEl(cap);

    await loadImage(img, 'photos/编号6.png');
    fadeInEl(img);
    fadeInEl(cap);

    await delay(10000);

    await fadeOutEl(img);
    await fadeOutEl(cap);

    hideEl(img);
    img.removeAttribute('src');
    hideEl(cap);

    await loadImage(img, 'photos/编号7.png');
    fadeInEl(img);

    await delay(5000);

    await fadeOutEl(img);

    transitioning = false;
    openResult(score());
  }

  function openResult(data) {
    go('result');

    var video = document.getElementById('result-video');
    var soundBtn = document.getElementById('btn-sound');

    document.getElementById('result-scene').textContent = data.title;
    document.getElementById('result-body').textContent = data.body;

    document.getElementById('result-panel').classList.remove('is-expanded');

    video.src = data.video;
    video.muted = true;
    video.load();
    soundBtn.hidden = true;

    video.play().then(function () {
      video.muted = false;
      return video.play();
    }).catch(function () {
      soundBtn.hidden = false;
    });

    soundBtn.onclick = function () {
      video.muted = false;
      video.play();
      soundBtn.hidden = true;
    };
  }

  function revealDetail() {
    document.getElementById('result-panel').classList.add('is-expanded');
  }

  function resetAll() {
    var video = document.getElementById('result-video');
    video.pause();
    video.removeAttribute('src');
    cur = 0;
    picks.fill(null);
    transitioning = false;
    var img = document.getElementById('phone-content');
    var cap = document.getElementById('phone-caption');
    hideEl(img);
    img.removeAttribute('src');
    hideEl(cap);
    document.getElementById('result-panel').classList.remove('is-expanded');
    go('home');
  }

  /* ── 事件绑定 ── */
  document.getElementById('enter-btn').addEventListener('click', function () {
    cur = 0;
    picks.fill(null);
    go('quiz');
    renderQuiz();
  });

  document.getElementById('nav-back').addEventListener('click', function () {
    if (cur > 0) { cur--; renderQuiz(); }
  });

  document.getElementById('nav-forward').addEventListener('click', function () {
    if (picks[cur] === null) return;
    if (cur < 14) { cur++; renderQuiz(); }
    else { playTransition(); }
  });

  document.getElementById('pull-trigger').addEventListener('click', revealDetail);

  var panel = document.getElementById('result-panel');
  var touchY = 0;
  panel.addEventListener('touchstart', function (e) {
    touchY = e.touches[0].clientY;
  }, { passive: true });
  panel.addEventListener('touchmove', function (e) {
    if (touchY - e.touches[0].clientY > 50) revealDetail();
  }, { passive: true });

  document.getElementById('btn-home').addEventListener('click', resetAll);

  buildDots();
  fitCanvas();
  window.addEventListener('resize', fitCanvas);
  window.addEventListener('orientationchange', fitCanvas);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', fitCanvas);
    window.visualViewport.addEventListener('scroll', fitCanvas);
  }
})();
