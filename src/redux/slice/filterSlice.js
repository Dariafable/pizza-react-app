import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  sortOrder: true,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setSortOrder } = filterSlice.actions;

export default filterSlice.reducer;
