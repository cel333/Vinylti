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
    S1:  { title: '躺平与勤奋同样是举行。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/1.mp4',  body: '你坐上了门，长舒一口气。你身处十分明亮并不宽阔的走廊。电梯缓缓的如钟摆一般的来回。这里没有别的人，没有多余的声音，你还是觉得受累。你伸手并不能触及。即使虽然在此时时刻你属于你，但你属于这受累的自我。你把头深深的低进了这刚凉的冰水，连同你这无须任何解释的疲累和责任。你出了电梯已是深夜的黎明，你自此才是真正的你，可以不看任何事，不理任何事。你摘下了眼镜，高亮映射在脚下的整个环境离。你和这声音一起在夜晚升起。也和它静静地沉寂。' },
    S2:  { title: '夏天，蝉鸣，腐烂的尸体。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/2.mp4',  body: '宁静，也足够喧嚣。蝉鸣声伴随着夏夜，深入骨髓。你可以俯视山下密不透风的柏油路。你试图寻找那些被碾过的痕迹。它们在闪烁，在跳跃。你甚至会觉得那是你的倒影。在明明与暗暗中，你闻到了腐烂的味道。这又是多么奢靡，多么灿烂。那是被腐烂的，在不断滋养。你坐了下来，喝了一口冰咖啡。你看着这城市，渐渐停止挣扎。是的，慢慢停止。你坐上了电梯，按下了S2，回到了这喧闹的尸体。' },
    S3:  { title: '窗外有雨，室内没伞。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/3.mp4',  body: '一阵雷鸣惊醒了你。手机，瞬间之光又暗淡了下去。你在黑暗中，拿着手机，看着窗外那些在雷电中停下的，你试图抓住点什么。那是属于你的未来吗。风吹进来带这凉意，雨点拍打在窗上，湿了身体。你试着拿了把伞，但是伞并不伞。在那儿备了很久的伞，由于你并不常使用，在伞面出现了一些自愈的裂纹。共有五个。你撑起这开花的伞，在走廊。' },
    S4:  { title: '动物园里，生老病死。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/4.mp4',  body: '你喜欢在动物园中思考。或者说，这是你能够感到唯一宁静的地方。你并不孤独。你曾见过它们如何地活着。壮着。甚至感到那是希望。这又后是一条漫长的，石板铺成的。你觉得，今天在这里注定也该发生。你感到血液以及力量。你喜欢享受属于自己的力量。你站在栏杆外与那被关着的，那是你从前的朋友。这反而让你感到不适。你们对目父汇。随后，你又离开。你提高了耳机的音量，S4下，即日出发。' },
    S5:  { title: '失意人员。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/5.mp4',  body: '推开广场那扇沉重的门。你看到了各种各样的面孔。许多的人和一些被遗漏掉的面孔。但是，你不属于人群。但你依然这般依其光亮。你成为人群中的一员。似乎，就是。你如今被这雨水淋出。你看着这人群。极其安地。释放。悬浮。如同水滴。随波逐流。你觉得，很有意思。并一如既往地于电梯离开。带着这最近那些被遗漏掉的那些水滴。你觉得，该离开了。' },
    S6:  { title: '昆虫。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/6.mp4',  body: '这并不是他日所预定好的。你，也许曾想过。你仍然在寻找那份太阳。而只剩下了楼层里。这冗长的也那一片绿。一些并不相关的植物被你放在了此地。你感到屏幕里充满了静电。你觉得，并未，未曾一如既往。至少这个时刻。今天这是一片空白。' },
    S7:  { title: '人们在这里充满欢愉。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/7.mp4',  body: '就在这种时刻里，你看到了，你所看到的也许是某种确切。这也许是某种属于，某种时刻的。就在这里，你看到了一个。那是人群，在这些视频里的人群。即便这些人并不，并不在这里。当你确认这些视频，你要找寻属于你自己的东西。这些环节与这些视频里的，这些他人之间的。这些反馈凝固在深夜。它们在日及它，随之，而又消去。' },
    S8:  { title: '你并不了解你正处于什么。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/8.mp4',  body: '你观察着这些视频中的那些。你确认这些这个是此时在此，此时在此。你确认这些。此时在此。你确认这些。此时在此。你确认这些。这是一种属于你的快乐。并推及到这些视频里。你确认这些。确认了这些。当你确认这些了很久，你不再像上一个你那样。你确认了一些。多少多少。你确认了那些。不看任何，不看任何。你的手是一张。' },
    S9:  { title: '并不流动城市人流。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/9.mp4',  body: '你喜欢城市。并不流动的人流。白天的城市太忙了。太吵了。你更愿意在夜晚的城市——霓虹灯、路灯、偶尔经过的车、远处大楼的灯光。你走在街上。不看着风景。不看着那些忙碌的人。一台台电梯静静地伫立在城市的各个角落。你不反感，你只是不可避免地被霓虹地而己活着。在午夜里走着。那是你最好的时刻。' },
    S10: { title: '不再昨日，不在昨日。', video: 'https://pub-6483ae2fe99743c7bd54e3cb3f67fcf6.r2.dev/shipin/10.mp4', body: '"怎么变得这么黑了"你在用手摸索着寻找那盏离你只有几步的灯。你试图回忆了一下圣诞。但又不清晰了。"算了，算再也没用……"你把那些没熄灭的烟杆靠在一旁的朋友那里。你有了更好的爱人。与他聊天。在回忆里。过去只是过去。你不必过于过去。也不会过于过去。现在。便是那天黎明最为清澈及之事的时刻。' }
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
