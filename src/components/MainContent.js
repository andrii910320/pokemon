import axios from "axios";
import React from "react";
import Pokemon from "./Pokemon";
import "../styles/mainContent.css"


export default function MainContent(props) {
    /* Get all name and url pokemon */
    const [pokemonList, setPokemonList] = React.useState([])
    try {
        React.useEffect(() => {
            axios
                .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
                .then(res => setPokemonList(res.data.results))
                .catch(err => console.log(err.message))
        }, [])
    }
    catch (err) {
        console.log(err.message)
    }

    /* Control view in site */
    const [parametersView, setParametersView] = React.useState({
        numberCards: "10",
        sortByAttribute: "",
        sortByAttributeSecond: "",
    })

    function handleParametersView(event) {
        const { name, value } = event.target

        if (name === 'sortByAttribute') {
            setParametersView((prevState) => {
                return {
                    ...prevState,
                    [name]: value
                }
            })
        }
        if (name === 'sortByAttributeSecond') {
            setParametersView((prevState) => {
                return {
                    ...prevState,
                    [name]: value
                }
            })
        }
        setParametersView((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    /* Return list pokemon with attribute */
    const [listAttributePokemon, setListAttributePokemon] = React.useState([])
    try {
        React.useEffect(() => {
            axios.get(`https://pokeapi.co/api/v2/type/${parametersView.sortByAttribute}`)
                .then(res => setListAttributePokemon(res.data.pokemon))
                .catch(err => console.log(err.message))
        }, [parametersView.sortByAttribute])
    } catch (err) {
        console.log(err.message)
    }

    const [listAttributePokemonSecond, setListAttributePokemonSecond] = React.useState([])
    try {
        React.useEffect(() => {

            axios.get(`https://pokeapi.co/api/v2/type/${parametersView.sortByAttributeSecond}`)
                .then(res => setListAttributePokemonSecond(res.data.pokemon))
                .catch(err => console.log(err.message))
        }, [parametersView.sortByAttributeSecond])
    }
    catch (err) {
        console.log(err.message)
    }


    /* navigation by page */
    const [page, setPage] = React.useState(1)
    function handlePageState(event) {
        const numberCards = Number(parametersView.numberCards)
        const { id } = event.target
        if (id === 'prev') {
            setPage(prevState => {
                if (prevState <= 1) return prevState
                return prevState - 1
            })
        }

        if (id === 'next') {
            setPage(prevState => {
                if (prevState * numberCards >= actualRenderList.length - numberCards) return prevState
                return prevState + 1
            })
        }
    }

    /* Render chosen pokemon */
    const [actualRenderList, setActualRenderList] = React.useState(pokemonList)
    React.useEffect(() => {
        setActualRenderList(() => {
            setPage(1)
            let findBySearch = props.searchPokemon ? pokemonList.filter((pokemon) => pokemon.name.includes(props.searchPokemon.toLowerCase())) : pokemonList
            const checker = listAttributePokemon === undefined ? [] : listAttributePokemon.map(el => el.pokemon.name)
            if (checker.length !== 0) {
                findBySearch = findBySearch.filter((pokemon) => checker.includes(pokemon.name))
            }
            const checker2 = listAttributePokemonSecond === undefined ? [] : listAttributePokemonSecond.map(el => el.pokemon.name)

            if (checker2.length !== 0) {
                return findBySearch.filter((pokemon) => checker2.includes(pokemon.name))
            }
            return findBySearch
        })
    }, [props.searchPokemon, pokemonList, parametersView, listAttributePokemon, listAttributePokemonSecond])

    const startIndex = (page - 1) * parametersView.numberCards
    const endIndex = startIndex + Number(parametersView.numberCards)
    const sliceActualRenderList =
        actualRenderList.length > Number(parametersView.numberCards) ?
            actualRenderList.slice(startIndex, endIndex).map(pokemon => (
                < Pokemon key={pokemon.name}
                    pokemonInfo={pokemon}
                    view={parametersView.view}
                />))
            : actualRenderList.map(pokemon => (
                < Pokemon key={pokemon.name}
                    pokemonInfo={pokemon}
                    view={parametersView.view}
                />))

    /* Render ability in navbar */
    const [ability, setAbility] = React.useState([])
    try {
        React.useEffect(() => {
            axios
                .get("https://pokeapi.co/api/v2/type")
                .then(res => setAbility(res.data.results))
                .catch(err => console.log(err.message))
        }, [parametersView.sortByAttribute])
    }
    catch (err) {
        console.log(err.message)
    }
    const abilityList = ability.map(el => (
        <option key={el.name} className="abilities" value={el.name}>{el.name}</option>
    ))


    return (
        <section className="content" >
            <nav className={props.showNavbar ? 'leftNav' : "hide"} >
                <h3>View pokemon list as:</h3>
                <h3>
                    Number of displayed cards:
                </h3>
                <div className="select">
                    <div className="wrap">
                        <div>
                            <label htmlFor="10">10</label>
                            <br />
                            <input
                                className="selectView"
                                type="radio"
                                name="numberCards"
                                id="10"
                                value="10"
                                checked={parametersView.numberCards === "10"}
                                onChange={handleParametersView}
                            />
                        </div>
                        <p>/</p>
                        <div>
                            <label htmlFor="20">20</label>
                            <br />
                            <input
                                className="selectView"
                                type="radio"
                                name="numberCards"
                                id="20"
                                value="20"
                                checked={parametersView.numberCards === "20"}
                                onChange={handleParametersView}
                            />
                        </div>
                        <p>/</p>
                        <div>
                            <label htmlFor="50">50</label>
                            <br />
                            <input
                                className="selectView"
                                type="radio"
                                name="numberCards"
                                id="50"
                                value="50"
                                checked={parametersView.numberCards === "50"}
                                onChange={handleParametersView}
                            />
                        </div>
                    </div>
                </div>
                <div className="choseAbilities">
                    <label htmlFor="abilities"><h3>Choose type pokemon:</h3></label>
                    <select
                        id="abilities"
                        value={parametersView.sortByAttribute}
                        onChange={handleParametersView}
                        name="sortByAttribute"
                    >
                        <option key="choose" className="abilities" value="">--Chose--</option>
                        {abilityList}
                    </select>
                    <label htmlFor="abilities2"><h3>Choose type pokemon:</h3></label>
                    <select
                        id="abilities2"
                        value={parametersView.sortByAttributeSecond}
                        onChange={handleParametersView}
                        name="sortByAttributeSecond"
                    >
                        <option key="choose2" className="abilities2" value="">--Chose--</option>
                        {abilityList}
                    </select>
                </div>
            </nav>
            <section className={
                `${props.showNavbar ? 'pokemonList' : 'alinePokemonList'}`
            }>
                {sliceActualRenderList}
            </section>
            <div className={`${props.showNavbar ? 'page' : 'alinePage'}`} >
                <h2>Page</h2>
                <ul className="buttonList">
                    <li
                        id="prev"
                        onClick={handlePageState}>&#10094;</li>
                    {page !== 1 && <li onClick={() => setPage(1)}>1</li>}
                    {page !== 1 && <span className="element">...</span>}
                    <li
                        className="activePage"
                        onClick={handlePageState}>{page} </li>
                    {(page !== Math.round(actualRenderList.length / parametersView.numberCards) &&
                        Math.round(actualRenderList.length / parametersView.numberCards) !== 0) &&
                        <span className="element">...</span>}
                    {(page !== Math.round(actualRenderList.length / parametersView.numberCards) &&
                        Math.round(actualRenderList.length / parametersView.numberCards) !== 0) &&
                        <li onClick={() => setPage(Math.round(actualRenderList.length / parametersView.numberCards))}>{Math.round(actualRenderList.length / Number(parametersView.numberCards))} </li>}
                    <li
                        id="next"
                        onClick={handlePageState}>&#10095;</li>
                </ul>
            </div>

        </section >
    )
}