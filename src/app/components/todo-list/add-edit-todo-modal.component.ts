import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-add-edit-todo-modal',
  templateUrl: './add-edit-todo-modal.component.html',
  styleUrls: ['./add-edit-todo-modal.component.scss']
})
export class AddEditTodoModalComponent {
  @Input() isOpen: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() task: Partial<Todo> = {};

  @Output() save = new EventEmitter<Partial<Todo>>();
  @Output() close = new EventEmitter<void>();

  constructor() {}

  /** Handle form submission */
  submitForm(form: NgForm): void {
    if (form.valid) {
      this.save.emit(this.task);
      form.resetForm();
    }
  }

  /** Close modal */
  onClose(): void {
    this.close.emit();
  }
}
