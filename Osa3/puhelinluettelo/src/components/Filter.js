// Filter - component
const Filter = ({ filter, filterHandler }) =>
  <div>
    Filter with: <input value={filter} onChange={filterHandler} />
  </div>

export default Filter