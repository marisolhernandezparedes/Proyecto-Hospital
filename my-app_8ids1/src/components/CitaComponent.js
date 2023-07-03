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

function CitaComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [dia, setDia] = useState('');
  const [doctor, setDoctor] = useState('');

  const actions = [
    { icon: <SaveIcon />, name: 'Save', key: 'save' },
    { icon: <DeleteForeverIcon />, name: 'Delete', key: 'delete' },
  ];

  const [cita,setCita] = useState({
    id: 0,
    hora: '',
    motivo: '',
    dia: '',
    doctor: ''
  })

  const [loading, setLoading] = useState(false);

  const fnObtenerDatos = async() =>{
    setLoading(true);
    await axios.get('http://127.0.0.1:8000/api/cita',{
      params:{
        id: location.state.id
      }
    }).then((response) => {
      console.log(response.data)
      setCita(response.data)
      setLoading(false)
    })
  }

  const cancelarEdicion = () => {
    navigate(-1);
  };



  const handleEditar = (event) => {
    const { name, value } = event.target;
    setCita((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFunction = (key) => {
    switch (key) {
      case 'save':
        GuardarDatosC();
        break;
      case 'delete':
        eliminarDatos();
        break;
      default:
        console.log(`Acción no reconocida: ${key}`);
        break;
    }
  };

  const GuardarDatosC = async () => {
      setLoading(true);
      await axios.post('http://127.0.0.1:8000/api/cita/crear', cita);
      console.log('Datos guardados correctamente');
    {
      setLoading(false);
      navigate("/citas");
    }
  };

  //ELIMINAR DATOS
  const eliminarDatos = async () => {
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/cita/borrar',cita);
    console.log('Datos eliminados correctamente');
    setLoading(false);
    navigate("/citas");
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
    console.log('Datos enviados:', { hora, motivo, dia , doctor });
    setHora('');
    setMotivo('');
    setDia('');
    setDoctor('');
  };

  return (
    <div style={containerStyles}>
       <form onSubmit={handleSubmit} style={formStyles}>
        <div style={inputContainerStyles}>
          <TextField
            required
            id="outlined-required"
            label="Hora"
            name="hora"
            value={cita.hora}
            onChange={handleEditar}
            variant="outlined"
            fullWidth
          />
        </div>
        <div style={inputContainerStyles}>
          <TextField
            required
            id="outlined-required"
            label="Motivo"
            name="motivo"
            value={cita.motivo}
            onChange={handleEditar}
          />
        </div>
        <div style={inputContainerStyles}>
          <TextField
            required
            id="outlined-required"
            label="Dia"
            name="dia"
            value={cita.dia}
            onChange={handleEditar}
          />
        </div>
        <div style={inputContainerStyles}>
          <TextField
            required
            id="outlined-required"
            label="Doctor"
            name="doctor"
            value={cita.doctor}
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

export default CitaComponent