import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo_app_angular';

  public item: string = ''
  public lista: any = [];
  public listaGlobal: any = [];
  public num: number = 0;
  public modalActivo: boolean = false;
  public modalEliminado: boolean = false;
  public modalTodos: boolean = false;
  public idDelete : number = 0;
  public nombre: string = '';
  public objGeneral : any = {};
  public all: boolean = true;
  public active: boolean = false;
  public completed: boolean = false;
  public noche: boolean = false;

  agregarTarea(){
    if(this.item === ''){
      console.log('debes ingresar algo primero');
      return;
    }
    this.objGeneral = {
      id: this.generarID(),
      nombre: this.item,
      estatus: false,

    }
    this.listaGlobal.push(this.objGeneral);
    this.lista = this.listaGlobal;
    this.item = '';
    this.comprobarCumplidos();
  }

  eliminarTarea(nombreList:any, idLista:any){
    this.modalActivo = true;
    this.nombre = nombreList;
    this.idDelete = idLista;
  }

  generarID(){
    const random = Math.random() * 1000;
    const redondear = Math.round(random);
    return redondear;
  }

  marcarTarea(todo: any){
    const {id, nombre, estatus} = todo;
    let objEspecifico = [];

    if(!estatus){
      objEspecifico = this.listaGlobal.find((elemento :any) => elemento.id === id);
      objEspecifico.estatus = true;
      this.comprobarCumplidos();
      return;
    }
    objEspecifico = this.listaGlobal.find((elemento :any) => elemento.id === id);
    objEspecifico.estatus = false;
    this.comprobarCumplidos();
  }

  eliminar(id: any){
    const eliminado = this.listaGlobal.filter((registro: any) => registro.id !== id);
    this.lista = eliminado;
    this.listaGlobal = eliminado;
    this.modalActivo = false;
    this.modalEliminado = true;
    setTimeout(() => {
      this.modalEliminado = false;
      this.comprobarCumplidos();
    }, 1500);
  }

  eliminarTodos(){
    this.lista = [];
    this.listaGlobal = [];
    this.modalTodos = true;
    setTimeout(() => {
      this.modalTodos = false;
    }, 1500);
  }

  comprobarCumplidos(){
    const cumplidos = this.listaGlobal.filter((item: any) => item.estatus !== true);
    this.num = cumplidos.length;
  }

  todasTareas(){
    this.lista = this.listaGlobal;
    this.all = true;
    this.active = false;
    this.completed = false;
  }

  tareasActivas(){
    const activas = this.listaGlobal.filter((elemento:any) => elemento.estatus === false);
    this.lista = activas;
    this.all = false;
    this.active = true;
    this.completed = false;
  }

  tareasCompletadas(){
    const completadas = this.listaGlobal.filter((elemento:any) => elemento.estatus === true);
    this.lista = completadas;
    this.all = false;
    this.active = false;
    this.completed = true;
  }
}
