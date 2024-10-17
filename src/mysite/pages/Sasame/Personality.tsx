import React from 'react'

import { ContentHeader } from 'mysite/components/ContentHeader'

import sasame from '../../assets/css/sasame.module.scss'
import mysite from '../../assets/css/mysite.module.scss'

export function Personality() {
  return (
    <div>
      <ContentHeader ja={'ささめはこんな子'} en={'Personality'} />
      <div className={sasame.personalityContent}>
        <div className={sasame.personalityIntro}>
          <p>ささめは、雪国出身の21歳の理系大学生の女の子。</p>
          <p>今は都会のアパートで一人暮らしをしている。</p>
          <p>雪国育ちだけど寒さには弱いみたい。</p>
          <p>
            旅行が趣味で、綺麗な景色を見たり、美味しい食べ物を食べたりして、日々の疲れをリフレッシュ。
          </p>
          <p>
            最近はカフェ巡りにハマっていて、良い雰囲気のお店や美味しいメニューを見つけて、くつろぎのひと時を楽しんでいるみたい。
          </p>
          <p>家では料理をして、たまに凝ったものを作ったり。</p>
          <p>時にはゲームに夢中になって、気づいたら朝になってたり…</p>
          <p>夜型タイプで、朝早く起きるのが苦手。</p>
          <p>
            ものごとにストイックで、決めたことはとことんやり切りたいタイプ。
          </p>
          <p>
            でも普段はふわふわ動いていて、周りから見ると何を考えてるかわからない。
          </p>
          <p>というか何も考えてなさそう。</p>
          <p>
            結構マイペースで、面倒だなと思ったら「え～やるの～？」ってなったり。
          </p>
          <p>そんなゆる～い感じだけど、根は優しくて、面倒見のいい子です。</p>
        </div>
        <div className={mysite.tableContainer}>
          <div id={sasame.sasameTableHead}>ささめをもっと深掘り</div>
          <table className={mysite.profileTable}>
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
          <div className={sasame.sasameTableBottom}>
            ※マスター（とるめ）のプロフィールとは異なります。
          </div>
        </div>
      </div>
    </div>
  )
}
