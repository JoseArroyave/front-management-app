import { IResponse, IResponseLogin, IUsers } from "@interfaces/services.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private http = inject(HttpClient);

  private readonly url = `${environment.apiUrl}users/`;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
    });
  }

  public createUser = (params: { email: string; password: string }): Observable<IResponse<string>> => {
    return this.http.post<IResponse<string>>(`${this.url}createUser`, params, {
      headers: this.getHeaders(),
    });
  };

  public searchUsers(searchTerm: string): Observable<IResponse<IUsers[]>> {
    return this.http.get<IResponse<IUsers[]>>(`${this.url}searchUsers?query=${searchTerm}`, {
      headers: this.getHeaders(),
    });
  }
}
