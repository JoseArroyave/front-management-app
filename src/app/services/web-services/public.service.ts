import { IResponse, IResponseLogin } from "@interfaces/services.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PublicService {
  private http = inject(HttpClient);

  private readonly url = `${environment.apiUrl}login/`;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
    });
  }

  public login = (params: { username: string; password: string }) => {
    return this.http.post<IResponse<IResponseLogin>>(`${this.url}login`, params);
  };

  public signUp = (params: { username: string; password: string }) => {
    return this.http.post<IResponse<string>>(`${this.url}signUp`, params, {
      headers: this.getHeaders(),
    });
  };
}
