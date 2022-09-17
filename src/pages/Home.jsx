import React from 'react';

/* import { setCategoryId } from '../redux/slice/filterSlice'; */
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
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

  /*  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }; */

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6304d4bc761a3bce77f0a0d5.mockapi.io/Items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=${sortOrder ? `asc` : `desc`}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder]);

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
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
