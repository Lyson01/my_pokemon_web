import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Spin, Tabs } from "antd";

import "../style/AboutPokemon.css";

const { TabPane } = Tabs;

const AboutPokemon = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    id: "",
    name: "",
    statsName: [],
    statsRes: [],
    types: [],
    moves: [],
    abilities: [],
    height: "",
    weight: "",
    exp: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemonData = response.data;

        const statsName = pokemonData.stats.map((stat) => stat.stat.name);
        const statsRes = pokemonData.stats.map((stat) => stat.base_stat);
        const types = pokemonData.types.map((type) => type.type.name);
        const moves = pokemonData.moves.map((move) => move.move.name);
        const abilities = pokemonData.abilities.map(
          (ability) => ability.ability.name
        );

        setData({
          id: pokemonData.id,
          name: pokemonData.name,
          statsName,
          statsRes,
          types,
          moves,
          abilities,
          height: pokemonData.height,
          weight: pokemonData.weight,
          exp: pokemonData.base_experience,
          image: getPokemonImage(pokemonData),
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getPokemonImage = (pokemon) => {
    if (pokemon.sprites.other.dream_world.front_default) {
      return pokemon.sprites.other.dream_world.front_default;
    } else if (pokemon.sprites.other["dream_world"].front_default) {
      return pokemon.sprites.other["dream_world"].front_default;
    } else {
      return "fallback-image-url.jpg";
    }
  };

  return (
    <section className="pokemon-about">
      {loading ? (
        <div className="loading-spinner-about">
          <Spin size="large" />
        </div>
      ) : (
        <div className="about-pokemon-cards">
          <div className="about-pokemon-card-left">
            <div className="about-left container">
              <Link to="/">
                <h4>Back Home</h4>
              </Link>
              <h2>{data.name}</h2>
              <img src={data.image} alt={data.name} />
            </div>
          </div>
          <div className="container about-pokemon-card-right">
            <div className="cards">
              <div className="card">
                <h1>Stats</h1>
                <h3>Name:</h3>
                <span>
                  {data.statsName.join(`, `)}
                </span>
                <br />
                <h3>Res:</h3>
                <span> {data.statsRes.join(", ")}</span>
              </div>
              <div className="card">
                <h1>Types</h1>
                <span>
                  {data.types.join(`, `)}
                </span>
              </div>
              <div className="card scroll" >
                <h1>Moves</h1>
                <span>{data.moves.join(", ")}</span>
                <br />
              </div>
              <div className="card">
                <h1>Abilities</h1>
                <span>
                  {data.abilities.join(`, `)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutPokemon;
