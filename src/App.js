import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonFilteredList, setPokemonFilteredList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(pokeApi);
    const data = await res.json();
    setPokemonList(data.results);
    setPokemonFilteredList(data.results);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const regex = RegExp(value, "gi");
    const filteredList = pokemonList.filter((newList) => {
      return newList.name.match(regex);
    });
    setPokemonFilteredList(filteredList);
  };

  return (
    <div data-testid="app">
    <Navigation />
    <InputGroup onChange={handleChange} className="mb-3">
      <Form.Control
        aria-label="Example text with button addon"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
    <h1></h1>
      <Container>
        <Row sm={3}>
          {pokemonFilteredList.map((pokemon, idx) => (
            <Col className="mb-4" sm="4">
              <PokemonCard
                pokemonFilteredList={pokemonFilteredList}
                idx={idx}
                name={pokemon.name}
                url={pokemon.url}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export { App };
