(function () {
  'use strict';

  var W = 1080, H = 1920;
  var OPT_TOP = [768, 888, 1008, 1128];
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
    S1:  { title: '蜗牛与欢迎光临是平行线。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/1.mp4',  body: '你关上了门，长舒一口气。你身处于光线并不充足的房间，电视微弱的光呼吸一般的亮着。这里没有另外的人，没有多余的声音，但这正是你需要的。你似乎并不担心独处，你知道现在你的时间只属于你，且你需要这短暂的惬意。你把买来的饮料放到了冰箱里冰镇，连同你白天的各种各样的使命和责任。取出了昨晚已经冰好的那瓶，你知道这才是真正的你，可以不做任何事，不想任何事。你按下了播放键，音乐响起的瞬间将整个房间填满，你知道音乐让你的夜晚开始，也在它停下时结束。' },
    S2:  { title: '夏天，蝉鸣，和我的尸体。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/2.mp4',  body: '你是一名出色的演员，就扮演尸体的天赋来说，无人能及。前提是你的身下要有干净柔软的床垫，这也是你没能进军影视行业的主要原因吧。你这样想着。外面的蝉配合着高温歌颂生命的热烈，你嫌弃它与你的信条背道而驰。"节能即为正义"风扇转得慢，但你觉得刚好，阳光晒到枕头，你不觉得滚烫。你拿起手机，轻按了一下播放键。你的音乐也一样没那么用力，显然它很懂你。你闭上了眼睛，翻了个身，继续COS着你的尸体。' },
    S3:  { title: '窗外有雨，室内安全。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/3.mp4',  body: '手机里的白噪音响了一整夜。意料之外的是窗外也在下雨，你拉开窗帘，有些窃喜。撞向玻璃的雨点在邀请你出门作伴。你没有应它们，只是播放了一首雨般温柔的音乐，呆呆得看它们点变成线，直到外面的窗沿，成了积水。你盯着看了很久，好像不大不小的一滩水里装了太多事情。此时此刻你不希望雨停，你希望它可以一直一直陪着你，陪你几个世纪。前提是你在房间里，雨在外面。' },
    S4:  { title: '愈行愈远，往复挣扎', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/4.mp4',  body: '你喜欢在移动中思考，或者说，这是难得的只属于你的时间。车不断往前，你看见"它们"在后面追着，赶着，却逐渐被黑夜吞没。你又看见一盏盏路灯，在慢慢退后。你想，今天在这座城市的烦恼，也没那么难以承受。你喜欢掌握你自己的方向盘，你喜欢主导这条路的去向，这是你人生的路，也是这座城市的主路，你们每日交汇，相遇，而又离去。你调高了音乐的音量，也许，明日往复。' },
    S5:  { title: '失焦人格', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/5.mp4',  body: '推开了熟悉的酒吧的门，你看到了狭窄的酒吧里，许多的人和一眼望到头的房间格局。你不讨厌人群，但你始终没办法若无其事的成为人群中的一员。坐下，点单，听到今晚的爵士演出，你想观察人类。觥筹交错，相谈甚欢，闷闷不乐，浓情蜜意，你觉得，很有意思，并一饮而尽你手中的威士忌。看着空酒杯里慢慢融化的圆形冰球，你知道，该离开了。' },
    S6:  { title: '留白', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/6.mp4',  body: '或许不是每日都有如此闲暇，你伸着懒腰，你的猫在身边呼呼大睡，而后揉了揉眼睛，望见窗外的那一片绿，一些阳光顺着缝隙莅临你的小小床边。猫被晒得用手遮住了眼睛，你轻笑。起床！来做一杯咖啡吧，至少这个瞬间，今天还是一片空白的。' },
    S7:  { title: '人群不过是流动的墙', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/7.mp4',  body: '他们的双脚时而腾空，时而落下。你感兴趣的也许不是他们的高度，而是盯着他们的鞋子，期待谁会踩到谁的脚，谁又假装不痛。你在人群中走来走去，亦或者是坐在一边看别人聊天，你知道热闹并不惹人生厌。并不是众人皆醉，你也没那么清醒，只是你的节奏在你自己这里，而非跳动的人群。你的节拍也许并不在人群落地的那一瞬间，也许有些音乐只有你了解。错开一拍也很酷。顺便一提，你的脚是安全的，不是吗。' },
    S8:  { title: '我们都难以在海边留下些什么', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/8.mp4',  body: '你的脚印在这里撑不过两次海浪的轻抚。即便你难以在这个海边留下些什么，你依然热爱这里。在这里你才明白，你和云之间，你和海的尽头之间。没有高楼，没有汽笛，没有机械，没有...只有潮湿的水蒸气，只有温柔划过你脸颊的风，这使你感到安心。你走了很久，耳机里的音乐也播放了很久，你不记得上一首歌是哪一首歌，它的名字是什么。这不重要，音乐在经过你的鼓膜，不黏着你，不留痕迹。如你的脚印一般。' },
    S9:  { title: '并不完全城市人格', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/9.mp4',  body: '你喜欢城市，但不是白天的城市。白天的城市太忙了，太吵了。晚上的城市才是你的城市——霓虹灯、阴影、偶尔经过的车、远处大楼的灯光。你走在街上，不急着回家，不急着去任何地方。一首安静的歌能够让你在心里独自起舞。你不是冷漠，你只是不需要用热情来证明自己活着。你在夜里走着，就是最好的证明。' },
    S10: { title: '不再昨日，不在昨日', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/10.mp4', body: '"怎么变得这么厚了"你在用手指摩挲这些泛黄的信件和小纸条，你觉得记忆一下子涌回，但又不清晰了。"算了，留着也没用......"于是你把这些泛黄的信件丢在一旁的垃圾桶，转向了身旁的爱人，与他聊天。在你心里，过去只是过去，我不沉溺于过去，也不眷恋过去，现在，便是我去做所有力所能及之事的最好时机。' }
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
