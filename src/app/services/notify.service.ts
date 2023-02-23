import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private _notifier: NotifierService) {}

  success(text: string) {
    this._show('success', text);
  }

  info(text: string) {
    this._show('info', text);
  }

  warning(text: string) {
    this._show('warning', text);
  }

  error(text: string) {
    this._show('error', text);
  }

  private _show(type: string, text: string) {
    this._notifier.notify(type, text);
  }
}
