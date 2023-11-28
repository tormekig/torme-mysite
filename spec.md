# 市外局番クイズ

## 概要

## 要件

### 動作環境

ブラウザ上で動作
クライアントサイドアプリケーションを想定
サーバーは静的なファイルを供給し、ブラウザ上でプログラムを動作させ、データを保持する。

### 使用言語

- HTML
- CSS
- JSX(React)

## 動作

### メインモード

#### 番号->地名

- 選択式
  - 3択または4択の選択回答方式
- 記述式

## メモ

### データの整理

- 1つのMAに複数の市外局番がある場合がある
- 1つのMAに複数の市町村が含まれる場合がある
- 1つの市外局番に複数の市町村が含まれる場合がある
- MA・市外局番は1つの市町村内でまたがっている場合があり、1つの市町村に複数の市外局番が存在する場合がある
  - ただし、市町村内の地区レベルでは、市外局番は一意に定まる。
  - 1つの市町村で3つ以上の市外局番がまたがっている例があるのかは未確認。
    - 例あり
  - また、同一市町村を二分する場合と、大部分は1つの番号だがごく狭い地域のみ違う番号という場合がある

### クイズの形式

番号から地名(地域)を答えるパターンと、地名から番号を答えるパターンを作りたい

- 番号から地名パターン
  - 地名選択式
    - 全地名から選ぶ
      - MAごと
      - 市町村ごと
    - 出題範囲
      - 地域で絞る方法
        - 地方で絞る
          - 都道府県単位で絞る
            - 複数選択できても面白いかも？
        - 市外局番の先頭で絞る方法
          - 例
            - 01と選んだら、01から始まる市外局番に絞る
            - 013と選んだら、013から始まる市外局番に絞る
          - 出題数は限られるため、全問モードがあってもよい？
            - 10問モードなどにすると絞り方によっては足りなくなる可能性
    - いくつかの選択肢から選ぶ
      - 4つくらいの選択肢を想定
      - 選択肢の種類
        - MAごと
          - 同じ市外局番を持つMAを選択肢に含めるか否か
            - 含める場合は正解扱いにする必要あり
          - MA名を覚える必要があるが、現在の市町村名から直感的でない名前のパターンがあるため、あまり好ましくない
          - 選択肢を自動生成するうえではやりやすい
          - MA名とともに含まれる市町村名を列挙するのもあり？
        - 市町村ごと
          - 同じ市外局番を持つ市町村を選択肢に含めるか否か
            - 含める場合は正解扱いにする必要あり
      - 選択肢の範囲
        - 地域で絞る方法
          - 地方で絞る
          - 都道府県単位で絞る
        - 市外局番の桁数で絞る方法
          - 01397(奥尻)の場合
            - 1桁使用->全地域対象
            - 2桁使用->01から始まる地域のみを抽出
            - 3桁使用->013から始まる地域のみを抽出
            - 4桁使用->0139から始まる地域のみを抽出
            - 5桁使用->01397から始まる地域のみを抽出
          - 桁を多く使うと、その分選択肢が少なくなるため、数が足りなくなった場合は使用桁数を減らして再探索
            - 2桁使用で足りなくなった場合は、同一都道府県内から探索
              - 03は東京都内、06は大阪府内で選択肢を抽出
    - 入力式
        - テキストを自分で入力する
    - 地図選択式
        - 地図を用意しておいて、そこからクリック（タップ）してエリアを指定
- 地名から番号パターン
    - 入力式
        - 地名を出題し、その地名の場所で使われている市外局番の数字をこたえる形式
        - MA名
            - MAに含まれる市町村をすべて列挙する方式/しない方式
        - 市町村名
            - 1つの市町村に複数の市外局番が含まれている場合はどうするか

## 用語

- MA
    - Message Area
    - 市内通話料金（昼間3分8.5円）で通話できる区域
    - 出典：https://www.ntt-east.co.jp/info-st/mutial/suburbs/numlist/
- 方形区画
    - 全国の区域を一辺2kmの正方形に区分した区画のこと。
    - 通話料金算定の基礎となる「通話地域間距離」を測定をするための起算点
    - 各区画にそれぞれ縦軸の番号と横軸の番号を付している。

