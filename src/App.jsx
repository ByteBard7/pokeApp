import { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import LoadMoreButton from "./components/LoadMoreButton";
import LoadingIndicator from "./components/LoadingIndicator";
import useDebounce from "./hooks/useDebounce";

const initialLimit = 200; // Initial number of Pokémon to fetch for search
const limit = 20; // Number of Pokémon to display per page

const fetchPokemonData = async (offset) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const response = await fetch(url);
  const data = await response.json();
  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return await res.json();
    })
  );
  return pokemonDetails;
};

const fetchInitialPokemonData = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${initialLimit}`;
  const response = await fetch(url);
  const data = await response.json();
  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return await res.json();
    })
  );
  return pokemonDetails;
};

const App = () => {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // Load initial Pokémon data on mount
  useEffect(() => {
    const loadInitialPokemonData = async () => {
      const data = await fetchInitialPokemonData();
      setAllPokemonData(data);
      setDisplayedPokemons(data.slice(0, limit));
      setLoading(false);
    };

    loadInitialPokemonData();
  }, []);

  // Load more Pokémon data when the page changes
  useEffect(() => {
    const loadMorePokemonData = async () => {
      setLoading(true);
      const data = await fetchPokemonData(page * limit);
      if (data.length > 0) {
        setAllPokemonData((prev) => {
          const existingIds = new Set(prev.map((pokemon) => pokemon.id));
          const newPokemons = data.filter(
            (pokemon) => !existingIds.has(pokemon.id)
          );
          return [...prev, ...newPokemons];
        });
        setDisplayedPokemons((prev) => [...prev, ...data]);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    };

    if (page > 0) {
      loadMorePokemonData();
    }
  }, [page]);

  // Handle search input changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Debounce the search input
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter all Pokémon based on the search query
  const filteredData = useMemo(() => {
    return allPokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [allPokemonData, debouncedSearchQuery]);

  return (
    <div className="flex flex-col items-center w-full">
      <Header searchQuery={searchQuery} handleSearch={handleSearch} />
      <PokemonList
        pokemons={debouncedSearchQuery ? filteredData : displayedPokemons}
      />
      {loading && <LoadingIndicator />}
      {!loading && debouncedSearchQuery && filteredData.length === 0 && (
        <p>No Pokémon found</p>
      )}
      {!loading && hasMore && (
        <LoadMoreButton onLoadMore={() => setPage((prev) => prev + 1)} />
      )}
    </div>
  );
};

export default App;
