import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchContext } from '../App';

import { setCategoryId } from '../redux/slice/filterSlice';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  //Filter
  const dispatch = useDispatch();
  const { categoryId, sort, sortOrder } = useSelector((state) => state.filter);

  // Context (temporarily)
  const { searchValue } = React.useContext(SearchContext);

  // States  (temporarily))
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Conditions for api request
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sort.sortProperty;
  const order = sortOrder ? `asc` : `desc`;
  const search = searchValue ? `${searchValue}` : '';

  // Pizzas render (in const)
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  //Filter category-function
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

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
  }, [categoryId, sort.sortProperty, sortOrder, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(pageNumber) => setCurrentPage(pageNumber)} />
    </div>
  );
};

export default Home;
