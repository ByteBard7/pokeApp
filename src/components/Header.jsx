import logo from "../assets/logo.png";

const Header = ({ searchQuery, handleSearch }) => {
  return (
    <header className="flex flex-col items-center w-[80%] my-4">
      <img src={logo} alt="pokemon logo" className="h-20"/>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded w-full"
        placeholder="Search Pokémon"
      />
    </header>
  );
};

export default Header;
