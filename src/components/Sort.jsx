import React from 'react';
/* import { useSelector, useDispatch } from 'react-redux'; */

const Sort = ({ value, onChangeSort, order, onChangeSortOrder }) => {
  /*  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);  */

  const [open, setOpen] = React.useState(false);

  const list = [
    { itemName: 'популярности', sortProperty: 'rating' },
    { itemName: 'цене', sortProperty: 'price' },
    { itemName: 'алвафиту', sortProperty: 'title' },
  ];

  const onClickListItem = (i) => {
    onChangeSort(i);
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
        <span onClick={() => setOpen(!open)}>{value.itemName}</span>
      </div>

      {open && (
        <div className='sort__popup'>
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.itemName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
