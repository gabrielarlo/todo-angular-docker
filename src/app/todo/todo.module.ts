import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoComponent],
  imports: [CommonModule, TodoRoutingModule, FormsModule, ReactiveFormsModule],
})
export class TodoModule {}
