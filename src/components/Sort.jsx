import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSort } from '../redux/slice/filterSlice';

const list = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алвафиту', sortProperty: 'title' },
];

const Sort = ({ order, onChangeSortOrder }) => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  /*  const order = useSelector((state) => state.filter.sort); */

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  const onClickOrder = (i) => {
    onChangeSortOrder(i);
  };

  return (
    <div className='sort'>
      <div className='sort__label'>
        <button className={order ? 'sort__asc' : 'sort__desc'} onClick={() => onClickOrder(!order)}>
          ↓
        </button>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>

      {open && (
        <div className='sort__popup'>
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
