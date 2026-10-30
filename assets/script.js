let currentQuestion = 0;
let O = 0, C = 0, E = 0, A = 0, N = 0;
let route = null;
let answerHistory = {};

const HIGH = 4;
const LOW = -4;

const questions = [
  {
    id: "Q1", stage: "乳児期（0〜3歳）", title: "01 / 09",
    story: "あなたは生まれた。\nこの現代に。\n\nまだ、生まれて3年も経っていない。目の前には、いくつかのおもちゃが置かれている。音を鳴らすもの、柔らかなもの、不思議な動きをするもの。専門的には、あなたを見守る母親がいる。",
    prompt: "あなたが最初に手を伸ばしたのは、どれだろう。",
    choices: [
      { text: "ガラガラ", scores: {O:0,C:0,E:2,A:1,N:-1} },
      { text: "クマのぬいぐるみ", scores: {O:2,C:1,E:-1,A:1,N:-1} },
      { text: "オルゴール", scores: {O:2,C:1,E:0,A:0,N:0} },
      { text: "赤ちゃんの頃使用していたブランケット", scores: {O:-1,C:0,E:-1,A:2,N:1} }
    ]
  },
  {
    id: "Q2", stage: "幼児期", title: "02 / 09",
    story: "それから、日々が過ぎていく。\n\n気がつけば、あなたは小学生になっていた。\n\n今日は友達と公園に遊びに来た。砂場では一人で遊んでいる子がいて、広場ではサッカーをする声が聞こえる。ブランコは空いていて、草むらには小さな虫がいる。",
    prompt: "あなたは、何をして遊ぶだろう。",
    choices: [
      { text: "一人で砂場にいる子に声をかける。せっかく同じ場所にいるのだから、一緒に遊べたら楽しそうだ。", scores: {O:1,C:0,E:2,A:2,N:-1} },
      { text: "一緒に来た友達とサッカーを始める。みんなで体を動かすのは楽しい。", scores: {O:0,C:0,E:2,A:1,N:-1} },
      { text: "空いているブランコに向かう。自分の好きなように遊ぶ時間も大切だ。", scores: {O:0,C:0,E:-1,A:0,N:-1} },
      { text: "草むらの虫を観察する。どんな生き物がいるのか、もっと知りたい。", scores: {O:2,C:1,E:-1,A:0,N:0} }
    ]
  },
  {
    id: "Q3", stage: "学童期", title: "03 / 09",
    story: "あなたは小学校高学年になった。\n\n周りでは、中学受験の話をする人が増えてきた。地元の中学校へ進むのか、それとも受験をして別の学校を目指すのか。そろそろ、自分の進路を考えなければならない。",
    prompt: "あなたは、どの道を選ぶだろう。",
    choices: [
      { text: "地元の中学校へ進む。今の友人たちと過ごす時間を大切にしたい。きっと、これからも一緒にいられる友人がいる。", scores: {O:0,C:0,E:1,A:2,N:-1} },
      { text: "無理なく合格を目指せる学校を受験する。少し環境を変えてみたい。でも、今の生活や友人との時間も大切にしたい。", scores: {O:1,C:1,E:0,A:0,N:0} },
      { text: "憧れの学校を受験する。「あの学校に行けたらすごい」と思う。遊ぶ時間が減っても、今まで以上に努力してみたい。", scores: {O:2,C:2,E:0,A:-1,N:1} },
      { text: "今の実力では難しい学校を受験する。簡単には届かない。それでも、限界を決めつけたくない。すべてを懸けて挑戦してみたい。", scores: {O:2,C:2,E:1,A:-1,N:2} }
    ]
  },
  {
    id: "Q4", stage: "青年期①", title: "04 / 09",
    story: "やがて、中学受験が終わる。\n\nあなたは小学校を卒業し、中学生になった。新しい環境にも慣れ、刺激的なことも、何気ないこともある日々を過ごしている。\n\n今日は席替えの日らしい。友人が「好きな席を選べるなら、どこがいい？」と聞いてきた。",
    prompt: "あなたは、どの席を選ぶだろう。",
    choices: [
      { text: "教室の真ん中", scores: {O:0,C:0,E:2,A:2,N:-1} },
      { text: "教卓の真ん前", scores: {O:0,C:2,E:0,A:1,N:-1} },
      { text: "窓際の後ろらへん", scores: {O:1,C:0,E:-1,A:0,N:0} },
      { text: "とにかく扉の近く", scores: {O:0,C:-1,E:2,A:0,N:0} }
    ]
  },
  {
    id: "Q5", stage: "青年期②", title: "05 / 09",
    story: "中学校を卒業し、高校生になった。\n\n今は高校2年生。ある日、部活の後輩から突然告白された。相手のことは、まだよく知らない。\n\n突然の出来事に、少し戸惑う。",
    prompt: "あなたは、どう答えるだろう。",
    choices: [
      { text: "告白を受けてみる。嫌だとは思わないし、むしろ嬉しい。付き合ってみれば、今まで知らなかった一面も見えてくるかもしれない。", scores: {O:1,C:0,E:1,A:2,N:-1} },
      { text: "まずは友達から始める。嫌ではないけれど、まだ気持ちが分からない。急いで答えを出さず、少しずつ相手を知っていきたい。", scores: {O:1,C:1,E:0,A:2,N:0} },
      { text: "告白を断る。相手の気持ちはありがたい。でも、よく知らないまま恋人になるのは違うと思う。", scores: {O:0,C:1,E:-1,A:1,N:0} },
      { text: "はっきりと断り、距離を置く。恋愛関係になることは考えられない。曖昧な態度を取らず、これ以上関わらないようにしたい。", scores: {O:-1,C:1,E:-2,A:-1,N:1} }
    ]
  },
  {
    id: "Q6", stage: "青年期③", title: "06 / 09",
    story: "高校生活を終え、受験期を乗り越えた。\n\nやがて、あなたは大学生になった。\n\n大学の夏休みが始まった。授業もしばらくなく、予定を入れなければ、かなり自由に時間を使える。せっかくの長期休暇だが、特にやらなければならないことはない。",
    prompt: "さて、この時間をどう使おう。",
    choices: [
      { text: "新しいことに挑戦する。せっかく時間があるのだから、普段できないことをしてみたい。多少の失敗も、きっといい経験になる。", scores: {O:2,C:1,E:1,A:0,N:0} },
      { text: "趣味に時間を使う。前から好きだったことを、思う存分楽しみたい。誰にも急かされず、好きなことに没頭できる時間は貴重だ。", scores: {O:1,C:1,E:-1,A:0,N:-1} },
      { text: "友人と遊ぶ予定を立てる。旅行や遊びに誘ってみよう。一人で過ごすよりも、誰かと一緒に楽しい思い出を作りたい。", scores: {O:0,C:0,E:2,A:2,N:-1} },
      { text: "予定を決めずに過ごす。休みなのだから、無理に予定を詰めなくてもいい。その日の気分に任せて、自由に過ごしたい。", scores: {O:1,C:-1,E:-1,A:0,N:-1} }
    ]
  },
  {
    id: "Q7A", route: "plus", stage: "成人初期 — ＋ルート", title: "07 / 09",
    story: "時が進み、あなたは成人式を終えた。\n\n久しぶりに学生時代の友人と会うことになった。話を聞くと、友人は結婚していて、もうすぐ子どもも生まれるらしい。\n\n友人の話を聞きながら、あなたは自分のこれからについて考える。\n\n結婚して、子どもを持つこと。",
    prompt: "あなたは、どうしたいだろう。",
    choices: [
      { text: "自分も結婚して子供産みたい", scores: {O:0,C:1,E:1,A:2,N:-1} },
      { text: "相手に任せる", scores: {O:0,C:1,E:0,A:2,N:0} },
      { text: "全然いらない", scores: {O:1,C:0,E:-1,A:0,N:0} },
      { text: "今の自分は関係ない", scores: {O:1,C:-1,E:0,A:0,N:0} }
    ]
  },
  {
    id: "Q8A", route: "plus", stage: "壮年期 — ＋ルート", title: "08 / 09",
    story: "着実に日々が過ぎていく。\n\nあなたは50代になった。職場では、若い人たちを見守る立場になっている。\n\nある日、昔の自分によく似た若者に出会った。何かに困っているようだが、本人から相談されたわけではない。",
    prompt: "その姿を見て、あなたはどうするだろう。",
    choices: [
      { text: "こちらから手を差し伸べる。困っているなら、できることをしてあげたい。自分も、誰かに助けられてきたのだから。", scores: {O:0,C:1,E:1,A:2,N:-1} },
      { text: "さりげなく声をかけ、話を聞く。何に困っているのか、まずは知りたい。必要なら、一緒に考えればいい。", scores: {O:1,C:1,E:0,A:2,N:0} },
      { text: "求められるまでは見守る。自分で乗り越えることも、その人の成長につながるはずだ。必要なときには、きっと頼ってくれる。", scores: {O:0,C:1,E:-1,A:0,N:0} },
      { text: "自分の仕事に集中する。自分には自分の役割がある。まずは、自分が果たすべきことに向き合おう。", scores: {O:0,C:2,E:-1,A:-1,N:0} }
    ]
  },
  {
    id: "Q9A", route: "plus", stage: "老年期 — ＋ルート", title: "09 / 09",
    story: "あなたは65歳になり、定年退職した。\n\n仕事をしていた頃よりも、自由に使える時間が増えた。これまで忙しくてできなかったことにも、挑戦できるかもしれない。",
    prompt: "これからの時間を、あなたはどう過ごすだろう。",
    choices: [
      { text: "以前から興味があった趣味を始める。いつかやろうと思っていたことがある。今こそ、その一歩を踏み出してみたい。", scores: {O:2,C:1,E:0,A:0,N:0} },
      { text: "地域の活動やボランティアに参加する。自分にできることが、まだあるはずだ。誰かの役に立ちながら、新しいつながりも作っていきたい。", scores: {O:1,C:1,E:1,A:2,N:-1} },
      { text: "気ままに出かけ、自由に過ごす。もう、時間に追われる必要はない。その日の気分に任せて、行きたい場所へ行ってみよう。", scores: {O:1,C:-1,E:0,A:0,N:-1} },
      { text: "家族や友人と過ごす時間を増やす。これまで忙しくて、ゆっくり過ごせなかった人たちがいる。これからは、一緒に過ごす時間を大切にしたい。", scores: {O:0,C:1,E:1,A:2,N:-1} }
    ]
  },
  {
    id: "Q7B", route: "minus", stage: "成人初期 — −ルート", title: "07 / 09",
    story: "時が進み、あなたは成人式を終えた。\n\n久しぶりに学生時代の友人と会うことになった。友人は今の仕事に不満があるらしい。話を聞いているうちに、自分にとって仕事とは何なのか、ふと考える。",
    prompt: "あなたは、仕事に何を求めるだろう。",
    choices: [
      { text: "安定を求める。毎日の暮らしを安心して続けていきたい。先の見通しが立つことは、自分にとって大切だ。", scores: {O:0,C:2,E:0,A:0,N:-1} },
      { text: "やりがいを求める。せっかく働くのなら、意味のある仕事がしたい。自分が納得できることに時間を使いたい。", scores: {O:2,C:1,E:0,A:0,N:0} },
      { text: "収入を求める。お金があれば、できることも選べる人生も広がる。自分の望む暮らしを実現するために、収入を大切にしたい。", scores: {O:0,C:1,E:0,A:0,N:0} },
      { text: "自分の能力を磨けることを求める。今の自分に満足せず、成長していきたい。身につけた力は、きっと将来の自分を支えてくれる。", scores: {O:2,C:2,E:0,A:0,N:0} }
    ]
  },
  {
    id: "Q8B", route: "minus", stage: "壮年期 — −ルート", title: "08 / 09",
    story: "着実に日々が過ぎていく。\n\nあなたは50代になった。ある日、昔の友人と久しぶりに会った。友人は新しいことを始め、以前とは違う生活を送っているらしい。\n\nそれに比べて、自分の生活は、あの頃から大きく変わっていない。",
    prompt: "友人の話を聞きながら、あなたは何を思うだろう。",
    choices: [
      { text: "焦りを覚える。自分はこのままでいいのだろうか。気づかないうちに、大切な機会を逃してきたのかもしれない。", scores: {O:0,C:0,E:0,A:0,N:2} },
      { text: "自分も、やりたかったことを始める。まだ遅くはないはずだ。いつかと思っていたことに、今から挑戦してみよう。", scores: {O:2,C:1,E:0,A:0,N:-1} },
      { text: "今の生活に満足する。人と比べれば、違うところはいくらでもある。それでも、自分には自分の暮らしがある。", scores: {O:0,C:1,E:0,A:1,N:-1} },
      { text: "これまでの人生を振り返る。変わらなかったことにも、意味があったのかもしれない。自分が歩いてきた道を、一度ゆっくり見つめてみよう。", scores: {O:1,C:1,E:-1,A:0,N:0} }
    ]
  },
  {
    id: "Q9B", route: "minus", stage: "老年期 — −ルート", title: "09 / 09",
    story: "あなたは歳を重ね、定年退職した。\n\n荷物の整理を兼ねて部屋を掃除していると、古いアルバムが出てきた。写真の中には、若い頃の自分がいる。\n\n懐かしい思い出がよみがえる。その一方で、ふと考えてしまう。\n\nもし、あのとき別の道を選んでいたらし。",
    prompt: "あなたは、その思いにどのように向き合うだろう。",
    choices: [
      { text: "当時の思い出を振り返る。あの頃には、あの頃の自分がいた。懐かしい日々を、もう少し思い返してみよう。", scores: {O:1,C:0,E:0,A:0,N:0} },
      { text: "歩んできた人生で得たものを考える。違う道もあったかもしれない。それでも、この人生で出会えた人や得られたものがある。", scores: {O:0,C:1,E:0,A:1,N:-1} },
      { text: "過去の選択を後悔し続ける。あのとき、別の道を選んでいたら。考えても答えは出ない。それでも、どうしても考えずにはいられない。", scores: {O:-1,C:0,E:0,A:-1,N:2} },
      { text: "これから何をするか考える。過去は変えられない。ならば、残された時間で何ができるのかを考えてみよう。", scores: {O:1,C:2,E:0,A:0,N:-1} }
    ]
  }
];

const endings = [
  {
    id: "end1",
    name: "人脈の人",
    conditions: { C: "high", E: "high", A: "high" },
    funeralIntro: [
      "祭壇には白い花々が飾られ、中央にはあなたの遺影が置かれている。",
      "そこに写るあなたは、穏やかな笑顔だ。",
      "会場は、黒い喪服に身を包んだ人々が集まっている。\n親族、学生時代の友人、職場の同僚、あなたの身近にいた人々。\n普段なら、交わることのない人々があなたのために、今日ここにいる。"
    ],
    summaryLargeLines: [
      "**あなたの人生はありふれたものだったかもしれない**",
      "**歴史に名前は残らないかもしれない。**",
      "それでも、あなたの周りには誰かがいた。",
      "人と話し、笑い、時間を過ごし、人と人を繋いできた。",
      "その積み重ねで今日が成り立っている。",
      "あなたはもう、誰かを遊びに誘うことも、新しい誰かと知り合うこともできない。",
      "それでも、あなたが過ごした時間は出会った人々の記憶の中に残っている。"
    ],
    summaryTitle: "選択は永遠ではない、出会いも繋がりもいつかは終わりを迎える。あなたは自身の選択から、",
    summaryDesc: "としてこの選択の幕を引く。\n\nあなたは多くの人と関わり、多くの人に惜しまれながらこの世を去った。",
    bigFiveAnalysis: "社交性や刺激を求める傾向がある。また、他者への協調的態度がある選択を選びやすいだろう",
    sins: "「強欲」「傲慢」",
    deathGodComment: "『あなた』が他者との関係を築くのは、誰からも忘れられたくない、もっと多くの人間に認められたい、なんて欲求から来ているのかもね"
  },
  {
    id: "end2",
    name: "家族の人",
    conditions: { C: "high", E: "low", A: "high" },
    funeralIntro: [
      "祭壇には白い花々が飾られ、中央にはあなたの遺影が置かれている。",
      "そこに写るあなたは、どこか安心したような笑顔である。",
      "会場は、黒い喪服に身を包んだ人々が集まっている。\n配偶者、子供、孫、友人、そして長い時間ともに過ごしてきた人々。\n参列者の数は多くはない。しかし、あなたをよく知る人々が集まっていた"
    ],
    summaryLargeLines: [
      "**あなたの人生は華やかなものではなかったかも知れない**",
      "**誰もが望むような生活ではないかも知れない**",
      "それでも、あなたには大切にしたい人がいた。",
      "日々、何気ない一日を守り、誰かのために時間を使ってきた。",
      "時には自分を後回しにすることもあったかも知れない。しかし、あなたは他者と共に過ごす選択を続けてきた。",
      "そんな選択の積み重ねで今日が成り立っている。",
      "あなたはもう、誰かの相談を受けることも、いつもの場所に帰ることもできない。"
    ],
    summaryTitle: "選択は永遠ではない。何気ない日常もいつかは終わりを迎える。あなたは自身の選択から、",
    summaryDesc: "としてこの選択の幕を引く。\n\nあなたは自身を大切に思う人々に見送られながらこの世を去った。",
    bigFiveAnalysis: "責任感や計画性を持ち、周囲との調和を重視する選択を続けてきただろう。",
    sins: "「怠惰」と「嫉妬」",
    deathGodComment: "『あなた』の献身性は立派なこと。しかし、それは自分の望みを諦め、他者の自由を羨むこともあったかもね"
  },
  {
    id: "end3",
    name: "放浪者",
    conditions: { O: "high", C: "low", E: "low" },
    funeralIntro: [
      "祭壇には白い花々が飾られ、中央にはあなたの遺影が置かれている。",
      "そこに写るあなたは、どこか楽しげな表情だ。",
      "会場は、黒い喪服に身を包んだ人々が集まっている。\n親族、友人、あなたの一部を知る人々。\n互いに見覚えのない人々があなたのために、今日ここにいる。"
    ],
    summaryLargeLines: [
      "**あなたの人生に安寧な場所はなかったかもしれない**",
      "**あなたを真に理解する人はいないかもしれない**",
      "それでも、あなたは足を踏み出した。あなたの気の赴くままに、知らない世界に踏み入れただろう。",
      "長く付き合う人もいれば、一時しか時間をともにしなかった人もいるだろう。あなたの何気ない出会いが、誰かにとっては意味のある思い出かもしれない",
      "そんな選択の積み重ねで今日が成り立っている。",
      "あなたはもう、新しい場所へ向かうことも、知らない誰かと出会うこともできない。",
      "ただ、あなたの進んだ道はただの一本ではない。さまざまな道と交差し作り上げられている。人々が知っているのはあなたの一部に過ぎない。しかしその一部は、記憶に残るものかもしれない。"
    ],
    summaryTitle: "人生は永遠ではない、選択も永遠ではない。出会いも旅も終わりを迎える。あなたは自身の選択から、",
    summaryDesc: "としてこの選択の幕を引く。\n\nあなたはさまざまな場所をめぐり、人の記憶に残りながらこの世を去った。",
    bigFiveAnalysis: "好奇心が強く、新しいことへの挑戦心が強い傾向にある。また、柔軟で気楽かつ一人の時間を大切にする選択を続けてきただろう。",
    sins: "「怠惰」と「暴食」",
    deathGodComment: "『あなた』の好奇心は様々な景色を見せてくれるだろう。しかし、自由を歩むばかりに、何かを積み重ねることを後回しにして、好奇心のままに足を踏み出す。なんてことがあったりするかもね"
  },
  {
    id: "end4",
    name: "完璧主義者",
    conditions: { O: "low", C: "high", N: "high" },
    funeralIntro: [
      "祭壇には整然と白い花々が飾られ、中央にはあなたの遺影が置かれている。",
      "そこに写るあなたは、背筋を伸ばし凛とした表情を浮かべている。",
      "会場は、黒い喪服に身を包んだ人々が集まっている。\nかつての同僚、あなたのもとで働いた人々、長年あなたをしる友人や家族。\n彼らは静かに席につき、厳粛な雰囲気の中で最後の別れを待っていた。"
    ],
    summaryLargeLines: [
      "**あなたの人生は平坦なものではなかった**",
      "**時に責任感が周りだけでなく自身を苦しめただろう。**",
      "ときに自分を貫くことで他者と衝突することもあった。もっと準備を重ねるべきと後悔することも少なくない。しかし、その姿勢は周囲から信頼を得るものだっただろう。",
      "だからこそ、今日が成り立っている。",
      "あなたはもう、誰かの期待に応えることも目的のために努力することもできない。",
      "それでも、あなたの努力は確かに残る。あなたの姿勢、仕事は引き継ぐ人がいる。"
    ],
    summaryTitle: "人生は永遠ではない、自分で終わりを決めることはできない。あなたは自身の選択から、",
    summaryDesc: "としてこの選択の幕を引く。\n\nあなたは、あなたを信頼する人々に見送られてこの世を去った。",
    bigFiveAnalysis: "感受性が豊かである、しかしそれゆえ不安やネガティブな感情を抱えやすい傾向がある。また、自分の意見を貫く選択を選びやすいだろう",
    sins: "「憂鬱」と「傲慢」",
    deathGodComment: "不安を抱える心、考えを譲れない意思、この二つが君を苦しめることもあっただろう。しかし、それがあなたを『あなた』にしているかもね"
  },
  {
    id: "end5",
    name: "挑戦者",
    conditions: { O: "high", E: "high", N: "low" },
    funeralIntro: [
      "祭壇には白い花々が飾られ、中央にはあなたの遺影が置かれている。",
      "そこに写るあなたは、活気に満ちた表情をしている。",
      "会場には、黒い喪服に身を包んだ人々が集まっている。\n古い友人、仕事仲間、あなたと共に挑戦した人。\n彼らは静かに席につき、厳粛な雰囲気の中で最後の別れを待っていた。",
      "密度が小さい会場を眺めていた参列者が口を開く。\n「......あの人らしいね」\n「そうかな」\n「大勢で集まるような人じゃなかったでしょう？」\n「確かにそうだね」"
    ],
    summaryLargeLines: [
      "**あなたの人生は安定したものではなかった**",
      "**何事にも挑戦し、周囲を巻き込みながら知らないことを知ろうとしてきた。**",
      "全てうまく行ったわけではない。努力が身を結ばず思い描いた未来には届かないことも少なくない。",
      "それでも、失敗は足を止める理由にはならなかった。",
      "挑戦した時間そのものがあなたを形作った。そして、あなたとともに挑戦した仲間がここに集った。",
      "だからこそ、今日が成り立っている。",
      "あなたはもう、新しいことを始めることも、仲間ととも新たな一歩を踏み出すこともできない。",
      "しかし、全てが無意味ではない。"
    ],
    summaryTitle: "選択は永遠ではない、挑戦を続けられる時間も限りがある。あなたは自身の選択から、",
    summaryDesc: "としてこの選択の幕を引く。\n\nあなたは、ともに挑戦したかつての仲間たちに惜しまれながら、この世を去った。",
    bigFiveAnalysis: "あなたは創造的で刺激を求める傾向がある。また、感情的に動じない選択肢を続けてきただろう。",
    sins: "「強欲」と「傲慢」",
    deathGodComment: "もっと知りたい、もっと先へ進みたい、その欲求こそがあなたを前に進ませたんだろう。でも、その感情は強欲であり、時に他人から傲慢にうつるかもしれないね"
  },
  {
    id: "end6",
    name: "孤独な人",
    conditions: { C: "low", E: "low", A: "low", N: "high" },
    funeralIntro: [
      "祭壇には白い花々が飾られ、中央にはあなたの遺影が置かれている。",
      "そこに写るあなたは、無表情でこちらをまっすぐと見つめていた。",
      "会場は、黒い喪服に身を包んだ人々が集まっている。\n親族、長年の友人、あなたと長い間を過ごした人々。\n参列者の数は、多くはない。",
      "密度が小さい会場を眺めていた参列者が口を開く。\n「......あの人らしいね」\n「そうかな」\n「大勢で集まるような人じゃなかったでしょう？」\n「確かにそうだね」"
    ],
    summaryLargeLines: [
      "**あなたの人生は賑わいがなかったかもしれない**",
      "**周りの発言を気にして悩んだ夜も少なくなかった。**",
      "それでも、あなたは自身の考えを貫き、あなたとしての選択を続けてきた。",
      "ときに自分を貫くことで他者と衝突することもあった。もっと違う伝え方ができれば、なんて後悔もした。しかし、そんなあなたを理解する人がいる。",
      "だからこそ、今日が成り立っている。",
      "あなたはもう、誰かと話すことも、自分の考えを伝えることもできない。",
      "それでも、あなたを理解する人が確かにここにいる。"
    ],
    summaryTitle: "人生は永遠ではない、選択も永遠ではない。あなたは自身の選択から、",
    summaryDesc: "としてこの選択の幕を引く。\n\nあなたは真にあなたを知る人々に惜しまれながらこの世を去った。",
    bigFiveAnalysis: "感受性が豊かである、しかしそれゆえ不安やネガティブな感情を抱えやすい傾向がある。また、自分の意見を貫く選択を選びやすいだろう",
    sins: "「憂鬱」と「傲慢」",
    deathGodComment: "不安を抱える心、考えを譲れない意思、この二つが君を苦しめることもあっただろう。しかし、それがあなたを『あなた』にしているかもね"
  },
  {
    id: "end7",
    name: "後悔する人",
    conditions: { O: "low", C: "low", N: "high" },
    funeralIntro: [
      "祭壇には白い花々が飾られ、中央にはあなたの遺影が置かれている。",
      "そこに写るあなたは、物思いに耽るような、静かな表情をしていた。",
      "会場は、黒い喪服に身を包んだ人々が集まっている。\n親族、長年の友人、あなたと長い間を過ごした人々。\n参列者の数は、多くはない。"
    ],
    summaryLargeLines: [
      "**人生には選ばなかった道がいくつも存在する**",
      "**もし別の選択をしていれば、と考える日もあるだろう**",
      "新しい一歩を踏み出す前に、その先の失うものを考え躊躇うことがあった。",
      "それでも、あなたが選び、歩んだ道だからこそ出会いや経験があった。あなたの思慮深さを理解し、あなたとの時間を大切に思う人もいる。",
      "あなたはもう、別の選択を選ぶことも、過去をやり直すこともできない。",
      "それでも、あなたを理解する人が確かにここにいる。"
    ],
    summaryTitle: "人生は永遠ではない、選択も永遠ではない。あなたは自身の選択から、",
    summaryDesc: "としてこの選択の幕を引く。\n\nあなたの人生を思い返す人々は、それぞれの記憶の中にあなたと過ごした時間を残していく。",
    bigFiveAnalysis: "あなたは感受性豊かだがそれゆえネガティブな感情を抱えやすい傾向がある。また、慣れ親しんだ手順を好みつつも柔軟な選択を続けてきただろう。",
    sins: "「憂鬱」と「怠惰」",
    deathGodComment: "未来を考え、悩むことはより良い選択につながるだろう。しかし、それゆえに恐れる必要のない未来に怯え、選択を放棄したことがあったかもしれないね"
  },
  {
    id: "end8",
    name: "伝説の人",
    conditions: { O: "high", C: "high", E: "high", N: "low" },
    funeralIntro: [
      "祭壇には白い花々が飾られ、中央にはあなたの遺影が置かれている。",
      "そこに写るあなたは、力強く自身に満ちた表情である。",
      "会場は、黒い喪服に身を包んだ人々が集まっている。\n親族、友人、仕事仲間、あなたと直接出会ったことのない人々までが参列している。\n会場のあちこちで、あなたの名前が囁かれている。"
    ],
    summaryLargeLines: [
      "**あなたは一般的な感性からは共感を得づらい人生だったかもしれない**",
      "**それゆえ孤独を感じる日もあるだろう**",
      "あなたは目的のため、実現するために努力をしてきた。",
      "理想を形にし、困難にも屈せず、可能性を広げてきた。",
      "もちろん、思い通りにならないものもある。道半ばで折れた目標も少なくないでしょう。",
      "ただ、あなたの行動が、多くの人に影響を与えたことでしょう。証拠に、この葬式にはこんなにも参列者がいるのだ。",
      "あなたが残したものが、今日として今ここにある。"
    ],
    summaryTitle: "人生は永遠ではない、どれほど大きな功績を残しても、いつか自身の物語には終わりを告げる。あなたは自身の選択から、",
    summaryDesc: "としてこの選択の幕を引く。\n\nあなたの人生を思い返す人々は、それぞれの記憶の中にあなたと過ごした時間を残していく。",
    bigFiveAnalysis: "あなたは積極性、勤勉さ、好奇心の強さを併せ持つ傾向がある。また、感情的には動じない選択肢を続けてきただろう。",
    sins: "「傲慢」と「強欲」",
    deathGodComment: "目標を成し遂げるあなたには、一定の自信があったでしょう。しかし、時にそれは傲慢や強欲といった、罪に形を変えあなたを脅かすかもしれないね"
  }
];

function getLevel(value) {
  if (value >= HIGH) return "high";
  if (value <= LOW) return "low";
  return "mid";
}

function checkEnd() {
  const scores = { O, C, E, A, N };
  const levels = Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, getLevel(value)]));
  
  let bestEnding = endings[0];
  let maxScore = -999;

  for (const ending of endings) {
    let matchCount = 0;
    let affinitySum = 0;
    const condKeys = Object.keys(ending.conditions);

    for (const key of condKeys) {
      const condVal = ending.conditions[key];
      if (levels[key] === condVal) matchCount++;
      const actualVal = scores[key];
      if (condVal === "high") affinitySum += (actualVal / 20);
      else if (condVal === "low") affinitySum += (-actualVal / 20);
    }

    let affinity = condKeys.length > 0 ? (affinitySum / condKeys.length) : 0;
    let fallbackBonus = 0;

    if (ending.name === "放浪者" && O >= 2 && E <= 1 && C <= 2) fallbackBonus = 2.5;
    else if (ending.name === "完璧主義者" && O <= 3 && C >= 2 && N >= 1) fallbackBonus = 3.5;
    else if (ending.name === "孤独な人" && C <= 5 && E <= 5 && A <= 5 && N >= 0) fallbackBonus = 2.5;
    else if (ending.name === "後悔する人" && O <= 5 && C <= 5 && N >= 0) fallbackBonus = 4.0;

    let finalScore = matchCount + (0.3 * affinity) + fallbackBonus;

    if (finalScore > maxScore) {
      maxScore = finalScore;
      bestEnding = ending;
    }
  }

  return bestEnding;
}

function addScores(scores) {
  O += scores.O || 0; C += scores.C || 0; E += scores.E || 0; A += scores.A || 0; N += scores.N || 0;
}

function getQuestionSequence() {
  const common = questions.slice(0, 6);
  const branch = route === "plus" ? questions.slice(6, 9) : questions.slice(9, 12);
  return common.concat(branch);
}

const $ = (id) => document.getElementById(id);
const intro = $("intro");
const layout = document.querySelector(".layout");
const introArtWrap = intro.querySelector(".intro-art-wrap");
const introTitle = $("intro-title");
const introTitleLine = intro.querySelector(".title-line");
const introLine = $("intro-line");
const startButton = $("start-button");
const questionScreen = $("question-screen");
const transitionScreen = $("transition-screen");
const endingSeqScreen = $("ending-sequence-screen");
const bgm = $("bgm");
const bgm2 = $("bgm2");
const bgm3 = $("bgm3");
const narration = $("narration");
const deathGod = $("death-god");
let introIndex = 0;
let currentEnding = null;
let introStarted = false;

const asset = (path) => `assets/${path}`;

function playNarration(path) {
  if (!path || !narration) return;
  narration.pause();
  narration.currentTime = 0;
  narration.onended = null;
  
  narration.src = asset(path);
  narration.load();
  narration.play().catch(() => {});
}

