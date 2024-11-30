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
    characters: ['emu'],
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
        alt: 'Photo: @ichigo_832',
      },
      {
        src: 'img/memory/2407ワンフェス/IMG_0521.jpg',
        alt: 'Photo: @ichigo_832',
      },
      {
        src: 'img/memory/2407ワンフェス/IMG_0522.jpg',
        alt: 'Photo: @ichigo_832',
      },
      {
        src: 'img/memory/2407ワンフェス/IMG_0528.jpg',
        alt: 'Photo: @ichigo_832',
      },
    ],
    characters: ['emu'],
  },
  // {
  //   className: sasame.blue,
  //   textmain: '貸別荘オフ',
  //   textsub: 'オフ',
  //   triptime: '2024/7',
  //   tags: ['沼津'],
  //   imgs: [],
  //   characters: ['sasame'],
  // },
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
        alt: 'Photo: @Kaya868469',
      },
      {
        src: 'img/memory/2405きぐぱ/P5260061-R240526.jpg',
        alt: 'Photo: @Kaya868469',
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
    imgs: [
      {
        src: 'img/memory/2405バガテル公園/IMG_0530.jpg',
        alt: 'Photo: @tukihana49A',
      },
      {
        src: 'img/memory/2405バガテル公園/GMzOJ0HbkAAFSy9.jpg',
        alt: 'Photo: @tukihana49A',
      },
      {
        src: 'img/memory/2405バガテル公園/_5052268.JPG',
        alt: 'Photo: @miku_dx7',
      },
      {
        src: 'img/memory/2405バガテル公園/IMG_0544.jpeg',
        alt: 'Photo: @tukihana49A',
      },
      {
        src: 'img/memory/2405バガテル公園/IMG_0662.jpeg',
        alt: 'Photo: @tukihana49A',
      },
      {
        src: 'img/memory/2405バガテル公園/IMG_0713.jpeg',
        alt: 'Photo: @tukihana49A',
      },
      {
        src: 'img/memory/2405バガテル公園/IMG_0593.jpeg',
        alt: 'Photo: @tukihana49A',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.blue,
    textmain: '撮影会',
    textsub: 'スタジオ撮影',
    triptime: '2024/5',
    tags: ['神奈川県横浜市'],
    imgs: [
      {
        src: 'img/memory/2405横浜スタジオ/20240502160400_8722@aoi_sailor.jpg',
        alt: 'Photo: @aoi_sailor',
      },
      {
        src: 'img/memory/2405横浜スタジオ/20240502160029_8700@aoi_sailor.jpg',
        alt: 'Photo: @aoi_sailor',
      },
      {
        src: 'img/memory/2405横浜スタジオ/20240502161607_8783@aoi_sailor.jpg',
        alt: 'Photo: @aoi_sailor',
      },
      {
        src: 'img/memory/2405横浜スタジオ/IMG_7588.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2405横浜スタジオ/IMG_7370.JPG',
      },
      {
        src: 'img/memory/2405横浜スタジオ/IMG_7356-2.jpg',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.purple,
    textmain: 'バニーバー',
    textsub: 'イベント',
    triptime: '2024/4',
    tags: ['TOKYOバニーガール'],
    imgs: [
      {
        src: 'img/memory/2404バニーバー/20240414_Dee-22.jpg',
        alt: 'Photo: @Dee_kig',
      },
      {
        src: 'img/memory/2404バニーバー/P1450078-2.jpg',
        alt: 'Photo: @neji1022_kig',
      },
      {
        src: 'img/memory/2404バニーバー/P1450087-2.jpg',
        alt: 'Photo: @neji1022_kig',
      },
      {
        src: 'img/memory/2404バニーバー/13C86D3F-9346-46A1-BC5D-A6293621AFAF2024-04-14_14-49-09_000.jpeg',
        alt: 'Photo: @Tya_KigNGT',
      },
      {
        src: 'img/memory/2404バニーバー/65D2BFFB-4AC4-47F6-B52E-CDBDD9117CDF2024-04-14_16-45-12_000.jpeg',
        alt: 'Photo: @Tya_KigNGT',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.pink,
    textmain: '桜',
    textsub: 'イベント',
    triptime: '2024/4',
    tags: ['コスプラ水沼さくら'],
    imgs: [
      {
        src: 'img/memory/2404桜/IMG_6540.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2404桜/IMG_6541.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2404桜/IMG_6542.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2404桜/IMG_6543.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2404桜/IMG_6544.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2404桜/IMG_6546.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2404桜/IMG_6539.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2404桜/20240406-DSC_0667.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
    ],
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
    tags: ['蘇我FW'],
    imgs: [
      {
        src: 'img/memory/2403蘇我/WAKU-P3170088.jpg',
        alt: 'Photo: @waku_p_',
      },
      {
        src: 'img/memory/2403蘇我/WAKU-1016413.jpg',
        alt: 'Photo: @waku_p_',
      },
      {
        src: 'img/memory/2403蘇我/WAKU-P3170082.jpg',
        alt: 'Photo: @waku_p_',
      },
      {
        src: 'img/memory/2403蘇我/y_370.jpg',
        alt: 'Photo: @yamazakiMM',
      },
      {
        src: 'img/memory/2403蘇我/IMG_3244.JPG',
      },
      {
        src: 'img/memory/2403蘇我/IMG_3178.JPG',
      },
      {
        src: 'img/memory/2403蘇我/P3171517.JPG',
        alt: 'Photo: @kigurudeeee',
      },
    ],
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
        alt: 'Photo: @neji1022_kig',
      },
      {
        src: 'img/memory/2402ワンフェス/240211-yina-1.jpg',
        alt: 'Photo: @yina_kig',
      },
      {
        src: 'img/memory/2402ワンフェス/20240211122202_1312@aoi_sailor.jpg',
        alt: 'Photo: @aoi_sailor',
      },
      {
        src: 'img/memory/2402ワンフェス/_W8A2055.JPG',
        alt: 'Photo: @Kuon_kig',
      },
    ],
    characters: ['emu'],
  },
  {
    className: sasame.blue,
    textmain: '4696',
    textsub: 'スタジオ撮影',
    triptime: '2024/2',
    tags: ['中目黒'],
    imgs: [
      {
        src: 'img/memory/2402_4696/7608.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2402_4696/7636.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2402_4696/7672.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2402_4696/7725.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2402_4696/7673.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2402_4696/7846.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.orange,
    textmain: '体育館オフ',
    textsub: 'オフ',
    triptime: '2024/1',
    tags: ['着ぐるみさん体育館撮影会'],
    imgs: [
      {
        src: 'img/memory/2401体育館/DSC_2843.JPG',
        alt: 'Photo: @GUNHED507',
      },
      {
        src: 'img/memory/2401体育館/P1143561.JPG',
        alt: 'Photo: @kar_1356',
      },
      {
        src: 'img/memory/2401体育館/20240114_Goro_gym_7042.PNG',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2401体育館/P1142646.jpg',
        alt: 'Photo: @yuinakigkig',
      },
      {
        src: 'img/memory/2401体育館/P1142667.jpg',
        alt: 'Photo: @yuinakigkig',
      },
      {
        src: 'img/memory/2401体育館/P1142732.jpg',
        alt: 'Photo: @yuinakigkig',
      },
      {
        src: 'img/memory/2401体育館/P1142747.jpg',
        alt: 'Photo: @yuinakigkig',
      },
      {
        src: 'img/memory/2401体育館/P1142802.jpg',
        alt: 'Photo: @yuinakigkig',
      },
      {
        src: 'img/memory/2401体育館/P1142808.jpg',
        alt: 'Photo: @yuinakigkig',
      },
    ],
    characters: ['sasame'],
  },
  // {
  //   className: sasame.red,
  //   textmain: '名古屋オフ',
  //   textsub: 'オフ',
  //   triptime: '2023/12',
  //   tags: ['名古屋'],
  //   imgs: [],
  //   characters: ['sasame'],
  // },
  {
    className: sasame.lightblue,
    textmain: 'ラグコス',
    textsub: 'イベント',
    triptime: '2023/11',
    tags: ['ラグーナテンボス'],
    imgs: [
      {
        src: 'img/memory/2311ラグコス/231104_Lagcos_Aisu_0046-4.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2311ラグコス/231104_Lagcos_Aisu_0070.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2311ラグコス/231104_Lagcos_Aisu_0186.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2311ラグコス/231104_Lagcos_Aisu_9939.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2311ラグコス/231104_Lagcos_Aisu_9965.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
      {
        src: 'img/memory/2311ラグコス/231104_Lagcos_Aisu_9982.JPG',
        alt: 'Photo: @AisuTokimekiES',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.purple,
    textmain: 'バニーバー',
    textsub: 'イベント',
    triptime: '2023/10',
    tags: ['TOKYOバニーガール'],
    imgs: [
      {
        src: 'img/memory/2310バニーバー/_A661714.JPG',
        alt: 'Photo: @takayamagoimpa1',
      },
      {
        src: 'img/memory/2310バニーバー/_A661754.JPG',
        alt: 'Photo: @takayamagoimpa1',
      },
      {
        src: 'img/memory/2310バニーバー/IMG_0024.jpg',
        alt: 'Photo: @gerorine',
      },
      {
        src: 'img/memory/2310バニーバー/IMG_0078.jpg',
        alt: 'Photo: @gerorine',
      },
      {
        src: 'img/memory/2310バニーバー/IMG_0136.jpg',
        alt: 'Photo: @gerorine',
      },
      {
        src: 'img/memory/2310バニーバー/IMG_0149.jpg',
        alt: 'Photo: @gerorine',
      },
      {
        src: 'img/memory/2310バニーバー/pic-38.jpg',
        alt: 'Photo: @neji1022_kig',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.red,
    textmain: '東京タワー',
    textsub: 'イベント',
    triptime: '2023/9',
    tags: ['COSSAN'],
    imgs: [
      {
        src: 'img/memory/2309東京タワー/_DSF3263.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2309東京タワー/pic-2.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2309東京タワー/pic-3.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2309東京タワー/pic-4.JPG',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2309東京タワー/pic-5.JPG',
        alt: 'Photo: @OmbaToh2019',
      },
      {
        src: 'img/memory/2309東京タワー/_DSF4134-強化-NR.jpg',
        alt: 'Photo: @OmbaToh2019',
      },
    ],
    characters: ['sasame'],
  },
  // {
  //   className: sasame.orange,
  //   textmain: 'kig-cp',
  //   textsub: 'イベント',
  //   triptime: '2023/9',
  //   tags: ['東京都江東区'],
  //   imgs: [],
  //   characters: ['sasame'],
  // },
  {
    className: sasame.lightblue,
    textmain: '例のプール',
    textsub: 'オフ',
    triptime: '2023/7',
    tags: ['例のオフVol.2'],
    imgs: [
      {
        src: 'img/memory/2307例のプール/20230730_185935.jpg',
        alt: 'Photo: @cat_makina',
      },
      {
        src: 'img/memory/2307例のプール/IMG_0754.jpg',
        alt: 'Photo: @gerorine',
      },
      {
        src: 'img/memory/2307例のプール/IMG_0446(1).jpg',
        alt: 'Photo: @gerorine',
      },
      {
        src: 'img/memory/2307例のプール/IMG_0440.jpg',
        alt: 'Photo: @gerorine',
      },
      {
        src: 'img/memory/2307例のプール/DSC_1061.jpg',
        alt: 'Photo: @kotokotorra_kig',
      },
      {
        src: 'img/memory/2307例のプール/DSC_1073(1).jpg',
        alt: 'Photo: @kotokotorra_kig',
      },
      {
        src: 'img/memory/2307例のプール/DSC_5093.jpg',
        alt: 'Photo: @kotokotorra_kig',
      },
      {
        src: 'img/memory/2307例のプール/DSC_5117.jpg',
        alt: 'Photo: @kotokotorra_kig',
      },
      {
        src: 'img/memory/2307例のプール/DSC_0055.JPG',
        alt: 'Photo: @GUNHED507',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.blue,
    textmain: '神津島',
    textsub: '旅行',
    triptime: '2023/7',
    tags: ['神津島'],
    imgs: [
      {
        src: 'img/memory/2307神津島/IMG_2511.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2307神津島/P7160149(1).jpg',
        alt: 'Photo: @miku_dx7',
      },
      {
        src: 'img/memory/2307神津島/P7160263.JPG',
        alt: 'Photo: @miku_dx7',
      },
      {
        src: 'img/memory/2307神津島/P7160166.JPG',
        alt: 'Photo: @miku_dx7',
      },
      {
        src: 'img/memory/2307神津島/7AF7EBD1-FA9E-4AB2-B1CC-46A197BC549A.jpeg',
        alt: 'Photo: @yukiyado89',
      },
      {
        src: 'img/memory/2307神津島/F8315FB9-E2F5-4AB9-A7EF-362DAD53C2D3.jpeg',
        alt: 'Photo: @yukiyado89',
      },
      {
        src: 'img/memory/2307神津島/ckhyvt.jpg',
        alt: 'Photo: @yukiyado89',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.orange,
    textmain: '稲毛',
    textsub: 'ロケ撮影',
    triptime: '2023/6',
    tags: ['稲毛海浜公園'],
    imgs: [
      { src: 'img/memory/2306稲毛海岸/IMG_0009(1).jpg' },
      { src: 'img/memory/2306稲毛海岸/IMG_0069(1).jpg' },
      { src: 'img/memory/2306稲毛海岸/IMG_0089(1).jpg' },
      { src: 'img/memory/2306稲毛海岸/IMG_0100(1).jpg' },
      { src: 'img/memory/2306稲毛海岸/IMG_0232(1).jpg' },
      {
        src: 'img/memory/2306稲毛海岸/IMG_1397.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2306稲毛海岸/IMG_1413.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2306稲毛海岸/IMG_1438.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2306稲毛海岸/IMG_1457.JPG',
        alt: 'Photo: @kigurudeeee',
      },
      {
        src: 'img/memory/2306稲毛海岸/IMG_1478.JPG',
        alt: 'Photo: @kigurudeeee',
      },
    ],
    characters: ['sasame'],
  },
  {
    className: sasame.lightblue,
    textmain: 'お迎え撮影',
    textsub: '撮影',
    triptime: '2022/7',
    tags: ['小樽'],
    imgs: [
      {
        src: 'img/memory/2207お迎え撮影/DSC00355.JPG',
        alt: 'Photo: @te58903394',
      },
      {
        src: 'img/memory/2207お迎え撮影/DSC00031.JPG',
        alt: 'Photo: @te58903394',
      },
      {
        src: 'img/memory/2207お迎え撮影/DSC00035.JPG',
        alt: 'Photo: @te58903394',
      },
      {
        src: 'img/memory/2207お迎え撮影/DSC00065.JPG',
        alt: 'Photo: @te58903394',
      },
      {
        src: 'img/memory/2207お迎え撮影/DSC00147.JPG',
        alt: 'Photo: @te58903394',
      },
      {
        src: 'img/memory/2207お迎え撮影/_DSC1181.JPG',
        alt: 'Photo: @te58903394',
      },
      {
        src: 'img/memory/2207お迎え撮影/_DSC1167.JPG',
        alt: 'Photo: @te58903394',
      },
    ],
    characters: ['sasame'],
  },
]
