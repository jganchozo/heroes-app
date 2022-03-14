import { HeroeList } from "../hero/HeroeList"

export const MarvelScreen = () => {
    return (
        <div>
            <h1>MarvelScreen</h1>
            <hr />

            <HeroeList publisher='Marvel Comics' />
        </div>
    )
}
