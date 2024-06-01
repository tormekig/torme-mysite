import { motion } from 'framer-motion';
import './css/sasame.css';
import { Header } from './Top';

export function SasameContent() {
  return (
    <div id="sasame-content">

      <div className="intro-photo">
      <div className="intro-photo-inner">
        <motion.img
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          transition={{ ease: "easeOut", duration: 10.0 }}
          src="img\230503.jpg" />
      </div>
      </div>
      <div className="intro-profile">
      <div id="profile-content">
        <h2 id="sasame-name">
        <motion.div
          initial={{ transform: "translateX(-50%)", opacity: 0 }}
          whileInView={{ transform: "translateX(0%)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className="profile-name-main">
            ささめ
        </motion.div>
        <motion.div
          initial={{ transform: "translateX(50%)", opacity: 0 }}
          whileInView={{ transform: "translateX(0%)", opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          className="profile-name-small">
            Sasame
        </motion.div>
        </h2>
        <div className="profile-text">
        <p>
          兔子のkigurumi工坊さんからお迎えした、<br />
          オリジナルキャラクターです。
        </p>
        <p>クールで優しい子。でもたまに甘えたくなるらしい。。</p>
        </div>
        <div className="table-container">
        <table className="profile-table" id="sasame-table">
          <tbody>
            <tr>
            <th>年齢</th>
            <td>21歳</td>
            </tr>
            <tr>
            <th>誕生日</th>
            <td>1月23日</td>
            </tr>
            <tr>
            <th>お迎え記念日</th>
            <td>2022年7月23日</td>
            </tr>
            <tr>
            <th>出身</th>
            <td>雪国</td>
            </tr>
            <tr>
            <th>住処</th>
            <td>都会のアパートで一人暮らし</td>
            </tr>
            <tr>
            <th>家族</th>
            <td>一人っ子</td>
            </tr>
            <tr>
            <th>職業</th>
            <td>私立の理系大学生</td>
            </tr>
            <tr>
            <th>趣味</th>
            <td>旅行、お酒</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      </div>
    </div>
  )
}

function SasamePersonality() {
  return (
    <div>
      <Header ja={"ささめはこんな子"} en={"Personality"} />
    <div className="personality-content">
      <div className="personality-intro">
        <p>ささめは、雪国出身の21歳の理系大学生の女の子。</p>
        <p>今は都会のアパートで一人暮らしをしている。</p>
        <p>雪国育ちだけど寒さには弱いみたい。</p>
        <p>旅行が趣味で、綺麗な景色を見たり、美味しい食べ物を食べたりして、日々の疲れをリフレッシュ。</p>
        <p>最近はカフェ巡りにハマっていて、良い雰囲気のお店や美味しいメニューを見つけて、くつろぎのひと時を楽しんでいるみたい。</p>
        <p>家では料理をして、たまに凝ったものを作ったり。</p>
        <p>時にはゲームに夢中になって、気づいたら朝になってたり…</p>
        <p>夜型タイプで、朝早く起きるのが苦手。</p>
        <p>ものごとにストイックで、決めたことはとことんやり切りたいタイプ。</p>
        <p>でも普段はふわふわ動いていて、周りから見ると何を考えてるかわからない。</p>
        <p>というか何も考えてなさそう。</p>
        <p>結構マイペースで、面倒だなと思ったら「え～やるの～？」ってなったり。</p>
        <p>そんなゆる～い感じだけど、根は優しくて、面倒見のいい子です。</p>
      </div>
      <div className="table-container">
      <div id="sasame-table-head">ささめをもっと深掘り</div>
      <table className="profile-table" id="sasame-table">
        <tbody>
          <tr>
          <th>好きな食べ物</th>
          <td>パスタ、オムライス</td>
          </tr>
          <tr>
          <th>好きなお酒</th>
          <td>日本酒、果実酒、クラフトビール</td>
          </tr>
          <tr>
          <th>嫌いな食べ物</th>
          <td>パクチー</td>
          </tr>
          <tr>
          <th>苦手</th>
          <td>早起き</td>
          </tr>
          <tr>
          <th>マイブーム</th>
          <td>カフェ巡り</td>
          </tr>
          <tr>
          <th>学部学科</th>
          <td>工学部情報電子学科</td>
          </tr>
          <tr>
          <th>特技</th>
          <td>パソコン</td>
          </tr>
          <tr>
          <th>バイト</th>
          <td>家庭教師</td>
          </tr>
          <tr>
          <th>サークル</th>
          <td>書道愛好会</td>
          </tr>
        </tbody>
      </table>
      <div className="sasame-table-bottom">※マスター（とるめ）のプロフィールとは異なります。</div>
      </div>
    </div>
    </div>
  )
}

function HowToTakePictures() {
  return (
    <div>
      <Header ja={"ささめの撮影ポイント"} en={"How to Take Pictures"} />
      <div className="howtotakepictures-content">
        <div className="howtotakepictures-intro">
          <p>ささめを撮影することになった方へ</p>
          <p>もしささめを撮ることになったなら、ここを見ればバッチリです！</p>
        </div>
        <h2 className="three-tips-header">これさえおさえればバッチリ3か条</h2>
        <ol className="three-tips">
          <li>どこにでもいる<span>普通の大学生</span>です！</li>
          <li>元気系よりは<span>おとなしい系</span>です！</li>
          <li><span>目線が上がりやすい</span>ので、外していたら遠慮なく伝えてください！</li>
        </ol>
        <div className="howtotakepictures-intro-2">
          <p>この下は興味がありましたらお読みください</p>
        </div>
        <ul>
          <li className="point-tips">
            <h3>人物像</h3>
            <p>ささめは、どこにでもいる普通の大学生です。<span>理系</span>の専攻で、大学では研究に励んでいます。</p>
            <p>雪国出身の一人っ子で、都会の<span>アパートで一人暮らし</span>をしています。</p>
            <p>週末には友達と一緒に<span>カフェ</span>でおしゃべりしたり、<span>旅行</span>に出かけたりして楽しんでいます。</p>
            <p>1人の時は<span>料理</span>をしたり、時には<span>ゲーム</span>に夢中になって、気づいたら朝になってたり…</p>
          </li>
          <li className="point-tips">
            <h3>目線・顔</h3>
            <p>ささめは少し<span>あごが上がりがち</span>です。</p>
            <p>カメラ目線を決めようとしても、少しずれてしまうことがあります。</p>
            <p>せっかく撮ってもらえるならいい写真を残したいので、</p>
            <p>目線が外れているなと思ったら、遠慮なく<span>「右向いて」「あご引いて」</span>と指示してください！</p>
            <div className="point-img-container">
              <div className="point-img-content">
                <div className="point-img-inner">
                  <div className="point-img-bad"></div>
                    <div className="hover-img-container">
                      <a href="img/howtotakepictures/chin_raised.jpg" data-lightbox="point-tips" data-title="あご上がり">
                        <img src="img/howtotakepictures/chin_raised.jpg" alt="あご上がり"/>
                      </a>
                    </div>
                  </div>
                  <div className="point-img-inner">
                    <div className="point-img-good"></div>
                    <div className="hover-img-container">
                      <a href="img/howtotakepictures/chin_unraised.jpg" data-lightbox="point-tips" data-title="通常の目線">
                        <img src="img/howtotakepictures/chin_unraised.jpg" alt="通常の目線"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
                <p>あと、ささめの顔はツルツルだから、環境によっては<span>テカリ</span>が目立っちゃうかも…</p>
              <div className="point-img-container">
                <div className="point-img-content">
                  <div className="point-img-inner">
                    <div className="hover-img-container">
                      <a href="img/howtotakepictures/shining.jpg" data-lightbox="point-tips" data-title="テカってる">
                        <img src="img/howtotakepictures/shining.jpg" alt="テカってる"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="point-tips">
              <h3>身だしなみ</h3>
              <p>ここに書いてあることは、気づいたら直してもらえるとありがたいなと思ったところです！</p>
              <p><span>髪の毛</span>が引っかかっていたり…</p>
              <div className="point-img-container">
                <div className="point-img-content">
                  <div className="point-img-inner">
                    <div className="point-img-bad"></div>
                    <div className="hover-img-container">
                      <a href="img/howtotakepictures/hair_stucked.jpg" data-lightbox="point-tips" data-title="髪の毛が引っかかってる">
                        <img src="img/howtotakepictures/hair_stucked.jpg" alt="髪の毛が引っかかってる"/>
                      </a>
                  </div>
                </div>
                <div className="point-img-inner">
                  <div className="point-img-good"></div>
                    <div className="hover-img-container">
                      <a href="img/howtotakepictures/hair_unstucked.jpg" data-lightbox="point-tips" data-title="通常の髪の毛">
                        <img src="img/howtotakepictures/hair_unstucked.jpg" alt="通常の髪の毛"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <p><span>リボン</span>が隠れていたり…</p>
                <div className="point-img-container">
                  <div className="point-img-content">
                    <div className="point-img-inner">
                      <div className="point-img-bad"></div>
                      <div className="hover-img-container">
                        <a href="img/howtotakepictures/ribbon_hidden.jpg" data-lightbox="point-tips" data-title="リボン隠れてる">
                          <img src="img/howtotakepictures/ribbon_hidden.jpg" alt="リボン隠れてる"/>
                        </a>
                      </div>
                    <div className="hover-img-container">
                      <a href="img/howtotakepictures/ribbon_half_visible.jpg" data-lightbox="point-tips" data-title="リボン半分隠れてる">
                        <img src="img/howtotakepictures/ribbon_half_visible.jpg" alt="リボン半分隠れてる"/>
                      </a>
                    </div>
                  </div>
                  <div className="point-img-inner">
                    <div className="point-img-good"></div>
                      <div className="hover-img-container">
                        <a href="img/howtotakepictures/ribbon_visible.jpg" data-lightbox="point-tips" data-title="通常のリボン">
                          <img src="img/howtotakepictures/ribbon_visible.jpg" alt="通常のリボン"/>
                        </a>
                      </div>
                  </div>
                </div>
              </div>
              <p>他にも、<span>ネックレス</span>が綺麗に見えていなかったり…</p>
              <p>気づいたところがあったら遠慮なく伝えてください！</p>
            </li>
            <li className="point-tips">
              <h3>ポージング</h3>
              <p>ささめは普通の大学生で、アニメキャラでもマスコットでもありません。</p>
              <p>だから、特別なポーズを持っていません。</p>
              <p>頬や胸に<span>手を添え</span>たり、<span>ピース</span>したり、<span>ゆる～くポーズ</span>を決めます。</p>
              <div className="point-img-container">
                <div className="point-img-content">
                  <div className="point-img-inner">
                    <div className="hover-img-container">
                      <a href="img/howtotakepictures/pose_cheek.jpg" data-lightbox="point-tips" data-title="頬に手を添える">
                        <img src="img/howtotakepictures/pose_cheek.jpg" alt="頬に手を添える"/>
                      </a>
                    </div>
                    <div className="hover-img-container">
                      <a href="img/howtotakepictures/pose_peace.jpg" data-lightbox="point-tips" data-title="ピース">
                        <img src="img/howtotakepictures/pose_peace.jpg" alt="ピース"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="point-situation">
              <h3>シチュエーションの例</h3>
              <h4>旅行先の風景</h4>
              <p>旅行が大好きで、その土地の<span>ランドマーク</span>や<span>綺麗な景色</span>を背景にした写真がお気に入り。
              <br/>観光地や自然の中で記念写真を残せたら。</p>
              <div className="point-img-container situation-img-container">
                <div className="point-img-content">
                  <div className="point-img-inner">
                    <div className="hover-img-container">
                      <a href="img/231104.JPG" data-lightbox="situation-example" data-title="ラグコス">
                        <img src="img/231104.JPG" alt="ラグコス"/>
                      </a>
                    </div>
                    <div className="hover-img-container">
                      <a href="img/230910.jpg" data-lightbox="situation-example" data-title="東京タワー">
                        <img src="img/230910.jpg" alt="東京タワー"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h4>家での日常</h4>
                <p>アパートでくつろいだり、<span>ゲーム</span>で遊んだり、<span>メイク</span>したり。
                <br/>そんな普段の生活の一部を楽しく切り取れたら。</p>
                <div className="point-img-container situation-img-container">
                  <div className="point-img-content">
                    <div className="point-img-inner">
                      <div className="hover-img-container">
                        <a href="img/230504cp.jpg" data-lightbox="situation-example" data-title="kig-cp-2305">
                          <img src="img/230504cp.jpg" alt="kig-cp-2305" className="horizontal-img"/>
                        </a>
                      </div>
                      <div className="hover-img-container">
                        <a href="img/230527.jpg" data-lightbox="situation-example" data-title="アパートにて">
                          <img src="img/230527.jpg" alt="アパートにて" className="horizontal-img"/>
                        </a>
                    </div>
                  </div>
                </div>
              </div>
              <h4>仲間と一緒に</h4>
              <p>誰かと遊んだり、<span>イベント</span>に参加してる特別な時など、<span>仲間と一緒</span>にいるときには思い出を残せたら。</p>
              <div className="point-img-container situation-img-container">
                <div className="point-img-content">
                  <div className="point-img-inner">
                    <div className="hover-img-container">
                      <a href="img/230717_group.jpg" data-lightbox="situation-example" data-title="神津島集合写真">
                        <img src="img/230717_group.jpg" alt="神津島集合写真" className="horizontal-img"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h4>大学での日常</h4>
              <p><span>キャンパス</span>の風景や、<span>教室</span>で勉強中の姿など、大学生活の思い出を残せたら。</p>
              <div className="point-img-container situation-img-container">
                <div className="point-img-content">
                  <div className="point-img-inner">
                    <div className="hover-img-container">
                      <a href="img/230902cp.JPG" data-lightbox="situation-example" data-title="kig-cp-2309">
                        <img src="img/230902cp.JPG" alt="kig-cp-2309"/>
                      </a>
                    </div>
                    <div className="hover-img-container">
                      <a href="img/230701.JPG" data-lightbox="situation-example" data-title="kig-cp-2307名古屋">
                        <img src="img/230701.JPG" alt="kig-cp-2307名古屋" className="horizontal-img"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h4>季節のイベント</h4>
              <p><span>クリスマス</span>や<span>ハロウィン</span>、そして<span>誕生日</span>などのイベントでは、
                <br/>それを象徴する写真を残して、季節の変化を楽しめたら。</p>
              <div className="point-img-container situation-img-container">
                <div className="point-img-content">
                  <div className="point-img-inner">
                    <div className="hover-img-container">
                      <a href="img/221031.jpg" data-lightbox="situation-example" data-title="ハロウィーン">
                        <img src="img/221031.jpg" alt="ハロウィーン"/>
                      </a>
                    </div>
                    <div className="hover-img-container">
                      <a href="img/231225.jpg" data-lightbox="situation-example" data-title="クリスマス">
                        <img src="img/231225.jpg" alt="クリスマス"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            <h4>その他</h4>
            <p>それ以外にも、電車やバー、和室、ゴシック風、路地、プールなど、どこでも似合うと思います！
              <br/>撮りたいイメージがあれば、遠慮なく伝えてください！</p>
            <div className="point-img-container situation-img-container">
              <div className="point-img-content">
                <div className="point-img-inner">
                  <div className="hover-img-container">
                    <a href="img/230502cp_train.jpg" data-lightbox="situation-example" data-title="電車">
                      <img src="img/230502cp_train.jpg" alt="電車"/>
                    </a>
                  </div>
                  <div className="hover-img-container">
                    <a href="img/230730.jpg" data-lightbox="situation-example" data-title="プール">
                      <img src="img/230730.jpg" alt="プール"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

function Memories() {

  const data = [
    {
      className: "kozushima-2307",
      textmain: "神津島",
      textsub: "旅行",
      triptime: "2023/7/15～17",
      triplocation: "東京都神津島村",
      imgs: [
        "img/230717.jpg",

        "img/230724.jpg",
        "img/230727.jpg"
      ]
    },
    {
      className: "inage-2306",
      textmain: "稲毛海岸",
      textsub: "ロケ撮影",
      triptime: "2023/6/10",
      triplocation: "千葉県千葉市",
      imgs: [
        "img/230613.jpg",
        "img/230801.jpg",
        "img/230613.jpg",
        "img/230801.jpg",
      ]
    },
  ]

  function Memory({data}) {
    return (
      <div className={`trip-content ` + data.className}>
        <div className="trip-content-inner">
          <div className="trip-header">
            <div className="trip-header-top">
              <div className="trip-header-text-main">{data.textmain}</div>
              <div className="trip-header-text-sub">{data.textsub}</div>
            </div>
            <div className="trip-header-bottom">
              <div>{data.triptime}</div>
              <div>{data.triplocation}</div>
            </div>
          </div>
          <div className="trip-main">
            <div className="trip-main-img-container">
              <ul className="slider gallery">
                {data.imgs.map((img, i) => {
                  return (
                    <li className="hover-img-container" key={i}>
                      <a href={img} data-lightbox={data.className} data-title="キャプション">
                        <img src={img} alt=""/>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header ja={"思い出"} en={"Memories"} />
      {data.map((d, i) => {
        return <Memory data={d} key={i}/>
      })}
    </div>
  )
}

export function Sasame() {
  return (
    <div>
      <div id="splash">
      <div id="splash-logo">Sasame</div>
      </div>
      <div className="splashbg"></div>
      <div id="container">

      <SasameContent/>
      <SasamePersonality/>
      <HowToTakePictures/>
      <Memories/>

      <footer id="footer-container">
        <div className="footer">
        <small>copyright 2023 torme_kig All rights reserved.</small>
        </div>
      </footer>
      </div>
      <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossOrigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.10.0/js/lightbox.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
      {/* <script>
      const param = {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 6900,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        cssEase: 'linear',
        slidesToShow: 2.5,
        slidesToScroll: 1,
        responsive: [
        {
          breakpoint: 769,
          settings: {
          slidesToShow: 2,
          }
        },
        {
          breakpoint: 426,
          settings: {
          slidesToShow: 1.5,
          }
        }
        ]
      }

      $('.slider').each((i, e) => {
        $(e).slick(param);
      })
      </script> */}
      <script src="splash.js"></script>
    </div>
  )
}