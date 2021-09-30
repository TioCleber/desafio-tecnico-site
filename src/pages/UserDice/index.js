import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import '../../styles/userDice.css';
import * as S from '../../styles/style';

import Exclude from "../../components/Buttons/Exclude";
import Edit from "../../components/Buttons/Edit";

import Header from "../../components/Header";

function UsersDice() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.get(`https://test-mais-a-educacao-v1.herokuapp.com?token=cleber-viana-zacher`)
      .then((response) => {
        setPeople(response.data);
        setError(false)
      })
      .catch((err) => {
        setError(true);
      })
  }, []);

  function handleAdd() {
    history.push('/');
  }

  return (
    <>
      <Header />

      {error ? <S.Aviso>Error Status 500</S.Aviso> : ''}

      <div className="btn-add">
        <S.BtnAdd className="btn-add" onClick={handleAdd}>Adicionar</S.BtnAdd>
      </div>

      {people.map(dicePeople => {
        function handleExclude() {
          axios.delete(`https://test-mais-a-educacao-v1.herokuapp.com/${dicePeople.id}?token=cleber-viana-zacher`);

          const deleteCard = people.filter(card => card.id !== dicePeople.id);

          setPeople(deleteCard);
        }

        function handleId() {
          history.push(`/edit/${dicePeople.id}`);
        }

        return (
          <>
            <div className="cards">
              <div className="card-info">
                <div>
                  <p key={dicePeople.birthDate} ><span>Nome:</span> {dicePeople.name}</p>

                  <p><span>Planeta:</span> {dicePeople.planet}</p>

                  <p><span>Data:</span> {dicePeople.birthDate}</p>

                  <p><span>Descrição:</span> {dicePeople.description}</p>
                </div>

                <div>
                  <S.Btn onClick={handleExclude}>
                    <Exclude />
                  </S.Btn>

                  <S.Btn onClick={handleId}>
                    <Edit />
                  </S.Btn>
                </div>
              </div>
            </div>
          </>
        )
      })}
    </>
  )
}

export default UsersDice;