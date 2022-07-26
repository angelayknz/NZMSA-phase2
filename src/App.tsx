import { useState } from 'react'
import { Pokemon } from 'pokenode-ts'
import './App.css'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'

function App() {
  const [pokemonName, setPokemonName] = useState('')
  const [pokemonInfo, setPokemonInfo] = useState<undefined | any>(undefined)

  const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2'

  return (
    <div>
      <h1> Pokemon Search </h1>

      <div>
        <TextField
          id="search-bar"
          className="text"
          value={pokemonName}
          onChange={(prop: any) => {
            setPokemonName(prop.target.value)
          }}
          label="Enter a Pokemon Name"
          variant="outlined"
          placeholder="Search"
          size="small"
        />

        <IconButton
          aria-label="search"
          onClick={() => {
            search()
          }}
        >
          <SearchIcon style={{ fill: 'blue' }} />
        </IconButton>
      </div>

      <p>You have entered {pokemonName}</p>
      {pokemonInfo === undefined ? (
        <p>Pokemon not found</p>
      ) : (
        <img src={pokemonInfo.sprites.other.dream_world.front_default} />
      )}

      <p>
        Height: {pokemonInfo.height * 10} cm <br />
        Weight: {pokemonInfo.weight / 10} kilograms
      </p>
    </div>
  )

  function search() {
    axios.get(POKEMON_BASE_URL + '/pokemon/' + pokemonName).then((res) => {
      setPokemonInfo(res.data)
      console.log(res.data)
    })
  }
}

export default App
