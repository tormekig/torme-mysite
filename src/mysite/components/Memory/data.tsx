import sasame from '../../assets/css/sasame.module.scss'
import { ImgMetaData } from '../imgModal'

export type Character = 'emu' | 'sasame'

export interface MemoryInfo {
  className: string
  textmain: string
  textsub: string
  triptime: string
  tags: string[]
  imgs: ImgMetaData[]
  characters: Character[]
}

export const data: MemoryInfo[] = [
  {
    className: sasame.orange,
    textmain: 'ひだコス',
    textsub: 'イベント',
    triptime: '2024/10',
    tags: ['飛騨高山'],
    imgs: [
      {
        src: 'img/memory/2410ひだコス/20241027144716_1199@aoi_sailor.jpg',
        alt: 'Photo: @aoi_sailor',
      },
      {
        src: 'img/memory/2410ひだコス/20241027150852_1258@aoi_sailor.jpg',
        alt: 'Photo: @aoi_sailor',
      },
      {
        src: 'img/memory/2410ひだコス/20241027151323_1278@aoi_sailor.jpg',
        alt: 'Photo: @aoi_sailor',
      },
      {
        src: 'img/memory/2410ひだコス/IMG_2877.JPG',
        alt: 'Photo: @midori_aomino',
      },
      {
        src: 'img/memory/2410ひだコス/IMG_2880-2.jpg',
        alt: 'Photo: @midori_aomino',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.purple,
    textmain: 'さる小',
    textsub: 'オフ',
    triptime: '2024/9',
    tags: ['猿ヶ京温泉'],
    imgs: [
      {
        src: 'img/memory/2409さる小/IMG_6605.jpg',
        alt: 'Photo: @SHIINA_kig',
      },
      {
        src: 'img/memory/2409さる小/IMG_6608.jpg',
        alt: 'Photo: @SHIINA_kig',
      },
      {
        src: 'img/memory/2409さる小/IMG_6686.jpg',
        alt: 'Photo: @SHIINA_kig',
      },
      {
        src: 'img/memory/2409さる小/IMG_6717.jpg',
        alt: 'Photo: @SHIINA_kig',
      },
    ],
    characters: ['emu', 'sasame'],
  },
  {
    className: sasame.green,
    textmain: '誕生日会',
    textsub: 'オフ',
    triptime: '2024/9',
    tags: ['Birthday'],
    imgs: [
      {
        src: 'img/memory/2409誕生日/240831_Developed_Aisu_4753.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2409誕生日/240831_Developed_Aisu_4761.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2409誕生日/240831_Developed_Aisu_4839.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2409誕生日/240831_Developed_Aisu_-4892.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
    ],
    characters: ['emu', 'sasame'],
  },
  {
    className: sasame.lightgreen,
    textmain: 'コスサミ',
    textsub: 'イベント',
    triptime: '2024/8',
    tags: ['名古屋'],
    imgs: [
      {
        src: 'img/memory/2408コスサミ/240803_developed_Aisu_4237.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2408コスサミ/240803_developed_Aisu_4249.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2408コスサミ/240803_Developed_Aisu_4264.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2408コスサミ/240803_Developed_Aisu_4301.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2408コスサミ/240803_Developed_Aisu_4351.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2408コスサミ/240803_Developed_Aisu_4426.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2408コスサミ/240803_Developed_Aisu_4489.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.orange,
    textmain: 'ワンフェス',
    textsub: 'イベント',
    triptime: '2024/7',
    tags: ['幕張メッセ'],
    imgs: [
      {
        src: 'img/memory/2407ワンフェス/IMG_0519.jpg',
        alt: 'Photo: @',
      },
      {
        src: 'img/memory/2407ワンフェス/IMG_0521.jpg',
        alt: 'Photo: @',
      },
      {
        src: 'img/memory/2407ワンフェス/IMG_0522.jpg',
        alt: 'Photo: @',
      },
      {
        src: 'img/memory/2407ワンフェス/IMG_0528.jpg',
        alt: 'Photo: @',
      },
    ],
    characters: ['emu'],
  },
  {
    className: sasame.blue,
    textmain: '貸別荘オフ',
    textsub: 'オフ',
    triptime: '2024/7',
    tags: ['沼津'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.lightblue,
    textmain: 'ラグコス',
    textsub: 'イベント',
    triptime: '2024/6',
    tags: ['ラグーナテンボス'],
    imgs: [
      {
        src: 'img/memory/2406ラグコス/240629_developed_Aisu_3211.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2406ラグコス/240629_developed_Aisu_3231.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2406ラグコス/20240629_1355.JPG',
        alt: 'Photo: @kamui_kig',
      },
      {
        src: 'img/memory/2406ラグコス/FJA1210.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2406ラグコス/FJA1399-01.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2406ラグコス/FJA1503-01.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2406ラグコス/FJA1659.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2406ラグコス/IMG_0748.jpeg',
        alt: 'Photo: @teriyaki_kig',
      },
    ],
    characters: ['emu'],
  },
  {
    className: sasame.green,
    textmain: `きぐパ`,
    textsub: 'イベント',
    triptime: '2024/5',
    tags: ['お台場', 'きぐるみパーティ！'],
    imgs: [
      {
        src: 'img/memory/2405きぐぱ/IMG_7607-2.jpg',
      },
      {
        src: 'img/memory/2405きぐぱ/IMG_7684.jpg',
      },
      {
        src: 'img/memory/2405きぐぱ/P5260031-NR240526.jpg',
        alt: 'Photo: @kaya',
      },
      {
        src: 'img/memory/2405きぐぱ/P5260061-R240526.jpg',
        alt: 'Photo: @kaya',
      },
    ],
    characters: ['emu'],
  },
  {
    className: sasame.red,
    textmain: '伊豆',
    textsub: 'ロケ撮影',
    triptime: '2024/5',
    tags: ['バガテル公園'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.blue,
    textmain: '撮影会',
    textsub: 'スタジオ撮影',
    triptime: '2024/5',
    tags: ['神奈川県横浜市'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.purple,
    textmain: 'バニーバー',
    textsub: 'イベント',
    triptime: '2024/4',
    tags: ['TOKYOバニーガール'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.pink,
    textmain: '桜',
    textsub: 'イベント',
    triptime: '2024/4',
    tags: ['水沼'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.purple,
    textmain: '仮染街',
    textsub: 'イベント',
    triptime: '2024/3',
    tags: ['寄居'],
    imgs: [
      {
        src: 'img/memory/2403仮染街/240324_Developed_Aisu_2214.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2403仮染街/240324_Developed_Aisu_2240.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2403仮染街/240324_Developed_Aisu_2345.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2403仮染街/240324_Developed_Aisu_2359.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2403仮染街/240324_Developed_Aisu_2417.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
    ],
    characters: ['emu'],
  },
  {
    className: sasame.pink,
    textmain: 'お迎え撮影',
    textsub: 'スタジオ撮影',
    triptime: '2024/3',
    tags: ['Sweet Studio'],
    imgs: [
      {
        src: 'img/memory/2403お迎え撮影/EmuTable.JPG',
        alt: 'Photo: @matsu_kig',
      },
      {
        src: 'img/memory/2403お迎え撮影/Emu240424.JPG',
        alt: 'Photo: @matsu_kig',
      },
      {
        src: 'img/memory/2403お迎え撮影/SweetStudio303.JPG',
        alt: 'Photo: @matsu_kig',
      },
      {
        src: 'img/memory/2403お迎え撮影/SweetStudio249.JPG',
        alt: 'Photo: @matsu_kig',
      },
      {
        src: 'img/memory/2403お迎え撮影/SweetStudio161.JPG',
        alt: 'Photo: @matsu_kig',
      },
      {
        src: 'img/memory/2403お迎え撮影/SweetStudio310.JPG',
        alt: 'Photo: @matsu_kig',
      },
      {
        src: 'img/memory/2403お迎え撮影/SweetStudio187.JPG',
        alt: 'Photo: @matsu_kig',
      },
    ],
    characters: ['emu'],
  },
  {
    className: sasame.orange,
    textmain: '蘇我',
    textsub: 'イベント',
    triptime: '2024/3',
    tags: ['蘇我'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.lightblue,
    textmain: 'ラグコス',
    textsub: 'イベント',
    triptime: '2024/2',
    tags: ['ラグーナテンボス'],
    imgs: [
      {
        src: 'img/memory/2402ラグコス/240224_Developed_Aisu_.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2402ラグコス/240224_Developed_Aisu_1720.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2402ラグコス/240224_Developed_Aisu_1751.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2402ラグコス/240224_Developed_Aisu_1798.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2402ラグコス/240224_Developed_Aisu_1884.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
    ],
    characters: ['emu'],
  },
  {
    className: sasame.orange,
    textmain: 'ワンフェス',
    textsub: 'イベント',
    triptime: '2024/2',
    tags: ['幕張メッセ'],
    imgs: [
      {
        src: 'img/memory/2402ワンフェス/P2110022.jpg',
        alt: 'Photo: @Neji',
      },
      {
        src: 'img/memory/2402ワンフェス/240211-yina-1.jpg',
        alt: 'Photo: @yina',
      },
      {
        src: 'img/memory/2402ワンフェス/20240211122202_1312@aoi_sailor.jpg',
        alt: 'Photo: @aoi_sailor',
      },
      {
        src: 'img/memory/2402ワンフェス/_W8A2055.JPG',
        alt: 'Photo: @kuon',
      },
    ],
    characters: ['emu'],
  },
  {
    className: sasame.blue,
    textmain: '4696',
    textsub: 'スタジオ撮影',
    triptime: '2024/2',
    tags: ['目黒'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.orange,
    textmain: '体育館オフ',
    textsub: 'オフ',
    triptime: '2024/1',
    tags: ['東京都港区'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.red,
    textmain: '名古屋オフ',
    textsub: 'オフ',
    triptime: '2023/12',
    tags: ['名古屋'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.lightblue,
    textmain: 'ラグコス',
    textsub: 'イベント',
    triptime: '2023/11',
    tags: ['ラグーナテンボス'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.purple,
    textmain: 'バニーバー',
    textsub: 'イベント',
    triptime: '2023/10',
    tags: ['TOKYOバニーガール'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.red,
    textmain: '東京タワー',
    textsub: 'イベント',
    triptime: '2023/9',
    tags: ['COSSAN'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.orange,
    textmain: 'kig-cp',
    textsub: 'イベント',
    triptime: '2023/9',
    tags: ['東京都江東区'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.lightblue,
    textmain: '例のプール',
    textsub: 'オフ',
    triptime: '2023/7',
    tags: ['新宿'],
    imgs: [],
    characters: ['sasame'],
  },
  {
    className: sasame.blue,
    textmain: '神津島',
    textsub: '旅行',
    triptime: '2023/7',
    tags: ['東京都神津島村'],
    imgs: [
      { src: 'img/230717.jpg', alt: '' },
      { src: 'img/230724.jpg', alt: '' },
      { src: 'img/230727.jpg', alt: '' },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.lightblue,
    textmain: '稲毛海岸',
    textsub: 'ロケ撮影',
    triptime: '2023/6',
    tags: ['千葉県千葉市'],
    imgs: [
      { src: 'img/230613.jpg', alt: '' },
      { src: 'img/230801.jpg', alt: '' },
      { src: 'img/230613.jpg', alt: '' },
      { src: 'img/230801.jpg', alt: '' },
    ],
    characters: ['sasame'],
  },
]
