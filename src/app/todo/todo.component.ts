import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../services/model/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  list: Todo[] = [];
  selectedItem: Todo | undefined;
  incomplete: number = 0;
  complete: number = 0;

  id: any;
  title: string = '';
  description: string = '';

  loading = false;
  editMode = false;

  constructor(private _todoService: TodoService) {}

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    const res = await this._todoService.getList();
    if (res != null) {
      this.list = res.list;
      this.incomplete = res.incomplete;
      this.complete = res.complete;
    }
  }

  async submit() {
    this.loading = true;
    if (this.id == undefined) {
      const res = await this._todoService.add(this.title, this.description);
      console.log(res);
      if (res != null) {
        this.getList();
      }
      this.loading = false;
    } else {
      const res = await this._todoService.update(
        this.id,
        this.title,
        this.description
      );
      if (res != null) {
        this.getList();
      }
      this.loading = false;
    }
  }

  async delete(id: number) {
    this.loading = true;
    this.editMode = false;
    const res = await this._todoService.delete(id);
    if (res != null) {
      this.getList();
    }
    this.loading = false;
  }

  selectItem(item: Todo) {
    this.id = item.id;
    this.title = item.title;
    this.description = item.description;
    this.selectedItem = item;
  }

  async toggle(id: number) {
    if (!this.loading) {
      this.loading = true;
      const res = await this._todoService.toggleStatus(id);
      if (res != null) {
        this.getList();
      }
      this.loading = false;
    }
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
