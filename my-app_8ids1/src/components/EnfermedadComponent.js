import React, { useEffect, useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';



function EnfermedadComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [nombreE, setNombreE] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [receta, setReceta] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [prevencion, setPrevencion] = useState('');

  const actions = [
    { icon: <SaveIcon />, name: 'Save', key: 'save' },
    { icon: <DeleteForeverIcon />, name: 'Delete', key: 'delete' },
  ];

  const [enfermedad,setEnfermedad] = useState({
    id: 0,
    nombreE: '',
    sintomas: '',
    receta: '',
    diagnostico: '',
    prevencion: ''
  })

  const [loading, setLoading] = useState(false);

  const fnObtenerDatos = async() =>{
    setLoading(true);
    await axios.get('http://127.0.0.1:8000/api/enfermedad',{
      params:{
        id: location.state.id
      }
    }).then((response) => {
      console.log(response.data)
      setEnfermedad(response.data)
      setLoading(false)
    })
  }

  const cancelarEdicion = () => {
    navigate(-1);
  };


  //guardar
  const handleEditar = (event) => {
    const { name, value } = event.target;
    setEnfermedad((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFunction = (key) =>{
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
    await axios.post('http://127.0.0.1:8000/api/enfermedad/crear', enfermedad);
    console.log('Enfermedades registradas');
    {
      setLoading(false);
      navigate("/enfermedades");
    }
  };

  //eliminar
  const eliminarDatos = async () => {
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/enfermedad/borrar',enfermedad);
    console.log('Enfermedad eliminada');
    setLoading(false);
    navigate("/enfermedades");
  };

  useEffect(() =>{
    console.log('Render');
    if(location.state.id != 0 )
    {
      fnObtenerDatos()
    }
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Enfermedad anviada: ', { nombreE, sintomas, receta, diagnostico, prevencion});
    setNombreE('');
    setSintomas('');
    setReceta('');
    setDiagnostico('');
    setPrevencion('');
  };

  return (
    <div style={containerStyles}>
    <form onSubmit={handleSubmit} style={formStyles}>
     <div style={inputContainerStyles}>
       <TextField
         required
         id="outlined-required"
         label="Enfermedad"
         name="enfermedad"
         value={enfermedad.nombreE}
         onChange={handleEditar}
         variant="outlined"
         fullWidth
       />
     </div>
     
     <div style={inputContainerStyles}>
       <TextField
         required
         id="outlined-required"
         label="Sintomas"
         name="sintomas"
         value={enfermedad.sintomas}
         onChange={handleEditar}
       />
     </div>
     <div style={inputContainerStyles}>
       <TextField
         required
         id="outlined-required"
         label="Receta"
         name="receta"
         value={enfermedad.receta}
         onChange={handleEditar}
       />
     </div>
     <div style={inputContainerStyles}>
       <TextField
         required
         id="outlined-required"
         label="Diagnostio"
         name="diagnostico"
         value={enfermedad.diagnostico}
         onChange={handleEditar}
       />
     </div>
     <div style={inputContainerStyles}>
       <TextField
         required
         id="outlined-required"
         label="Prevencion"
         name="prevencion"
         value={enfermedad.prevencion}
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

export default EnfermedadComponent