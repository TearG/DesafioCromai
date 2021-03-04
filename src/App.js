import { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import axios from "axios";
import assets from './assets/background.jpg';
import "../src/index.css"


function App() {


  

  //hooks 'useState' para controlar o estado das variáveis 
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [h, setH] = useState('');
  const [res, setRes] = useState('');

  //Realiza uma requisição para API em Flask
  axios.create({ baseURL: 'http://localhost/5000' })
  async function enviar() {
    await axios.post('/calc', { c1: c1, c2: c2, h: h })
      .then(data => {
        setRes(<span>{data.data}</span>)
        console.log(data);
      }, err => console.log(err))
  };

  //Calculo com React
  const calcular = () => {
    if (c1 !== '' && c2 !== '' && h !== '') {
      setRes(<span>Por favor, digite apenas dois valores</span>)
    }
    else if (c1 === '' && c2 === '' && h === '') {
      setRes(<span>Digite pelo menos dois valores</span>)
    }
    else if (c1 === "") {
      const c = Math.sqrt((h * h) - (c2 * c2))
      setRes(<span>Cateto 1 = {c}</span>)

    } else if (c2 === "") {
      const c = Math.sqrt((h * h) - (c1 * c1))
      setRes(<span>Cateto 2 = {c}</span>)
      console.log(res)

    } else {
      const res = Math.hypot(c1, c2);

      setRes(<span>Hipotenusa = {res}</span>)
      console.log(res)
    }
  };

  // Limpa os dados
  const limpar = () => {
    setC1('');
    setC2('');
    setH('');
  };

  return (

    <Main >
      <Container>
        <Title style={{ fontFamily: "roboto" }}>Teorema de Pitágoras</Title>
        <Buttons>
          <strong> Cateto 1 =</strong>
          <Input id="c1" value={c1} type="text" onChange={(e) => setC1(e.target.value)} ></Input>
          <strong> Cateto 2 =</strong>
          <Input id="c2" value={c2} type="text" onChange={(e) => setC2(e.target.value)} ></Input>
          <strong> Hipotenusa =</strong>
          <Input id="h" value={h} type="text" onChange={(e) => setH(e.target.value)} ></Input>
        </Buttons>
        <div style={{ marginTop: 40 }}>
          <Res style={{ fontFamily: "roboto" }}>  {res} </Res>
        </div>
        <Botoes>
          {/* API Calculando na Api do Flask*/}
          <Button variant="warning" onClick={enviar}>Resultado com API</Button>{' '}
          {/* Calculando no React */}
          <Button  variant="primary" onClick={calcular}>Resultado com React</Button> {' '}
          {/* Limpar*/}
          <Button color='#000' variant="dark" onClick={limpar}>Limpar</Button>{' '}
        </Botoes>
      </Container>
    </Main>

  );
};

//Usando 'styled-components'  para simular o css no react
const Res = styled.span`
  color: #f2f2f2;
  font-size: 27px;
  background-color: #000;
  border-radius: 10px;
  padding: 2px;
  font-family: 'Roboto', sans-serif;
  `;

const Botoes = styled.div`
  justify-content: flex-end;
  bottom: 20;
  margin-top: 50px;
  display: block;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
`;

const Container = styled.div`
  width: 500px;
  height: 500px;
  background-color: rgba(211,211,211,0.8);
  border-radius: 20px;
  font-family: 'Roboto', sans-serif;
  
`;
const Input = styled.input`
  width: 90px;
  margin: 20px;
  font-family: 'Roboto', sans-serif;
  
`;

const Buttons = styled.div`
    background-color: rgba(120,120,120,0.8);
    width: 250px;
    margin-left: 25%;
    padding: 2;
    border-radius: 20px;
    text-align: end;
    font-size: 19px;
    font-family: 'Roboto', sans-serif;
    color:#cccc33;
    
`
//Usando o import do React para colocar imagem de fundo
const Main = styled.div`
  background-image: url(${assets});
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 937px;
  

`;

const Title = styled.h1`
  color: blue;
`;

export default App;
