import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login_Component from './components//Login_Component';
import HomeComponent from './components/PacientesComponent';
import InicioComponent from './components/InicioComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import PacienteComponent from './components/PacienteComponent';
import EnfermedadComponent from './components/EnfermedadComponent';
import EnfermedadesComponent from './components/EnfermedadesComponent';
import CitasComponent from './components/CitasComponent';
import CitaComponent from './components/CitaComponent';

function App() {   
  const [token, setToken] = useState(null);

  useEffect(()=>{
    console.log('Render')
    setToken(secureLocalStorage.getItem('token'));
  },[]);
  
  return (

<Routes>
    <Route path="/" element={<Login_Component />}/>
    <Route path="/home" element={token == null ? <Login_Component /> :<InicioComponent />}/>
    <Route path="/pacientes" element={token == null ? <Login_Component /> :<HomeComponent />}/>
    <Route path="/paciente/nuevo" element={token == null ? <Login_Component /> :<PacienteComponent />}/>
    <Route path="/enfermedades" element={token == null ? <Login_Component /> :<EnfermedadesComponent />}/>
    <Route path="/enfermedad/nuevo" element={token == null ? <Login_Component /> :<EnfermedadComponent />}/>
    <Route path="/citas" element={token == null ? <Login_Component /> :<CitasComponent />}/>
    <Route path="/cita/nuevo" element={token == null ? <Login_Component /> :<CitaComponent />}/>
    </Routes>

);
}
export default App;
