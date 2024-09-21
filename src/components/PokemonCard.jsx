const PokemonCard = ({ pokemon }) => {
  console.log(pokemon.stats[0]);
  return (
    <div className="border border-gray-300 rounded p-4 flex flex-col items-center">
      <h2 className="font-extrabold">{pokemon.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-20 h-20"
      />
      {/* <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p> */}
      <h3 className="font-medium">Stats</h3>
      <div>
        {pokemon.stats.length !== 0
          ? pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                <p className="flex justify-between font-medium">
                  {stat.stat.name}
                  <span>{stat.base_stat}</span>
                </p>
                <progress value={stat.base_stat} max={100}>
                  <p>{stat.base_stat}</p>
                </progress>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default PokemonCard;
