import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private headers: HttpHeaders = new HttpHeaders();
  private api: string = environment.api;

  constructor(
    private http: HttpClient,
    private _notify: NotifyService,
    private _spinner: NgxSpinnerService
  ) {
    this._getHeaders();
  }

  async get(
    uri: string,
    params: any = {},
    showSuccess: boolean = false
  ): Promise<any> {
    console.log('GET: ' + uri);

    this._spinner.show();
    this._getHeaders();
    const httpParams: HttpParams = this._getParams(params);
    const response$ = this.http.get<ApiResponse>(this.api + uri, {
      headers: this.headers,
      observe: 'body',
      params: httpParams,
      reportProgress: true,
      responseType: 'json',
    });
    const _res: ApiResponse = await lastValueFrom(response$);
    this._spinner.hide();
    if (!this._isSuccessful(_res, showSuccess)) return null;

    return _res.data;
  }

  async post(
    uri: string,
    body: any,
    showSuccess: boolean = false
  ): Promise<any> {
    console.log('POST: ' + uri);

    this._spinner.show();
    this._getHeaders();
    const response$ = this.http.post<ApiResponse>(this.api + uri, body, {
      headers: this.headers,
      observe: 'body',
      reportProgress: true,
      responseType: 'json',
    });
    const _res: ApiResponse = await lastValueFrom(response$);
    this._spinner.hide();
    if (!this._isSuccessful(_res, showSuccess)) return null;

    return _res.data;
  }

  async delete(uri: string, showSuccess: boolean = false): Promise<any> {
    console.log('DELETE: ' + uri);

    this._spinner.show();
    this._getHeaders();
    const response$ = this.http.delete<ApiResponse>(this.api + uri, {
      headers: this.headers,
      observe: 'body',
      reportProgress: true,
      responseType: 'json',
    });
    const _res: ApiResponse = await lastValueFrom(response$);
    this._spinner.hide();
    if (!this._isSuccessful(_res, showSuccess)) return null;

    return _res.data;
  }

  private _isSuccessful(
    response: ApiResponse,
    showSuccess: boolean = false
  ): boolean {
    if (response.code == 401 || response.code == 403) {
      this._notify.warning('Unauthorized!');
      return false;
    } else if (response.code == 412) {
      const data = response.data;
      Object.entries(data).forEach(([key, value]) => {
        const arr = value as Array<string>;
        this._notify.error(arr[0]);
      });
      return false;
    } else if (response.code == 400) {
      this._notify.error(response.msg);
      console.warn(response.msg);
      return false;
    } else if (response.code == 500) {
      this._notify.error(response.msg);
      console.warn(response.data);
      return false;
    }
    if (showSuccess) {
      this._notify.success(response.msg);
    }
    return true;
  }

  private _getHeaders() {
    this.headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
  }

  private _getParams(params: any = {}): HttpParams {
    let param: HttpParams = new HttpParams();

    Object.keys(params).forEach(function (key) {
      if (params[key] != undefined && params[key] != null) {
        param = param.set(key, params[key]);
      }
    });

    return param;
  }
}
