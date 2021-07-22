import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'app/table-list/model/paciente.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonService {


  urlLocal= '/api/'

  private _pacientes: BehaviorSubject<Paciente[] | null> = new BehaviorSubject(null);

  constructor(private _router: Router, private _httpClient: HttpClient) { }


  // getPacientes():  Promise<any> {

  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(`${this.urlLocal}paciente`)
  //         .subscribe((response: any) => {
  //           console.log('respuesta del get pacientes', response)
  //             resolve(response);
  //         }, reject);
  //   });
  // }


  get pacientes$(): Observable<Paciente[]>
     {
         return this._pacientes.asObservable();
     }

  getPacientes():  Observable<Paciente[]> {

    return  this._httpClient.get<Paciente[]>(`${this.urlLocal}paciente`).pipe(
      tap((pacientes) => {
          this._pacientes.next(pacientes);
      })
  );
         
   
  }

  postPaciente(form): Promise<any>
    {

      console.log('lo que envio al post paciente', form)
      return new Promise((resolve, reject) => {
          this._httpClient.post(`${this.urlLocal}paciente`, form)
              .subscribe((response: any) => {
                  console.log('lo que retorna el post paciente', response)
                  resolve(response);
              }, reject);
      });

    }

  putPaciente(form): Promise<any>
    {
        console.log('lo que envio al put paciente', form)
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${this.urlLocal}paciente/${form.id}`, form)
                .subscribe((response: any) => { 
                  console.log('lo que retorna el put paciente', response)
                    resolve(response);
                }, reject);
        });

    }


    deletePaciente(id): Promise<any>
    {
      console.log('el id que envio al deleted paciente', id)
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${this.urlLocal}paciente/${id}`)
                .subscribe((response: any) => { 

                  console.log('lo que retorna el deleted paciente', response)
                    resolve(response);
                }, reject);
      });  
  }
}