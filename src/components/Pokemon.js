import axios from "axios";
import React, { useState } from "react";

export default function Card(props) {
    const [pokemon, setPokemon] = useState({})
    try {
        React.useEffect(() => {
            axios.get(props.pokemonInfo.url)
                .then(res => setPokemon(res.data))
        }, [])
    }
    catch (err) {
        console.log(err.message)
    }
    /* Set color for types*/
    const [color, setColor] = useState("black");

    React.useEffect(() => {
        switch (pokemon.types && pokemon.types[0].type.name) {
            case "grass":
                setColor('green')
                break
            case "fire":
                setColor('red')
                break
            case "fighting":
                setColor('grey')
                break
            case "flying":
                setColor('rgb(0, 27, 116)')
                break
            case "poison":
                setColor('rgb(35, 87, 35)')
                break
            case "ground":
                setColor('chocolate')
                break
            case "bug":
                setColor('darkgoldenrod')
                break
            case "ghost":
                setColor('rgb(50, 59, 68)')
                break
            case "steel":
                setColor('slategreys')
                break
            case "water":
                setColor('blue')
                break
            case "electric":
                setColor('rgb(85, 77, 34)')
                break
            case "psychic":
                setColor('blueviolet')
                break
            case "ice":
                setColor('rgb(0, 109, 109)')
                break
            case "dragon":
                setColor('red')
                break
            case "dark":
                setColor('indigo')
                break
            case "fairy":
                setColor('teal')
                break
            default:
                setColor('black')
        }
    }, [pokemon])


    const styleWeight = {
        color: pokemon.weight < 200 ? "green" : pokemon.weight < 500 ? "orange" : "red",
    }
    const styleTypes = {
        color: color
    }
    let defaultPicture
    try {
        defaultPicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
    }
    catch (err) {
        console.log(err.message)
    }

    return (
        <div className="card">
            {pokemon.types && pokemon.types[0].type
                && <h3 className="type">{`${pokemon.types[0].type.name.slice(0, 1).toUpperCase()}${pokemon.types[0].type.name.slice(1)}`}</h3>}
            {(pokemon.types && pokemon.types.length) === 2 &&
                <h3 className="type2">{`${pokemon.types[1].type.name.slice(0, 1).toUpperCase()}${pokemon.types[1].type.name.slice(1)}`}</h3>}
            {pokemon.sprites?.front_default === null ? <img
                src={defaultPicture}
                alt="" /> : <img src={pokemon.sprites?.front_default} alt="" />}
            <h2 className="pokemonName" style={styleTypes}>{`${pokemon.name?.slice(0, 1).toUpperCase()}${pokemon.name?.slice(1)}`}</h2>
            <h3 className="title">Abilities</h3>
            <ul className="listAbilities">
                {pokemon.abilities && pokemon.abilities[0] &&
                    <li>{pokemon.abilities[0].ability.name}</li>}
                {pokemon.abilities && pokemon.abilities[1] &&
                    <li>{pokemon.abilities[1].ability.name}</li>}
                {pokemon.abilities && pokemon.abilities[2] &&
                    <li>{pokemon.abilities[2].ability.name}</li>}
                {pokemon.abilities && pokemon.abilities[3] &&
                    <li>{pokemon.abilities[3].ability.name}</li>}
                {pokemon.abilities && pokemon.abilities[4] &&
                    <li>{pokemon.abilities[4].ability.name}</li>}
            </ul>
            <p
                className="weight"
            >Weight<span style={styleWeight} className="param">{pokemon.weight}</span></p>
            <p
                className="exp"
            >EXP<span className="param">{pokemon.base_experience ? pokemon.base_experience : 0}</span></p>
        </div>

    )
}

