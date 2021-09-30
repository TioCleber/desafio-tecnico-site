import React, { useState } from "react";
import axios from 'axios';

import Header from "../../components/Header";

import '../../styles/global.css';
import '../../styles/forms.css';
import * as S from '../../styles/style';

function Home({ children }) {
  const [name, setName] = useState('');
  const [planet, setPlanet] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    
    const novoArray = date.split('-');

    axios.post('https://test-mais-a-educacao-v1.herokuapp.com?token=cleber-viana-zacher', {
      name,
      planet,
      birthDate: `${novoArray[2]}/${novoArray[1]}/${novoArray[0]}`,
      description
    })
      .then((response) => {
        setError(false);
        setSuccess(true);
        setName('');
        setPlanet('');
        setDate('');
        setDescription('');
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch((error) => {
        setError(true);
        setSuccess(false);
      });
  }

  return (
    <>
      <Header />

      <div className="forms">
        <div>
          <h1>Registro para aliar-se a Resistência</h1>
        </div>

        <div className="pop-up">
          <form onSubmit={handleSubmit}>
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

            {success ? <S.Success>Seja Bem-Vindo a Aliança!!!</S.Success> : ''}

            <S.Btn>Enviar</S.Btn>
          </form>
        </div>
      </div>
    </>
  )
}

export default Home;