function startBgm() {
  if (!bgm) return;
  bgm.volume = 0.22;
  bgm.play().catch(() => {});
}
function stopBgm() {
  if (bgm) bgm.pause();
}

function startEndingBgm(endingName) {
  stopBgm();
  if (bgm2) bgm2.pause();
  if (bgm3) bgm3.pause();

  if (endingName === "人脈の人" || endingName === "家族の人") {
    if (bgm2) {
      bgm2.currentTime = 0;
      bgm2.volume = 0.25;
      bgm2.play().catch(() => {});
    }
  } else if (endingName === "放浪者" || endingName === "後悔する人") {
    if (bgm3) {
      bgm3.currentTime = 0;
      bgm3.volume = 0.25;
      bgm3.play().catch(() => {});
    }
  }
}

function stopNarration() {
  if (narration) {
    narration.pause();
    narration.currentTime = 0;
    narration.onended = null;
  }
}

function questionVoicePath() {
  const number = String(currentQuestion + 1).padStart(2, "0");
  if (currentQuestion >= 6) return `voice/question-${number}-${route === "plus" ? "plus" : "minus"}.mp3`;
  return `voice/question-${number}.mp3`;
}
function showOnly(screen) {
  [intro, questionScreen, transitionScreen, endingSeqScreen].forEach((el) => { if (el) el.hidden = el !== screen; });
}
function fadeTo(callback) {
  const veil = $("fade-veil");
  veil.classList.add("is-visible");
  window.setTimeout(() => {
    callback();
    window.setTimeout(() => veil.classList.remove("is-visible"), 80);
  }, 650);
}
function updateDarkness() {
  const progress = Math.min(currentQuestion / 8, 1);
  document.documentElement.style.setProperty("--darkness", progress);
}
function updateProgress() {
  const stages = [...document.querySelectorAll(".stage")];
  const completed = Math.min(currentQuestion, 9);
  stages.forEach((stage, index) => {
    stage.classList.toggle("active", index === Math.min(completed, 8));
    stage.classList.toggle("completed", index < completed);
  });
}

