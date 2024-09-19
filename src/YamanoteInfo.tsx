interface Transfer {
  line: string;
  station: string;
}

interface Station {
  name: string;
  transfers: Transfer[];
}

const YamanoteInfo: Station[] = [
  {
    name: "東京",
    transfers: [
      {
        line: "東北・山形・秋田・北海道・上越・北陸新幹線",
        station: "東京",
      },
      {
        line: "東海道新幹線",
        station: "東京",
      },
      {
        line: "京浜東北線",
        station: "東京",
      },
      {
        line: "中央線",
        station: "東京",
      },
      {
        line: "宇都宮線・高崎線・上野東京ライン",
        station: "東京",
      },
      {
        line: "東海道線",
        station: "東京",
      },
      {
        line: "総武線・横須賀線",
        station: "東京",
      },
      {
        line: "京葉線",
        station: "東京",
      },
      {
        line: "都営三田線",
        station: "大手町",
      },
      {
        line: "東京メトロ丸ノ内線",
        station: "東京",
      },
      {
        line: "東京メトロ東西線",
        station: "大手町",
      },
      {
        line: "東京メトロ千代田線",
        station: "大手町",
      },
      {
        line: "東京メトロ半蔵門線",
        station: "大手町（記載なし）",
      },
    ],
  },
  {
    name: "神田",
    transfers: [
      {
        line: "京浜東北線",
        station: "神田",
      },
      {
        line: "中央線",
        station: "神田",
      },
      {
        line: "都営新宿線",
        station: "小川町",
      },
      {
        line: "東京メトロ銀座線",
        station: "神田",
      },
      {
        line: "東京メトロ丸ノ内線",
        station: "淡路町（記載なし）",
      },
      {
        line: "東京メトロ千代田線",
        station: "新御茶ノ水",
      },
    ],
  },
  {
    name: "秋葉原",
    transfers: [
      {
        line: "京浜東北線",
        station: "秋葉原",
      },
      {
        line: "中央・総武線",
        station: "秋葉原",
      },
      {
        line: "都営新宿線",
        station: "岩本町",
      },
      {
        line: "東京メトロ日比谷線",
        station: "秋葉原",
      },
      {
        line: "つくばエクスプレス",
        station: "秋葉原",
      },
    ],
  },
  {
    name: "御徒町",
    transfers: [
      {
        line: "京浜東北線",
        station: "御徒町",
      },
      {
        line: "都営大江戸線",
        station: "上野御徒町",
      },
      {
        line: "東京メトロ銀座線",
        station: "上野広小路",
      },
      {
        line: "東京メトロ日比谷線",
        station: "仲御徒町",
      },
    ],
  },
  {
    name: "上野",
    transfers: [
      {
        line: "東北・山形・秋田・北海道・上越・北陸新幹線",
        station: "上野",
      },
      {
        line: "京浜東北線",
        station: "上野",
      },
      {
        line: "宇都宮線・高崎線・上野東京ライン",
        station: "上野",
      },
      {
        line: "常磐線",
        station: "上野",
      },
      {
        line: "東京メトロ銀座線",
        station: "上野",
      },
      {
        line: "東京メトロ日比谷線",
        station: "上野",
      },
      {
        line: "京成本線",
        station: "上野",
      },
    ],
  },
  {
    name: "鶯谷",
    transfers: [
      {
        line: "京浜東北線",
        station: "鶯谷",
      },
    ],
  },
  {
    name: "日暮里",
    transfers: [
      {
        line: "京浜東北線",
        station: "日暮里",
      },
      {
        line: "常磐線",
        station: "日暮里",
      },
      {
        line: "日暮里・舎人ライナー",
        station: "日暮里",
      },
      {
        line: "京成本線",
        station: "日暮里",
      },
    ],
  },
  {
    name: "西日暮里",
    transfers: [
      {
        line: "京浜東北線",
        station: "西日暮里",
      },
      {
        line: "日暮里・舎人ライナー",
        station: "西日暮里",
      },
      {
        line: "東京メトロ千代田線",
        station: "西日暮里",
      },
    ],
  },
  {
    name: "田端",
    transfers: [
      {
        line: "京浜東北線",
        station: "田端",
      },
    ],
  },
  {
    name: "駒込",
    transfers: [
      {
        line: "東京メトロ南北線",
        station: "駒込",
      },
    ],
  },
  {
    name: "巣鴨",
    transfers: [
      {
        line: "都営三田線",
        station: "巣鴨",
      },
    ],
  },
  {
    name: "大塚",
    transfers: [
      {
        line: "都電荒川線",
        station: "大塚",
      },
    ],
  },
  {
    name: "池袋",
    transfers: [
      {
        line: "埼京線",
        station: "池袋",
      },
      {
        line: "湘南新宿ライン",
        station: "池袋",
      },
      {
        line: "東京メトロ丸ノ内線",
        station: "池袋",
      },
      {
        line: "東京メトロ有楽町線",
        station: "池袋",
      },
      {
        line: "東京メトロ副都心線",
        station: "池袋",
      },
      {
        line: "東武東上線",
        station: "池袋",
      },
      {
        line: "西武池袋線",
        station: "池袋",
      },
    ],
  },
  {
    name: "目白",
    transfers: [
    ],
  },
  {
    name: "高田馬場",
    transfers: [
      {
        line: "東京メトロ東西線",
        station: "高田馬場",
      },
      {
        line: "西武新宿線",
        station: "高田馬場",
      },
    ],
  },
  {
    name: "新大久保",
    transfers: [
    ],
  },
  {
    name: "新宿",
    transfers: [
      {
        line: "中央線",
        station: "新宿",
      },
      {
        line: "中央・総武線",
        station: "新宿",
      },
      {
        line: "埼京線",
        station: "新宿",
      },
      {
        line: "湘南新宿ライン",
        station: "新宿",
      },
      {
        line: "都営新宿線",
        station: "新宿",
      },
      {
        line: "都営大江戸線",
        station: "新宿",
      },
      {
        line: "東京メトロ丸ノ内線",
        station: "新宿",
      },
      {
        line: "西武新宿線",
        station: "新宿",
      },
      {
        line: "京王線",
        station: "新宿",
      },
      {
        line: "小田急小田原線",
        station: "新宿",
      },
    ],
  },
  {
    name: "代々木",
    transfers: [
      {
        line: "中央・総武線",
        station: "代々木",
      },
      {
        line: "都営大江戸線",
        station: "代々木",
      },
    ],
  },
  {
    name: "原宿",
    transfers: [
      {
        line: "東京メトロ千代田線",
        station: "明治神宮前＜原宿＞",
      },
      {
        line: "東京メトロ副都心線",
        station: "明治神宮前＜原宿＞",
      },
    ],
  },
  {
    name: "渋谷",
    transfers: [
      {
        line: "埼京線",
        station: "渋谷",
      },
      {
        line: "湘南新宿ライン",
        station: "渋谷",
      },
      {
        line: "東京メトロ銀座線",
        station: "渋谷",
      },
      {
        line: "東京メトロ半蔵門線",
        station: "渋谷",
      },
      {
        line: "東京メトロ副都心線",
        station: "渋谷",
      },
      {
        line: "京王井の頭線",
        station: "渋谷",
      },
      {
        line: "東急東横線",
        station: "渋谷",
      },
      {
        line: "東急田園都市線",
        station: "渋谷",
      },
    ],
  },
  {
    name: "恵比寿",
    transfers: [
      {
        line: "埼京線",
        station: "恵比寿",
      },
      {
        line: "湘南新宿ライン",
        station: "恵比寿",
      },
      {
        line: "東京メトロ日比谷線",
        station: "恵比寿",
      },
    ],
  },
  {
    name: "目黒",
    transfers: [
      {
        line: "都営三田線",
        station: "目黒",
      },
      {
        line: "東京メトロ南北線",
        station: "目黒",
      },
      {
        line: "東急目黒線",
        station: "目黒線",
      },
    ],
  },
  {
    name: "五反田",
    transfers: [
      {
        line: "都営浅草線",
        station: "五反田",
      },
      {
        line: "東急池上線",
        station: "五反田",
      },
    ],
  },
  {
    name: "大崎",
    transfers: [
      {
        line: "埼京線",
        station: "大崎",
      },
      {
        line: "湘南新宿ライン",
        station: "大崎",
      },
      {
        line: "りんかい線",
        station: "大崎",
      },
    ],
  },
  {
    name: "品川",
    transfers: [
      {
        line: "東海道新幹線",
        station: "品川",
      },
      {
        line: "京浜東北線",
        station: "品川",
      },
      {
        line: "東海道線",
        station: "品川",
      },
      {
        line: "総武線・横須賀線",
        station: "品川",
      },
      {
        line: "京急本線",
        station: "品川",
      },
    ],
  },
  {
    name: "高輪ゲートウェイ",
    transfers: [
      {
        line: "京浜東北線",
        station: "高輪ゲートウェイ",
      },
    ],
  },
  {
    name: "田町",
    transfers: [
      {
        line: "京浜東北線",
        station: "田町",
      },
      {
        line: "都営浅草線",
        station: "三田",
      },
      {
        line: "都営三田線",
        station: "三田",
      },
    ],
  },
  {
    name: "浜松町",
    transfers: [
      {
        line: "京浜東北線",
        station: "浜松町",
      },
      {
        line: "都営浅草線",
        station: "大門",
      },
      {
        line: "都営大江戸線",
        station: "大門",
      },
      {
        line: "東京モノレール",
        station: "浜松町",
      },
    ],
  },
  {
    name: "新橋",
    transfers: [
      {
        line: "京浜東北線",
        station: "新橋",
      },
      {
        line: "東海道線",
        station: "新橋",
      },
      {
        line: "総武線・横須賀線",
        station: "新橋",
      },
      {
        line: "都営浅草線",
        station: "新橋",
      },
      {
        line: "東京メトロ銀座線",
        station: "新橋",
      },
      {
        line: "ゆりかもめ",
        station: "新橋",
      },
    ],
  },
  {
    name: "有楽町",
    transfers: [
      {
        line: "京浜東北線",
        station: "有楽町",
      },
      {
        line: "京葉線",
        station: "有楽町",
      },
      {
        line: "都営三田線",
        station: "日比谷",
      },
      {
        line: "東京メトロ日比谷線",
        station: "日比谷",
      },
      {
        line: "東京メトロ千代田線",
        station: "日比谷",
      },
      {
        line: "東京メトロ有楽町線",
        station: "有楽町",
      },
    ],
  },
]

export default YamanoteInfo;