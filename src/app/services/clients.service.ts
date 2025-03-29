import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {Client} from "../interfaces/client";
import { CLIENTS_API} from "../core/constants/http.api";
import {catchError, throwError} from "rxjs";
import {Message} from "../interfaces/message";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllClients(){
    return this.httpClient.get<Client[]>(CLIENTS_API.GET_ALL_CLIENTS).pipe(
      catchError((error: HttpErrorResponse)=>{
        if (error.status===HttpStatusCode.NotFound){
          return throwError(() => 'Not found');
        }
        return throwError(() => 'An error occurred in the request');
      })
    );
  }

  searchClientsBySharedKey(sharedkey:string){
    return this.httpClient.get<Client[]>(`${CLIENTS_API.GET_CLIENTS_BY_SHARED_KEY}/${sharedkey}`).pipe(
      catchError((error: HttpErrorResponse)=>{
        if (error.status===HttpStatusCode.NotFound){
          return throwError(() => 'Not found');
        }
        return throwError(() => 'An error occurred in the request');
      })
    );
  }

  createClient(client:Client){
    return this.httpClient.post<Message>(CLIENTS_API.POST_CREATE_CLIENT, client).pipe(
      catchError((error: HttpErrorResponse)=>{
        if (error.status===HttpStatusCode.NotFound){
          return throwError(() => 'Not found');
        }
        return throwError(() => 'An error occurred in the request');
      })
    )
  }

  generateCSVFile(){
    return this.httpClient.get(CLIENTS_API.GET_GENERATE_CSV_FILE, {responseType: 'blob'}).pipe(
      catchError((error: HttpErrorResponse)=>{
        if (error.status===HttpStatusCode.NotFound){
          return throwError(() => 'Not found');
        }
        return throwError(() => 'An error occurred in the request');
      })
    )
  }
}