function renderQuestion() {
  const sequence = getQuestionSequence();
  if (currentQuestion >= sequence.length) { startEndingSequence(); return; }
  const q = sequence[currentQuestion];
  updateDarkness();
  $("eyebrow").textContent = `${q.title} ${q.stage}`;
  $("story").textContent = q.story;
  $("question1").textContent = q.prompt;
  $("heading").textContent = "質問";
  const choices = $("choices");
  choices.innerHTML = "";
  q.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<span class="choice-number">${String(index + 1).padStart(2, "0")}</span><span class="choice-text"></span><span class="choice-arrow">→</span>`;
    button.querySelector(".choice-text").textContent = choice.text;
    button.addEventListener("click", () => {
      stopNarration();
      addScores(choice.scores);
      
      answerHistory[q.id] = { stage: q.stage, text: choice.text, index: index };

      if (currentQuestion === 5) route = (A + E >= 0) ? "plus" : "minus";
      currentQuestion += 1;
      updateProgress();
      renderQuestion();
    });
    choices.appendChild(button);
  });
  playNarration(questionVoicePath());
}

function getChoiceText(qId, fallback = "") {
  return answerHistory[qId] ? answerHistory[qId].text : fallback;
}

function getChoiceIndex(qId) {
  return answerHistory[qId] ? answerHistory[qId].index : 0;
}

function getFuneralSequence(ending) {
  const q1Text = getChoiceText("Q1", "ガラガラ");
  const q2Idx = getChoiceIndex("Q2");
  const q3Idx = getChoiceIndex("Q3");
  const q4Idx = getChoiceIndex("Q4");
  const q4Text = getChoiceText("Q4", "教室の真ん中");
  const q7AText = getChoiceText("Q7A", "自分も結婚して子供産みたい");

  let memorySteps = [];

  switch (ending.name) {
    case "人脈の人": {
      const q2Lines = [
        ["「あの人、一人でいる人を放っておけない人だったよね」", "「そうそう、気づいたら知らない子まで一緒に遊んでさ」"],
        ["「あの人と遊ぶとなんだかんだ、誰かといたよね」", "「楽しいことを見つけるのも、誰かを誘うのも上手だったからな」"],
        ["「意外と一人で遊ぶのも好きだったよね」", "「ポイントは自分の時間も大切にすることだったね」"],
        ["「あの人虫を観察するの好きだったよね」", "「そうそう、でもなんだかんだみんなで虫を観察したな」"]
      ][q2Idx] || ["「あの人、一人でいる人を放っておけない人だったよね」", "「そうそう、気づいたら知らない子まで一緒に遊んでさ」"];

      memorySteps = [
        { text: `学生時代の友人が、棺桶に入れられた ${q1Text} を眺めながら口を開く。`, reset: true, action: "clearBg" },
        { text: "「......なんだか、実感が湧かないな」", reset: false },
        { text: q2Lines[0], reset: false },
        { text: q2Lines[1], reset: false },
        { text: "「ふふ、懐かしいね」", reset: false },
        { text: "懐かしむよう声に、小さな笑いが混じる。", reset: false }
      ];
      break;
    }

    case "家族の人": {
      const q4SeatResult = (q4Idx === 0 || q4Idx === 1) ? "教室の窓側の奥の席" : "教卓の真ん前";
      memorySteps = [
        { text: `棺桶に入れられた ${q1Text} を見ながら友人たちが口を開く。`, reset: true, action: "clearBg" },
        { text: `「みんな覚えてる？この人さ、席替えの日『${q4Text}』が良いって言ってたのに、実際は ${q4SeatResult} になってさ。あの時のフラグ回収早かったな〜...」`, reset: false },
        { text: "「1日中落ちこんでたの面白かったな」", reset: false },
        { text: "その隣では、別の参列者が思い出話をしていた。", reset: false },
        { text: "「......懐かしいな」", reset: false },
        { text: "「ん？どうかした？」", reset: false },
        { text: "「だいぶ前に、私がみんなに結婚して子供が生まれるんだ。って話した時あったじゃない？あの時、この人『" + q7AText + "』みたいなリアクションしてたな〜って」", reset: false },
        { text: "「そんなこと言ってたっけ？」", reset: false },
        { text: "「言ってたかは確かじゃないけど、少なくともそういう反応してたよ」", reset: false },
        { text: "「まぁ、想像はつくけどね...」", reset: false },
        { text: "皆、思い出を懐かしむように口を開く", reset: false }
      ];
      break;
    }

    case "放浪者": {
      let talk = [];
      if (q3Idx === 0) {
        talk = [
          "長年の友人が口を開く。",
          "「なぁ、あいつってこんなに顔が広かったっけ」",
          "「そりゃあっちこっち意欲的に移動してきた人だし。知り合いも多いだろ」",
          "「そうだよな......俺たちは意外とあいつのこと知らないんだな。小学生からずっと同じ学校で、中学も同じで、それでも全然知らないな」",
          "「確かに。俺ら含めてみんなここにいる人はあいつのこと知らないだろ。同じ場所に居続けるタイプじゃないし」"
        ];
      } else if (q3Idx === 1) {
        talk = [
          "中学からの友人が口を開く。",
          "「あの人ってたくさん知り合いがいるんだね。行動的な人だとは思ってたけど」",
          "「しかも全然タイプ違う人多くない？あの人はスーツ着てかっちりした人だけど、ちょっと右見たら髭モジャモジャのワイルドなおじさん。逆に左を見たら、めっちゃお年を召したおばあちゃんとか......」",
          "「なんだか、こんなにいろんな人がいると面白いね」",
          "「でも、あの人っぽい。いろんな所に出向く人だったし」"
        ];
      } else {
        talk = [
          "学生時代の先生が口を開く。",
          "「佐藤先生。覚えてますか、彼女の学生時代の頃とか」",
          "「えぇ、覚えていますよ。なんだかんだ挑戦したり、活動的にあっちこっち行くような人だったことを覚えていますよ」",
          "「懐かしいなぁ、それこそ留学とかも言ってましたよね。海外の方まで参列してるのってあの人っぽいな」",
          "「行きたいように、進みたい道を歩む人でしたからね」"
        ];
      }
      memorySteps = [
        { text: "参列者たちが口を開く。", reset: true, action: "clearBg" },
        { text: "「あの人ってこんなに顔広かったんだ」", reset: false },
        { text: "「私は旅先で出会ったきりだけど、楽しそうな人だったよ。また、どこかで出会えると思ったんだけどな......」", reset: false },
        { text: "その隣では、別の参列者が思い出話をしていた。", reset: false },
        ...talk.map(line => ({ text: line, reset: false })),
        { text: "同じ人を知っているはずだが、語られる姿を少しずつ違う\nそれでも、懐かしむ声があなたを語る。", reset: false }
      ];
      break;
    }

    case "完璧主義者": {
      const q2Lines = [
        [
          "「あの人、昔から一人でいる子を放っておけない人だったね」",
          "「みんなと友達、みたいなタイプじゃないけど、誰かが困っていたら面倒見てくれたよね」",
          "「そうそう、頼まれたわけでもないのに」",
          "「でもそのおかげで私達も知り合ったからね」"
        ],
        [
          "「あの人、遊ぶ時も真剣だったね」",
          "「しかも、勝利にめっちゃ貪欲でさ。買ったら本当に嬉しそうだけど、負けたら、ほんとに悔しがってて」",
          "「どうやったらいいか次の勝利のために考えてたりしてて、そこまでする必要ある？とか思ってた」",
          "「でもまぁ、だからこそあの人と遊ぶのは楽しかったな」"
        ],
        [
          "「あの人って一人で遊ぶこと多かったね」",
          "「みんなで遊びにきたのに急にブランコに向かっていったり」",
          "「でもあの人にとってはそれが一番したいことだったんだよね、たぶん」",
          "「まあ、自分の時間を大事にしつつやりたいことを突き通す人だったから、納得だな」"
        ],
        [
          "「あ、蜘蛛だ。懐かしいな......」",
          "「懐かしいって？」",
          "「ほら、幼い頃にみんなと遊びに行ったらあの人でっかい蜘蛛をずっと見てただろ？そもそも草むらの虫を探すような人だったけど、あの時はほんとに大きい蜘蛛でマジでビビったなぁ、って」",
          "「確かにそんなこともあったかも。でも細かいところまで気にするのって昔に限らずじゃない？」"
        ]
      ][q2Idx] || [];

      memorySteps = [
        { text: "幼い頃からの友人が口を開く", reset: true, action: "clearBg" },
        ...q2Lines.map(line => ({ text: line, reset: false })),
        { text: "皆、あなたのことをよく覚えていた。\n真面目だったこと。責任感が強かったこと。何事にも手を抜かなかったこと。\nそして、ときどき、自分に厳しすぎるところがあったこと。\n「……本当に、あの人らしいね」\n誰かがそう言うと、別の誰かが小さく笑った。\nその笑い声は、やがて静かな会場の中に溶けていった。", reset: false }
      ];
      break;
    }

    case "挑戦者": {
      const q4SeatResult = (q4Idx === 0 || q4Idx === 1) ? "教室の窓側の奥の席" : "教卓の真ん前";
      memorySteps = [
        { text: `棺桶に入れられた ${q1Text} を見ながら友人たちが口を開く。`, reset: true, action: "clearBg" },
        { text: "「......覚えてる？中学生のころの席替え」", reset: false },
        { text: "「まあ、おぼえているけど？」", reset: false },
        { text: `「この人さ、席替えの日『${q4Text}』が良いって言ってたのに、実際は ${q4SeatResult} になってさ。あの時のフラグ回収早かったな〜...」`, reset: false },
        { text: "「でも、全然落ち込まず、むしろ新しい席でワクワクして喜んでたね」", reset: false },
        { text: "その隣では、別の参列者が思い出話をしていた。", reset: false },
        { text: "懐かしむよう声に、小さな笑いが混じる。", reset: false }
      ];
      break;
    }

    case "孤独な人": {
      memorySteps = [
        { text: "古くからの友人が口を開く", reset: true, action: "clearBg" },
        { text: "「......覚えてる？席替えの日にみんなでどこの席がいいか話してたの」", reset: false },
        { text: "「そんなこともあったっけ」", reset: false },
        { text: `「あった、あった。確か青年期の選択肢『${q4Text}』が良いっていってなかったっけ」`, reset: false },
        { text: "「そうそう、あんまり関わりを必要とする人って感じじゃなくてさ」", reset: false },
        { text: "「そんな話をしてたら、みんなで真ん前になってね」", reset: false },
        { text: "「あの時の心底嫌そうな顔面白かったな~......」", reset: false },
        { text: "その隣では、別の参列者が思い出話をしていた。", reset: false },
        { text: "懐かしむよう声に、小さな笑いが混じる。", reset: false }
      ];
      break;
    }

    case "後悔する人": {
      memorySteps = [
        { text: "古くからの友人が口を開く", reset: true, action: "clearBg" },
        { text: "「......覚えてる？席替えの日にみんなでどこの席がいいか話してたの」", reset: false },
        { text: "「そんなこともあったっけ」", reset: false },
        { text: `「あった、あった。確か青年期の選択肢『${q4Text}』が良いっていってなかったっけ」`, reset: false },
        { text: "「そうそう、あんまり関わりを必要とする人って感じじゃなくてさ」", reset: false },
        { text: "「そんな話をしてたら、みんなで真ん前になってね」", reset: false },
        { text: "「あの時の心底嫌そうな顔面白かったな~......」", reset: false },
        { text: "その隣では、別の参列者が思い出話をしていた。", reset: false },
        { text: "懐かしむよう声に、小さな笑いが混じる。", reset: false }
      ];
      break;
    }

    case "伝説の人": {
      const q4SeatResult = (q4Idx === 0 || q4Idx === 1) ? "教室の窓側の奥の席" : "教卓の真ん前";
      memorySteps = [
        { text: `棺桶に入れられた ${q1Text} を見ながら友人たちが口を開く。`, reset: true, action: "clearBg" },
        { text: "「......覚えてる？中学生のころの席替え」", reset: false },
        { text: "「まあ、おぼえているけど？」", reset: false },
        { text: `「この人さ、席替えの日『${q4Text}』が良いって言ってたのに、実際は ${q4SeatResult} になってさ。あの時のフラグ回収早かったな〜...」`, reset: false },
        { text: "「でも、全然落ち込まず逆にすぐ新しい友達作ってたよね。」", reset: false },
        { text: "「そうだった、そうだった。懐かしいね」", reset: false },
        { text: "その隣では、別の参列者が思い出話をしていた。", reset: false },
        { text: "懐かしむよう声に、小さな笑いが混じる。", reset: false }
      ];
      break;
    }
  }

  return memorySteps;
}

function renderChoiceHistory(targetListId = "choice-history-list") {
  const historyList = $(targetListId);
  if (!historyList) return;
  historyList.innerHTML = "";
  const sequence = getQuestionSequence();
  sequence.forEach((q) => {
    const record = answerHistory[q.id];
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `<span class="history-stage">${q.stage}</span>: <span class="history-choice">${record ? record.text : "未回答"}</span>`;
    historyList.appendChild(li);
  });
}

function openHistoryModal() {
  renderChoiceHistory("modal-choice-history-list");
  const modal = $("history-modal");
  if (modal) modal.hidden = false;
}

function closeHistoryModal() {
  const modal = $("history-modal");
  if (modal) modal.hidden = true;
}

function updateDiagnosisUI() {
  $("diag-ending-name").textContent = currentEnding.name;
  $("diag-sins-val").textContent = currentEnding.sins;

  const scores = { O, C, E, A, N };
  for (const key of ["O", "C", "E", "A", "N"]) {
    const val = scores[key];
    const percent = Math.min(Math.max(((val + 10) / 20) * 100, 5), 100);
    $(`bar-${key}`).style.width = `${percent}%`;
    $(`val-${key}`).textContent = val > 0 ? `+${val}` : `${val}`;
  }
  $("diagnosis-card").hidden = false;
}

/* --- 質問終了後の途絶演出 --- */
function startEndingSequence() {
  stopNarration();
  stopBgm();
  currentEnding = checkEnd();

  showOnly(transitionScreen);
  const container = $("transition-text-container");
  container.innerHTML = "";
  
  renderChoiceHistory("choice-history-list");
  $("choice-history-wrap").hidden = false;

  const narrationSteps = [
    { text: "「『あなた』の選択はここで途絶えた」", voice: "voice/transition-01.wav" },
    { text: "「ここからあなたができることは無い」", voice: "voice/transition-02.wav" },
    { text: "「どうやらあなたの葬式が、今から行われるようだ」", voice: "voice/transition-03.wav" }
  ];
  let narrationStepIdx = 0;

  $("transition-next").onclick = () => {
    fadeTo(() => {
      $("choice-history-wrap").hidden = true;
      container.innerHTML = "";

      const addNextLine = () => {
        if (narrationStepIdx < narrationSteps.length) {
          const item = narrationSteps[narrationStepIdx];
          const p = document.createElement("p");
          p.textContent = item.text;
          p.className = "step-line";
          container.appendChild(p);

          playNarration(item.voice);

          narrationStepIdx++;
        } else {
          stopNarration();
          startFuneralPhase();
        }
      };

      $("transition-next").onclick = addNextLine;
      addNextLine();
    });
  };
}

function startFuneralPhase() {
  startEndingBgm(currentEnding.name);

  fadeTo(() => {
    showOnly(endingSeqScreen);
    const stage = $("ending-stage");
    stage.className = "ending-stage funeral-bg";
    $("death-god-ending-wrap").hidden = true;
    $("diagnosis-card").hidden = true;

    const container = $("ending-text-container");
    container.innerHTML = "";

    const introSteps = currentEnding.funeralIntro.map(text => ({ text, reset: false }));
    const memorySteps = getFuneralSequence(currentEnding);

    const funeralSteps = [
      ...introSteps,
      ...memorySteps,
      
      {
        type: "staggerLines",
        lines: currentEnding.summaryLargeLines,
        action: "darkBg",
        reset: true
      },

      {
        type: "endingSummary",
        summaryTitle: currentEnding.summaryTitle,
        endingName: currentEnding.name,
        summaryDesc: currentEnding.summaryDesc,
        reset: true
      },

      { text: "「やぁ、おかえり」\n「君が選んで進んだ『あなた』はどうだった？」\n「納得がいくものだった？」", reset: true, action: "whiteBg", showDeathGod: true },
      { text: `「私から見た『あなた』は」\n「${currentEnding.bigFiveAnalysis}」\n「そんな『あなた』は${currentEnding.sins}が相応しい」\n「${currentEnding.deathGodComment}」`, reset: true, showDiagnosis: true },
      { text: "「まぁ、そんなところだ」\n「人生は短い。永遠に感じたとしても、限りがある」\n「今の『あなた』はやり直しが効くもんじゃない。だから、せいぜい楽しめば良い」\n「『あなた』の選択をね」", reset: true, hideDiagnosis: true },
      { text: "--- 物語はここで完結しました ---\n（再度遊ぶ場合はページを再読み込みしてください）", reset: true, isFinal: true, hideDeathGod: true, showDiagnosis: true }
    ];

    let currentStep = 0;
    let autoTimer = null;

    const renderStep = (stepIdx) => {
      if (autoTimer) clearTimeout(autoTimer);
      if (stepIdx < 0 || stepIdx >= funeralSteps.length) return;

      const stepData = funeralSteps[stepIdx];

      if (stepData.action === "clearBg") stage.className = "ending-stage memory-bg";
      if (stepData.action === "darkBg") stage.className = "ending-stage dark-bg";
      if (stepData.action === "whiteBg") stage.className = "ending-stage white-bg";

      if (stepData.hideDeathGod) {
        $("death-god-ending-wrap").hidden = true;
      } else if (stepData.showDeathGod) {
        $("death-god-ending-wrap").hidden = false;
      }

      if (stepData.showDiagnosis) {
        updateDiagnosisUI();
      } else if (stepData.hideDiagnosis) {
        $("diagnosis-card").hidden = true;
      }

      if (stepData.reset) {
        container.innerHTML = "";
      }

      if (stepIdx > 0 && !stepData.isFinal) {
        $("ending-back-btn").hidden = false;
      } else {
        $("ending-back-btn").hidden = true;
      }

      if (stepData.type === "staggerLines") {
        $("ending-next-btn").hidden = true;
        let lineIdx = 0;

        const showNextLine = () => {
          if (lineIdx < stepData.lines.length) {
            const rawText = stepData.lines[lineIdx];
            const p = document.createElement("p");
            p.className = "step-line";

            if (rawText.startsWith("**") && rawText.endsWith("**")) {
              p.textContent = rawText.slice(2, -2);
              p.classList.add("bold-large-text");
            } else {
              p.textContent = rawText;
            }

            container.appendChild(p);
            lineIdx++;

            if (lineIdx < stepData.lines.length) {
              autoTimer = setTimeout(showNextLine, 1200);
            } else {
              $("ending-next-btn").hidden = false;
            }
          }
        };

        showNextLine();
        return;
      }

      if (stepData.type === "endingSummary") {
        const div = document.createElement("div");
        div.className = "ending-summary-box";

        const pTitle = document.createElement("p");
        pTitle.className = "step-line";
        pTitle.textContent = stepData.summaryTitle;

        const pName = document.createElement("p");
        pName.className = "highlight-ending-name";
        pName.textContent = `『${stepData.endingName}』`;

        const pDesc = document.createElement("p");
        pDesc.className = "step-line";
        pDesc.textContent = stepData.summaryDesc;

        div.appendChild(pTitle);
        div.appendChild(pName);
        div.appendChild(pDesc);
        container.appendChild(div);

        $("ending-next-btn").hidden = false;
        return;
      }

      const p = document.createElement("p");
      p.textContent = stepData.text;
      p.className = "step-line" + (stepData.isLarge ? " large-text" : "");
      container.appendChild(p);

      if (stepData.isFinal) {
        $("ending-next-btn").hidden = true;
      } else {
        $("ending-next-btn").hidden = false;
      }
    };

    $("ending-next-btn").onclick = () => {
      currentStep++;
      renderStep(currentStep);
    };

    $("ending-back-btn").onclick = () => {
      openHistoryModal();
    };

    const modalCloseBtn = $("history-modal-close");
    if (modalCloseBtn) {
      modalCloseBtn.onclick = () => closeHistoryModal();
    }

    const historyModal = $("history-modal");
    if (historyModal) {
      historyModal.onclick = (e) => {
        if (e.target === historyModal) {
          closeHistoryModal();
        }
      };
    }

    renderStep(currentStep);
  });
}

function restart() {
  currentQuestion = 0; O = 0; C = 0; E = 0; A = 0; N = 0; route = null; introIndex = 0; currentEnding = null; introStarted = false;
  answerHistory = {};
  document.documentElement.style.setProperty("--darkness", 0);
  updateProgress();
  stopNarration();
  stopBgm();
  if (bgm2) bgm2.pause();
  if (bgm3) bgm3.pause();
  fadeTo(() => {
    showOnly(intro);
    intro.classList.add("title-only");
    if (layout) layout.classList.add("intro-mode");
    introArtWrap.hidden = true;
    if (introTitle) {
      introTitle.textContent = "『あなた』をもう一度";
      introTitle.hidden = false;
    }
    introTitleLine.hidden = true;
    introLine.hidden = true;
    startButton.textContent = "スタート";
    introStarted = false;
  });
}

/* --- 全導入ステップの配列定義 --- */
const introStepsData = [
  // フェーズ1: タイトル後の事前説明（死神非表示）
  { text: "この物語はフィクション。", voice: "voice/intro-01.mp3", showDeathGod: false },
  { text: "あなたはここに至るまで数えきれない選択をしてきただろう。", voice: "voice/intro-02.mp3", showDeathGod: false },
  { text: "そしてこれからも意図せず、選択を続けていくだろう。死ぬその時まで。", voice: "voice/intro-03.mp3", showDeathGod: false },
  
  // フェーズ2: 死神登場後のセリフ
  { text: "これからあなたに自由な人生を与えよう", voice: "voice/intro-04.mp3", showDeathGod: true },
  { text: "生き方は自由だ。何を思い、何を選ぶのか。今のあなたとして生きてもいい。違う誰かになってもいい", voice: "voice/intro-05.mp3", showDeathGod: true },
  { text: "その人生を見届け、すべての選択を終えた際には、どんなあなただったか評価してあげよう", voice: "voice/intro-06.mp3", showDeathGod: true },
  { text: "怖がる必要なんてない。ただの性格診断のようなものさ", voice: "voice/intro-07.mp3", showDeathGod: true },
  { text: "それでは。良い人生を", voice: "voice/intro-08.mp3", showDeathGod: true }
];

// 初期画面セットアップ
showOnly(intro);
intro.classList.add("title-only");
if (layout) layout.classList.add("intro-mode");
introArtWrap.hidden = true;
if (introTitle) {
  introTitle.textContent = "『あなた』をもう一度";
  introTitle.hidden = false;
}
introTitleLine.hidden = true;
introLine.hidden = true;
startButton.textContent = "スタート";

startButton.addEventListener("click", () => {
  // スタート押下直後：手動進行開始
  if (!introStarted) {
    introStarted = true;
    intro.classList.remove("title-only");
    if (introTitle) introTitle.hidden = true;
    introTitleLine.hidden = false;
    introLine.hidden = false;
    introIndex = 0;
  } else {
    introIndex++;
  }

  // 導入全ステップの進行
  if (introIndex < introStepsData.length) {
    const step = introStepsData[introIndex];
    introLine.textContent = step.text;
    
    // アニメーションのリセット・適用
    introLine.style.animation = 'none';
    introLine.offsetHeight; // リフロー発生
    introLine.style.animation = 'text-appear 0.6s ease both';

    // 死神画像の表示/非表示制御
    if (step.showDeathGod) {
      introArtWrap.hidden = false;
      if (deathGod) deathGod.hidden = false;
    } else {
      introArtWrap.hidden = true;
      if (deathGod) deathGod.hidden = true;
    }

    startButton.textContent = "次へ →";
    playNarration(step.voice);
    return;
  }

  // 導入全ステップ終了：暗転してタイトル「『あなた』をもう一度。」画面へ
  stopNarration();
  fadeTo(() => {
    intro.classList.add("title-only");
    introArtWrap.hidden = true;
    if (deathGod) deathGod.hidden = true;
    introTitleLine.hidden = true;
    introLine.hidden = true;
    if (introTitle) {
      introTitle.textContent = "『あなた』をもう一度。";
      introTitle.hidden = false;
    }
    startButton.textContent = "診断をはじめる →";
    startButton.hidden = false;

    // タイトル表示時に intro-09.mp3 再生
    playNarration("voice/intro-09.mp3");

    // 「診断をはじめる →」クリック時：音声ストップし質問画面（診断）へ移行
    startButton.onclick = () => {
      stopNarration(); // 確実に音声(intro-09)を停止
      fadeTo(() => {
        showOnly(questionScreen);
        if (layout) layout.classList.remove("intro-mode");
        currentQuestion = 0;
        startBgm();
        renderQuestion();
      });
    };
  });
});