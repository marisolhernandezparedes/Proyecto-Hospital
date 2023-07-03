<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnfermedadController extends Controller
{
    public function create(Request $request){
        if($request->id==0){
            $enfermedad = new Enfermedad();
        }
        else{
            $enfermedad = Enfermedad::find($request->id);
        }
        $enfermedad->nombreE = $request->nombreE;
        $enfermedad->sintomas = $request->sintomas;
        $enfermedad->receta = $request->receta;
        $enfermedad->diagnostico = $request->diagnostico;
        $enfermedad->prevencion = $request->prevencion;
        
        $enfermedad->save();

        return $enfermedad;
    }

    public function get(Request $req){
        
        $enfermedad = Enfermedad::find($req->id);
        return $enfermedad;
    }

    public function list(){
        $enfermedades = Enfermedad::all();

        return $enfermedades; 
    }

    public function delete(Request $request){
        $enfermedad = Enfermedad::find($request->id);
        $enfermedad->delete();

        return "ok";
    }
}
