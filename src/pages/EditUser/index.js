import React, { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import axios from "axios";

import '../../styles/global.css';
import '../../styles/forms.css';
import * as S from '../../styles/style';
import Header from "../../components/Header";


function EditUser() {
  const [name, setName] = useState('');
  const [planet, setPlanet] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  function handleEdit(event) {
    event.preventDefault();

    const novoArray = date.split('-');

    axios.put(`https://test-mais-a-educacao-v1.herokuapp.com/${id}?token=cleber-viana-zacher`, {
      name,
      planet,
      birthDate: `${novoArray[2]}/${novoArray[1]}/${novoArray[0]}`,
      description
    })
      .then((response) => {
        setError(false);
        history.push('/busca');
      })
      .catch((error) => {
        setError(true);
      })
  }

  function handleCancel() {
    history.push('/busca');
  }

  return (
    <>
      <Header />

      <div className="forms">
        <div className="pop-up">
          <form onSubmit={handleEdit} >
            <h1>Atualizar Dados</h1>

            <label htmlFor="nome">Nome</label>
            <S.Input
              type="text"
              id="nome"
              value={name}
              onChange={({ target }) => { setName(target.value) }} required />

            <label htmlFor="planet">Planeta</label>
            <S.Input
              type="text"
              id="planet"
              value={planet}
              onChange={({ target }) => setPlanet(target.value)} required />

            <label htmlFor="date">Data de Nascimento</label>
            <S.Input
              type="date"
              id="date"
              value={date}
              onChange={({ target }) => setDate(target.value)} required />

            <label htmlFor="motivation">Motivação para aliar-se</label>
            <S.Textarea
              rows="5"
              id="motivation"
              value={description}
              onChange={({ target }) => setDescription(target.value)} required />

            {error ? <S.Aviso>Erro em se Alistar!!!</S.Aviso> : ''}

            <div className="form-buttons">
              <S.Btn>Enviar</S.Btn>
              <S.Btn onClick={handleCancel}>Cancelar</S.Btn>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditUser;