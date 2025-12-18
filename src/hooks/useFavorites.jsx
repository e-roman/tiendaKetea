import { createContext, useContext, useState } from "react";

const FavContext = createContext();
export const useFavorites = () => useContext(FavContext);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (product) => {
    const exists = favorites.find((p) => p.slug === product.slug);

    if (exists) {
      setFavorites(favorites.filter((p) => p.slug !== product.slug));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <FavContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavContext.Provider>
  );
}
