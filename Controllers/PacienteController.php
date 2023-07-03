<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    public function create(Request $request){
        if($request->id==0){
            $paciente = new Paciente();
        }
        else{
            $paciente = Paciente::find($request->id);
        }
        $paciente->nombre = $request->nombre;
        $paciente->edad = $request->edad;
        $paciente->nss = $request->nss;
        $paciente->domicilio = $request->domicilio;
        
        $paciente->save();

        return $paciente;
    }

    public function get(Request $req){
        
        $paciente = Paciente::find($req->id);
        return $paciente;
    }

    public function list(){
        $pacientes = Paciente::all();

        return $pacientes; 
    }

    public function delete(Request $request){
        $paciente = Paciente::find($request->id);
        $paciente->delete();

        return "ok";
    }
}
