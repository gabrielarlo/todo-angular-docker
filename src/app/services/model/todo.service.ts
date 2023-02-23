import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private _httpService: HttpService) {}

  async getList() {
    return await this._httpService.get('/todo/list');
  }

  async getDetails(id: number) {
    return await this._httpService.get('/todo/details/' + id);
  }

  async add(title: string, description: any) {
    return await this._httpService.post('/todo/add', {
      title,
      description,
    });
  }

  async update(id: number, title: string, description: any) {
    return await this._httpService.post('/todo/update/' + id, {
      title,
      description,
    });
  }

  async delete(id: number) {
    return await this._httpService.delete('/todo/delete/' + id);
  }

  async toggleStatus(id: number) {
    return await this._httpService.post('/todo/toggle-status/' + id, {});
  }
}
