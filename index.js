const fetchData = [
  {"id": 1, "category": "Sporting Goods", "price": "$49.99", "stocked": true, "name": "Football"},
  {"id": 2, "category": "Sporting Goods", "price": "$9.99", "stocked": true, "name": "Baseball"},
  {"id": 3, "category": "Sporting Goods", "price": "$29.99", "stocked": false, "name": "Basketball"},
  {"id": 4, "category": "Electronics", "price": "$99.99", "stocked": true, "name": "iPod Touch"},
  {"id": 5, "category": "Electronics", "price": "$399.99", "stocked": false, "name": "iPhone 5"},
  {"id": 6, "category": "Electronics", "price": "$199.99", "stocked": true, "name": "Nexus 7"}
];

class ProductRow extends React.Component {

  render() {

    const {
      stocked,
      name,
      category,
      price
    } = this.props;

    const productName = stocked ? name : <span style={{ color: 'red' }}>{name}</span> ;

    return (
      <React.Fragment>
        <h5>{category}</h5>
        <div className="productRow">
          <p>{productName}</p>
          <p>{price}</p>
        </div>
      </React.Fragment>
    );
  }
}

function ProductTable(props) {

  const {
    products,
    filterText,
    isStockOnly
  } = props;

  let rows = [];

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText) === -1) {
      return;
    }

    if (isStockOnly && !product.stocked) {
      return;
    }

    rows.push(
      <ProductRow
        key={product.id}
        category={product.category}
        name={product.name}
        price={product.price}
        stocked={product.stocked}
      />
    )
  });

  return (
    <div className="productTable">
      <div className="productTable-thead">
        <h4>Name</h4>
        <h4>Price</h4>
      </div>
      <div className="productTable-tbody">
        {rows}
      </div>
    </div>
  );
}

class SearchBar extends React.Component {

  handleChangeFilterText = (e) => {
    this.props.onChangeFilterText(e.target.value);
  }

  handleChangeIsStockOnly = (e) => {
    this.props.onChangeIsStockOnly(e.target.checked);
  }

  render() {

    const {
      filterText,
      isStockOnly,
    } = this.props;

    return (
      <div className="searchBar">
        <label>
          <input
            type="text"
            value={filterText}
            onChange={this.handleChangeFilterText}
            placeholder="Search..."
          />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={isStockOnly}
            onChange={this.handleChangeIsStockOnly}
          />
          Only show products in stock
        </label>
      </div>
    );
  }
}

class FilterableProductTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      isStockOnly: false,
    }
  }

  handleChangeFilterText = (filterText) => {
    this.setState({
      filterText,
    })
  }

  handleChangeIsStockOnly = (isStockOnly) => {
    this.setState({
      isStockOnly,
    })
  }

  render() {

    const {filterText, isStockOnly} = this.state;
    const {data} = this.props;

    return (
      <div className="wrap">
        <SearchBar
          filterText={filterText}
          isStockOnly={isStockOnly}
          onChangeFilterText={this.handleChangeFilterText}
          onChangeIsStockOnly={this.handleChangeIsStockOnly}
        />
        <ProductTable
          products={data}
          filterText={filterText}
          isStockOnly={isStockOnly}
        />
      </div>
    );
  }
}

ReactDOM.render(<FilterableProductTable data={fetchData} />, document.getElementById('root'));
