import React, { useEffect, useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';

function PacienteComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [nss, setNSS] = useState('');
  const [domicilio, setDomicilio] = useState('');

  const actions = [
    { icon: <SaveIcon />, name: 'Save', key: 'save' },
    { icon: <DeleteForeverIcon />, name: 'Delete', key: 'delete' },
  ];

  const [paciente,setPaciente] = useState({
    id: 0,
    nombre: '',
    edad: 0,
    nss: '',
    domicilio: ''
  })

  const [loading, setLoading] = useState(false);

  const fnObtenerDatos = async() =>{
    setLoading(true);
    await axios.get('http://127.0.0.1:8000/api/paciente',{
      params:{
        id: location.state.id
      }
    }).then((response) => {
      console.log(response.data)
      setPaciente(response.data)
      setLoading(false)
    })
  }

  const cancelarEdicion = () => {
    navigate(-1);
  };


   //GUARDAR DATOS
  //Se vueleve a utilizar la setPaciente((prevState)) para recopilar los datos de paciente
  //name represente el nombre del campo y value se utiliza para el nuevo valo ingresado
  
  const handleEditar = (event) => {
    const { name, value } = event.target;
    setPaciente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFunction = (key) => {
    switch (key) {
      case 'save':
        GuardarDatos();
        break;
      case 'delete':
        eliminarDatos();
        break;
      default:
        console.log(`Acción no reconocida: ${key}`);
        break;
    }
  };

  const GuardarDatos = async () => {
      setLoading(true);
      await axios.post('http://127.0.0.1:8000/api/paciente/crear', paciente);
      console.log('Datos guardados correctamente');
    {
      setLoading(false);
      navigate("/pacientes");
    }
  };

  //ELIMINAR DATOS
  const eliminarDatos = async () => {
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/paciente/borrar',paciente);
    console.log('Datos eliminados correctamente');
    setLoading(false);
    navigate("/pacientes");
  };

  useEffect(() =>{
    console.log('Render');
    if(location.state.id !=0)
    {
      fnObtenerDatos()
    }
  },[]);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos enviados:', { nombre, edad, nss, domicilio });
    setNombre('');
    setEdad('');
    setNSS('');
    setDomicilio('');
  };

  return (
    <div style={containerStyles}>
       <form onSubmit={handleSubmit} style={formStyles}>
        <div style={inputContainerStyles}>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            name="nombre"
            value={paciente.nombre}
            onChange={handleEditar}
            variant="outlined"
            fullWidth
          />
        </div>
        <div style={inputContainerStyles}>
          <TextField
            required
            id="outlined-required"
            label="Edad"
            name="edad"
            value={paciente.edad}
            onChange={handleEditar}
          />
        </div>
        <div style={inputContainerStyles}>
          <TextField
            required
            id="outlined-required"
            label="NSS"
            name="nss"
            value={paciente.nss}
            onChange={handleEditar}
          />
        </div>
        <div style={inputContainerStyles}>
          <TextField
            required
            id="outlined-required"
            label="Domicilio"
            name="domicilio"
            value={paciente.domicilio}
            onChange={handleEditar}
          />
        </div>
      </form>
      <div style={buttonContainerStyles}>
        <Button
          variant="contained"
          style={cancelButtonStyles}
          onClick={cancelarEdicion}
          startIcon={<CancelIcon />}
        >
          Cancelar
        </Button>
      </div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<SaveIcon />}
          tooltipTitle="Guardar"
          onClick={() => handleFunction('save')}
        />
        <SpeedDialAction
          icon={<DeleteForeverIcon />}
          tooltipTitle="Eliminar"
          onClick={() => handleFunction('delete')}
        />
      </SpeedDial>
      {loading ? <Box sx={{ width: '100%' }}>
         <LinearProgress />
        </Box> :''}
    </div>
  );
}

const formStyles = {
  maxWidth: '400px',
  margin: '0 auto',
};

const inputContainerStyles = {
  marginBottom: '10px',
};

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '20px',
};

const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
};

const cancelButtonStyles = {
  backgroundColor: 'red',
};

export default PacienteComponent;
