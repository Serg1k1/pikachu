import { useState } from "react";
import data from "./data.js";
import { makeLink } from "./getImageLink.js";

const Header = ({ catched }) => {
  return (
    <div className="header">
      <span className="header__label">Catched pokemons</span>
      <h1 className="header__title">{catched.length}/{data.length}</h1>
    </div>
  )
}

const PikachuList = ({ onCatch, catched }) => {

  const items = data.map((item) => {
    let btnClazz = 'button';
    let itemClazz = 'pikachu__item';
    const includes = catched.includes(item.id);
    if (includes) {
      btnClazz += ' button-clicked';
      itemClazz += ' pikachu__item--red';
    }

    return (
      <li className={itemClazz} key={item.id}>
        <h4 className="item-pikachu__title" >{item.name}</h4>
        <img className="item-pikachu__image" src={makeLink(item)} alt="img" />
        <button className={btnClazz} onClick={() => onCatch(item.id)} >{includes ? 'reliese' : 'catch'}</button>
      </li>
    )
  })

  return (
    <ul className="pikachu__items" >
      {items}
    </ul>
  )
}

export default function App() {
  const [catched, setCatched] = useState([]);

  function onCatch(id) {
    if (catched.includes(id)) {
      const removePikachu = catched.filter((itemId) => itemId !== id);
      setCatched(removePikachu);
    } else {
      setCatched([...catched, id]);
    }
  }

  return (
    <div className="container">
      <Header catched={catched} />
      <PikachuList onCatch={onCatch} catched={catched} />
    </div>
  );
}
