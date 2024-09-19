export function getPrefName(city) {
  const pref = prefList.find(function(pref, i) {
    return pref.name === city.pref;
  })
  return pref.name;
}

export function getPrefNameKana(city) {
  const pref = prefList.find(function(pref, i) {
    return pref.name === city.pref;
  })
  return pref.kana;
}

const prefList = [
  {
    name: '北海道',
    kana: 'ほっかいどう',
  },
  {
    name: '青森県',
    kana: 'あおもりけん',
  },
  {
    name: '岩手県',
    kana: 'いわてけん',
  },
  {
    name: '宮城県',
    kana: 'みやぎけん',
  },
  {
    name: '秋田県',
    kana: 'あきたけん',
  },
  {
    name: '山形県',
    kana: 'やまがたけん',
  },
  {
    name: '福島県',
    kana: 'ふくしまけん',
  },
  {
    name: '茨城県',
    kana: 'いばらきけん',
  },
  {
    name: '栃木県',
    kana: 'とちぎけん',
  },
  {
    name: '群馬県',
    kana: 'ぐんまけん',
  },
  {
    name: '埼玉県',
    kana: 'さいたまけん',
  },
  {
    name: '千葉県',
    kana: 'ちばけん',
  },
  {
    name: '東京都',
    kana: 'とうきょうと',
  },
  {
    name: '神奈川県',
    kana: 'かながわけん',
  },
  {
    name: '新潟県',
    kana: 'にいがたけん',
  },
  {
    name: '富山県',
    kana: 'とやまけん',
  },
  {
    name: '石川県',
    kana: 'いしかわけん',
  },
  {
    name: '福井県',
    kana: 'ふくいけん',
  },
  {
    name: '山梨県',
    kana: 'やまなしけん',
  },
  {
    name: '長野県',
    kana: 'ながのけん',
  },
  {
    name: '岐阜県',
    kana: 'ぎふけん',
  },
  {
    name: '静岡県',
    kana: 'しずおかけん',
  },
  {
    name: '愛知県',
    kana: 'あいちけん',
  },
  {
    name: '三重県',
    kana: 'みえけん',
  },
  {
    name: '滋賀県',
    kana: 'しがけん',
  },
  {
    name: '京都府',
    kana: 'きょうとふ',
  },
  {
    name: '大阪府',
    kana: 'おおさかふ',
  },
  {
    name: '兵庫県',
    kana: 'ひょうごけん',
  },
  {
    name: '奈良県',
    kana: 'ならけん',
  },
  {
    name: '和歌山県',
    kana: 'わかやまけん',
  },
  {
    name: '鳥取県',
    kana: 'とっとりけん',
  },
  {
    name: '島根県',
    kana: 'しまねけん',
  },
  {
    name: '岡山県',
    kana: 'おかやまけん',
  },
  {
    name: '広島県',
    kana: 'ひろしまけん',
  },
  {
    name: '山口県',
    kana: 'やまぐちけん',
  },
  {
    name: '徳島県',
    kana: 'とくしまけん',
  },
  {
    name: '香川県',
    kana: 'かがわけん',
  },
  {
    name: '愛媛県',
    kana: 'えひめけん',
  },
  {
    name: '高知県',
    kana: 'こうちけん',
  },
  {
    name: '福岡県',
    kana: 'ふくおかけん',
  },
  {
    name: '佐賀県',
    kana: 'さがけん',
  },
  {
    name: '長崎県',
    kana: 'ながさきけん',
  },
  {
    name: '熊本県',
    kana: 'くまもとけん',
  },
  {
    name: '大分県',
    kana: 'おおいたけん',
  },
  {
    name: '宮崎県',
    kana: 'みやざきけん',
  },
  {
    name: '鹿児島県',
    kana: 'かごしまけん',
  },
  {
    name: '沖縄県',
    kana: 'おきなわけん',
  },
]

export default prefList;