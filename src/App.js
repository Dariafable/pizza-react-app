import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
  return (
    <div class='wrapper'>
      <Header />
      <div class='content'>
        <div class='container'>
          <div class='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 class='content__title'>Все пиццы</h2>
          <div class='content__items'>
            <PizzaBlock title='Маргарита' price={300} />
            <PizzaBlock title='4 сыра' price={395} />
            <PizzaBlock title='Мясная' price={395} />
            <PizzaBlock title='Грибная' price={395} />
            <PizzaBlock title='Чизбургер' price={400} />
            <PizzaBlock title='Мексиканская' price={400} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
