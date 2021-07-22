import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'app/table-list/model/paciente.model';
import { User } from 'app/user-list/model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonService {


  urlLocal= '/api/'

  private _pacientes: BehaviorSubject<Paciente[] | null> = new BehaviorSubject(null);
  private _usuarios: BehaviorSubject<User[] | null> = new BehaviorSubject(null);

  constructor(private _router: Router, private _httpClient: HttpClient) { }

  get usuarios$(): Observable<User[]>
     {
         return this._usuarios.asObservable();
     }


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

      return new Promise((resolve, reject) => {
          this._httpClient.post(`${this.urlLocal}paciente`, form)
              .subscribe((response: any) => {
                
                  resolve(response);
              }, reject);
      });

    }

  putPaciente(form): Promise<any>
    {
  
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${this.urlLocal}paciente/${form.id}`, form)
                .subscribe((response: any) => { 
                    resolve(response);
                }, reject);
        });

    }


    deletePaciente(id): Promise<any>
    {
     
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${this.urlLocal}paciente/${id}`)
                .subscribe((response: any) => { 
                    resolve(response);
                }, reject);
      });  
  }

  getUsuarios():  Observable<User[]> {

    return  this._httpClient.get<User[]>(`${this.urlLocal}user`).pipe(
      tap((usuarios) => {
          this._usuarios.next(usuarios);
      })
    );

  }

  putUsuario(form): Promise<any> {

    return new Promise((resolve, reject) => {
      this._httpClient.put(`${this.urlLocal}user/${form.id}`, form)
          .subscribe((response: any) => {
              resolve(response);
          }, reject);
    });

  }

  postUsuario(form): Promise<any> {

    return new Promise((resolve, reject) => {
        this._httpClient.post(`${this.urlLocal}user/register`, form)
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
    });

  }

  deleteUsuario(id): Promise<any>
    {
     
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${this.urlLocal}user/${id}`)
                .subscribe((response: any) => { 
                    resolve(response);
                }, reject);
      });  
  }
}