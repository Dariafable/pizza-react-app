import React from 'react';

/* import { setCategoryId } from '../redux/slice/filterSlice'; */
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = ({ searchValue }) => {
  /*  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  console.log(categoryId); */

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    itemName: 'популярности',
    sortProperty: 'rating',
  });
  const [sortOrder, setSortOrder] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortType.sortProperty;
  const order = sortOrder ? `asc` : `desc`;
  const search = searchValue ? `${searchValue}` : '';

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  /*  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }; */

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6304d4bc761a3bce77f0a0d5.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onChangeCategory={(i) =>
            setCategoryId(i)
          } /* value={categoryId} onChangeCategory={onChangeCategory} */
        />
        <Sort
          value={sortType}
          onChangeSort={(i) => setSortType(i)}
          order={sortOrder}
          onChangeSortOrder={(i) => setSortOrder(i)}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(pageNumber) => setCurrentPage(pageNumber)} />
    </div>
  );
};

export default Home;
