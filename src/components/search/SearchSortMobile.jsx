export default function SearchSortMobile({ sort, setSort }) {
  return (
    <select
      className="form-select"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="featured">Destacados</option>
      <option value="new">Más recientes</option>
      <option value="price_low">Precio más bajo</option>
      <option value="price_high">Precio más alto</option>
      <option value="discount">Mayor descuento</option>
      <option value="az">A - Z</option>
      <option value="za">Z - A</option>
    </select>
  );
}
