# 『あなた』をもう一度 — ファイル構成と素材の置き方

## フォルダ構成

```text
anata-wo-mouichido/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── shinigami.png
    ├── bgm.mp3
    ├── voice/
    │   ├── intro-01.mp3 ～ intro-07.mp3
    │   ├── question-01.mp3 ～ question-09.mp3
    │   ├── ending-intro.mp3
    │   └── ending-01.mp3 ～ ending-08.mp3
    └── funeral/
        ├── ending-01.jpg ～ ending-08.jpg
```

## 素材の入れ方

- 死神のイラストを `assets/shinigami.png` に置きます。
- BGMを `assets/bgm.mp3` に置きます。
- 導入のナレーションは `assets/voice/intro-01.mp3` から `intro-07.mp3` の順です。
- 共通6問のナレーションは `assets/voice/question-01.mp3` から `question-06.mp3` です。
- ＋ルートの7〜9問目は `question-07-plus.mp3` ～ `question-09-plus.mp3`、−ルートは `question-07-minus.mp3` ～ `question-09-minus.mp3` です。分岐後の本文が異なるため、音声も分けています。
- エンディング前のナレーションは `assets/voice/ending-intro.mp3`、各結果のナレーションは `ending-01.mp3` から `ending-08.mp3` です。
- 葬儀の背景は `assets/funeral/ending-01.jpg` から `ending-08.jpg` に置きます。診断結果リストの上から順に対応します。

ファイル名を変更する場合は `script.js` 内の `assets/...` の参照先も同じように変更してください。音声や画像がまだない場合でも、コードの作業は進められますが、該当箇所は表示・再生されません。

## 起動方法

まず `index.html` をブラウザで開いて動作確認できます。音声はブラウザの仕様上、最初のクリック後に再生を開始します。公開するときは、このフォルダ内のファイルをまとめて静的サイト公開サービスにアップロードしてください。

## 今回の変更点

- 送ってもらった質問文・選択肢・スコア加算・8種類の診断条件を引き継いでいます。
- 導入文をクリックで1つずつ進める仕様を維持しています。
- 死神イラスト、BGM、ナレーション、葬儀背景を相対パスで参照するようにしました。
- 導入から診断、診断終了から葬儀シーンへの移行に暗転を追加しました。
- 選択肢を選んだ直後は、希望どおりフェードせず次の質問に移動します。
- 8種類の個別エンディング本文そのものは元ファイルに含まれていなかったため、既存の診断説明を使っています。個別の完成稿があれば、後から `script.js` に追加できます。
