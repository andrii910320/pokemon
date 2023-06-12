import React from "react";
import MainContent from "./MainContent";
import "../styles/topPanel.css"
import "../styles/mediaRequests.css"

export default function Header() {
    const [name, setName] = React.useState("")
    function handleSetName(event) {
        setName(event.target.value)
    }
    const [hide, setHide] = React.useState(true)

    return (
        <div>
            <header className="header">
                <div className="burger"
                    onClick={() => setHide(!hide)}> <img className="burgerButton" src="./burger.png" alt="" /></div>
                <a className="link" href="#">
                    <div className="logoAndName">
                        <img className="logo" src="./pokeball.png" alt="" />
                        <h1 className="nameSite">Pokemon</h1>
                    </div>
                </a>
                <div className="search">
                    <input className="textSearch"
                        type="text"
                        placeholder="Search"
                        value={name}
                        onChange={handleSetName}
                    />
                    <img className="imgSearch" src="./search.png" alt="" />
                </div>
            </header>
            <MainContent searchPokemon={name} showNavbar={hide} />
        </div>
    )
}