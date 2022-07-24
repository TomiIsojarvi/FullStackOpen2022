// Filter - component
const Filter = ({ filter, filterHandler }) =>
  <div>
    Find countries: <input value={filter} onChange={filterHandler} />
  </div>

export default Filter