- data テンプレート
```js
    const info = {
        areaCode: "0152",
        ma: "網走",
        maDistinct: "1",
        compartmentCode: "43",
        pref: "北海道",
        square: "861-622",
        numberBands: [
            {
                start: "0152-1",
                end: "0152-1",
                note: []
            },
            {
                start: "0152-4",
                end: "0152-6",
                note: []
            }
        ],
        numberDesignations: [
            {
                start: "015240",
                end: "015269",
                note: []
            },
        ],
        cities: [
            {
                code: "01208",
                distinct: "1",
                pref: "北海道",
                county: {
                    name: "",
                    kana: "",
                    type: "",
                    typeKana: "",
                },
                name: "北見",
                kana: "きたみ",
                type: "市",
                typeKana: "し",
                zone: {
                    name: "常呂町",
                    scale: ""
                }
            },
            {
                code: "01211",
                distinct: "1",
                pref: "北海道",
                county: {
                    name: "",
                    kana: "",
                    type: "",
                    typeKana: "",
                },
                name: "網走",
                kana: "あばしり",
                type: "市",
                typeKana: "し",
                zone: {
                    name: "",
                    scale: ""
                }
            },
            {
                code: "01547",
                distinct: "1",
                pref: "北海道",
                county: {
                    name: "斜里",
                    kana: "しゃり",
                    type: "郡",
                    typeKana: "ぐん",
                },
                name: "小清水",
                kana: "こしみず",
                type: "町",
                typeKana: "町",
                zone: {
                    name: "",
                    scale: ""
                }
            },
            {
                code: "01564",
                distinct: "1",
                pref: "北海道",
                county: {
                    name: "網走",
                    kana: "あばしり",
                    type: "郡",
                    typeKana: "ぐん",
                },
                name: "大空",
                kana: "おおぞら",
                type: "町",
                typeKana: "ちょう",
                zone: {
                    name: "東藻琴、東藻琴清浦、東藻琴栄、東藻琴新富、東藻琴末広、東藻琴大進、東藻琴千草、東藻琴西倉、東藻琴福富、東藻琴明生及び東藻琴山園に限る。",
                    scale: ""
                }
            },
        ]
    }
```
- react-quiz-component テンプレート
```js
const quiz = {
  "quizTitle": "_title",
  "quizSynopsis": "_synopsis",
  "questions": [
    {
      "question": "_q",
      "questionType": "text",
      "answers": [
        "_#1",
        "_#2",
        "_#3",
      ],
      "correctAnswer": "1",
      "messageForCorrectAnswer": "_correct",
      "messageForIncorrectAnswer": "_incorrect",
      "explanation": "_explanation",
      "point": "1"
    },
    {
      "question": "_q2",
      "questionType": "text",
      "answers": [
        "_#12",
        "_#22",
        "_#32"
      ],
      "correctAnswer": "2",
      "messageForCorrectAnswer": "_correct2",
      "messageForIncorrectAnswer": "_incorrect2",
      "explanation": "_explanation2",
      "point": "1"
    },
    {
      "question": "_q3",
      "questionType": "text",
      "answers": [
        "_#13",
        "_#23",
        "_#33"
      ],
      "correctAnswer": "1",
      "messageForCorrectAnswer": "_correct3",
      "messageForIncorrectAnswer": "_incorrect3",
      "explanation": "_explanation3",
      "point": "1"
    },
    {
      "question": "_q4",
      "questionType": "text",
      "answers": [
        "_#14",
        "_#24",
        "_#34"
      ],
      "correctAnswer": "2",
      "messageForCorrectAnswer": "_correct4",
      "messageForIncorrectAnswer": "_incorrect4",
      "explanation": "_explanation4",
      "point": "1"
    },
    {
      "question": "_q5",
      "questionType": "text",
      "answers": [
        "_#15",
        "_#25",
        "_#35"
      ],
      "correctAnswer": "1",
      "messageForCorrectAnswer": "_correct5",
      "messageForIncorrectAnswer": "_incorrect5",
      "explanation": "_explanation5",
      "point": "1"
    },
  ]
}
```