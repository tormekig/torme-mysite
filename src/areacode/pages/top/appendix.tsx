import areacode from "areacode/assets/css/areacode.module.scss"
import appendixList from "areacode/data/appendixList"

export function Appendix() {

    const appendixes: React.JSX.Element[] = []

    appendixList.forEach(function(appendix, i) {

        appendixes.push(
            <li key={i}>
                <a href={appendix.url}>{appendix.title}</a>{appendix.note}
            </li>
        )

    })

    return (
        <div className={areacode.appendix}>
            <h3>参考資料</h3>
            <ul>{appendixes}</ul>
        </div>
    )

}