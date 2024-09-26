import React from 'react';

import { Header } from 'mysite/components/Header';

import sasame from '../../css/sasame.module.scss';

export function HowToTakePictures() {

    interface ImgInfo {
      src: string;
      alt: string;
      horizontal?: boolean;
    }
  
    function Img({type, group, imgs}: {type?: string, group: string, imgs: ImgInfo[]}) {
      const mark = type ? (<div className={type}></div>) : ""
      return (
        <div className={sasame.pointImgInner}>
          {mark}
          {imgs.map((img, i) => {
            const horizontalClass = img.horizontal ? sasame.horizontalImg : ""
            return (
              <div className={sasame.hoverImgContainer} key={i}>
                <a href={img.src} data-lightbox={group} data-title={img.alt}>
                  <img src={img.src} alt={img.alt} className={horizontalClass} />
                </a>
              </div>
            )
          })}
        </div>
      )
    }
  
    return (
      <div>
        <Header ja={"ささめの撮影ポイント"} en={"How to Take Pictures"} />
        <div className={sasame.howtotakepicturesContent}>
          <div className={sasame.howtotakepicturesIntro}>
            <p>ささめを撮影することになった方へ</p>
            <p>もしささめを撮ることになったなら、ここを見ればバッチリです！</p>
          </div>
          <h2 className={sasame.threeTipsHeader}>これさえおさえればバッチリ3か条</h2>
          <ol className={sasame.threeTips}>
            <li>どこにでもいる<span>普通の大学生</span>です！</li>
            <li>元気系よりは<span>おとなしい系</span>です！</li>
            <li><span>目線が上がりやすい</span>ので、外していたら遠慮なく伝えてください！</li>
          </ol>
          <div className={sasame.howtotakepicturesIntro2}>
            <p>この下は興味がありましたらお読みください</p>
          </div>
          <ul>
            <li className={sasame.pointTips}>
              <h3>人物像</h3>
              <p>ささめは、どこにでもいる普通の大学生です。<span>理系</span>の専攻で、大学では研究に励んでいます。</p>
              <p>雪国出身の一人っ子で、都会の<span>アパートで一人暮らし</span>をしています。</p>
              <p>週末には友達と一緒に<span>カフェ</span>でおしゃべりしたり、<span>旅行</span>に出かけたりして楽しんでいます。</p>
              <p>1人の時は<span>料理</span>をしたり、時には<span>ゲーム</span>に夢中になって、気づいたら朝になってたり…</p>
            </li>
            <li className={sasame.pointTips}>
              <h3>目線・顔</h3>
              <p>ささめは少し<span>あごが上がりがち</span>です。</p>
              <p>カメラ目線を決めようとしても、少しずれてしまうことがあります。</p>
              <p>せっかく撮ってもらえるならいい写真を残したいので、</p>
              <p>目線が外れているなと思ったら、遠慮なく<span>「右向いて」「あご引いて」</span>と指示してください！</p>
              <div className={sasame.pointImgContainer}>
                <div className={sasame.pointImgContent}>
                  <Img type={sasame.pointImgBad} group={"pointTips"} imgs={[{src: "img/howtotakepictures/chin_raised.jpg", alt: "あご上がり"}]}/>
                  <Img type={sasame.pointImgGood} group={"pointTips"} imgs={[{src: "img/howtotakepictures/chin_unraised.jpg", alt: "通常の目線"}]}/>
                </div>
              </div>
              <p>あと、ささめの顔はツルツルだから、環境によっては<span>テカリ</span>が目立っちゃうかも…</p>
              <div className={sasame.pointImgContainer}>
                <div className={sasame.pointImgContent}>
                  <Img type={sasame.pointImgBad} group={"pointTips"} imgs={[{src: "img/howtotakepictures/shining.jpg", alt: "テカってる"}]}/>
                </div>
              </div>
              </li>
              <li className={sasame.pointTips}>
                <h3>身だしなみ</h3>
                <p>ここに書いてあることは、気づいたら直してもらえるとありがたいなと思ったところです！</p>
                <p><span>髪の毛</span>が引っかかっていたり…</p>
                <div className={sasame.pointImgContainer}>
                  <div className={sasame.pointImgContent}>
                  <Img type={sasame.pointImgBad} group={"pointTips"} imgs={[{src: "img/howtotakepictures/hair_stucked.jpg", alt: "髪の毛が引っかかってる"}]}/>
                  <Img type={sasame.pointImgGood} group={"pointTips"} imgs={[{src: "img/howtotakepictures/hair_unstucked.jpg", alt: "通常の髪の毛"}]}/>
                  </div>
                </div>
                <p><span>リボン</span>が隠れていたり…</p>
                  <div className={sasame.pointImgContainer}>
                    <div className={sasame.pointImgContent}>
                      <Img
                        type={sasame.pointImgBad}
                        group={"pointTips"}
                        imgs={[
                          {src: "img/howtotakepictures/ribbon_hidden.jpg", alt: "リボン隠れてる"},
                          {src: "img/howtotakepictures/ribbon_half_visible.jpg", alt: "リボン半分隠れてる"},
                        ]}
                      />
                      <Img type={sasame.pointImgGood} group={"pointTips"} imgs={[{src: "img/howtotakepictures/ribbon_visible.jpg", alt: "通常のリボン"}]}/>
                  </div>
                </div>
                <p>他にも、<span>ネックレス</span>が綺麗に見えていなかったり…</p>
                <p>気づいたところがあったら遠慮なく伝えてください！</p>
              </li>
              <li className={sasame.pointTips}>
                <h3>ポージング</h3>
                <p>ささめは普通の大学生で、アニメキャラでもマスコットでもありません。</p>
                <p>だから、特別なポーズを持っていません。</p>
                <p>頬や胸に<span>手を添え</span>たり、<span>ピース</span>したり、<span>ゆる～くポーズ</span>を決めます。</p>
                <div className={sasame.pointImgContainer}>
                  <div className={sasame.pointImgContent}>
                    <Img
                      type={sasame.pointImgBad}
                      group={"pointTips"}
                      imgs={[
                        {src: "img/howtotakepictures/pose_cheek.jpg", alt: "頬に手を添える"},
                        {src: "img/howtotakepictures/pose_peace.jpg", alt: "ピース"},
                      ]}
                    />
                  </div>
                </div>
              </li>
              <li className="point-situation">
                <h3>シチュエーションの例</h3>
                <h4>旅行先の風景</h4>
                <p>旅行が大好きで、その土地の<span>ランドマーク</span>や<span>綺麗な景色</span>を背景にした写真がお気に入り。
                <br/>観光地や自然の中で記念写真を残せたら。</p>
                <div className={`${sasame.pointImgContainer} ${sasame.situationImgContainer}`}>
                  <div className={sasame.pointImgContent}>
                    <Img
                      group={"situation-example"}
                      imgs={[
                        {src: "img/231104.JPG", alt: "ラグコス"},
                        {src: "img/230910.jpg", alt: "東京タワー"},
                      ]}
                    />
                  </div>
                </div>
                <h4>家での日常</h4>
                  <p>アパートでくつろいだり、<span>ゲーム</span>で遊んだり、<span>メイク</span>したり。
                  <br/>そんな普段の生活の一部を楽しく切り取れたら。</p>
                <div className={`${sasame.pointImgContainer} ${sasame.situationImgContainer}`}>
                  <div className={sasame.pointImgContent}>
                    <Img
                      group={"situation-example"}
                      imgs={[
                        {src: "img/230504cp.jpg", alt: "kig-cp-2305", horizontal: true},
                        {src: "img/230527.jpg", alt: "アパートにて", horizontal: true},
                      ]}
                    />
                  </div>
                </div>
                <h4>仲間と一緒に</h4>
                <p>誰かと遊んだり、<span>イベント</span>に参加してる特別な時など、<span>仲間と一緒</span>にいるときには思い出を残せたら。</p>
                <div className={`${sasame.pointImgContainer} ${sasame.situationImgContainer}`}>
                  <div className={sasame.pointImgContent}>
                    <Img
                      group={"situation-example"}
                      imgs={[
                        {src: "img/230717_group.jpg", alt: "神津島集合写真", horizontal: true},
                      ]}
                    />
                  </div>
                </div>
                <h4>大学での日常</h4>
                <p><span>キャンパス</span>の風景や、<span>教室</span>で勉強中の姿など、大学生活の思い出を残せたら。</p>
                <div className={`${sasame.pointImgContainer} ${sasame.situationImgContainer}`}>
                  <div className={sasame.pointImgContent}>
                    <Img
                      group={"situation-example"}
                      imgs={[
                        {src: "img/230902cp.JPG", alt: "kig-cp-2309"},
                        {src: "img/230701.jpg", alt: "kig-cp-2307名古屋", horizontal: true},
                      ]}
                    />
                  </div>
                </div>
                <h4>季節のイベント</h4>
                <p><span>クリスマス</span>や<span>ハロウィン</span>、そして<span>誕生日</span>などのイベントでは、
                  <br/>それを象徴する写真を残して、季節の変化を楽しめたら。</p>
                <div className={`${sasame.pointImgContainer} ${sasame.situationImgContainer}`}>
                  <div className={sasame.pointImgContent}>
                    <Img
                      group={"situation-example"}
                      imgs={[
                        {src: "img/221031.jpg", alt: "ハロウィン"},
                        {src: "img/231225.jpg", alt: "クリスマス"},
                      ]}
                    />
                  </div>
                </div>
              <h4>その他</h4>
              <p>それ以外にも、電車やバー、和室、ゴシック風、路地、プールなど、どこでも似合うと思います！
                <br/>撮りたいイメージがあれば、遠慮なく伝えてください！</p>
                <div className={`${sasame.pointImgContainer} ${sasame.situationImgContainer}`}>
                  <div className={sasame.pointImgContent}>
                    <Img
                      group={"situation-example"}
                      imgs={[
                        {src: "img/230502cp_train.jpg", alt: "電車"},
                        {src: "img/230730.jpg", alt: "プール"},
                      ]}
                    />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }