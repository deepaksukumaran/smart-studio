import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MessageModalComponent } from '../components/message-modal/message-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  /* Public Methods */
  setDialogConfig(disableClose: boolean, autoFocus: boolean, width: string, data: any = null): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = disableClose;
    dialogConfig.autoFocus = autoFocus;
    dialogConfig.width = width;
    dialogConfig.data = data;
    return dialogConfig;
  }

  showMessage(message: string): void {
    const dialogConfig = this.setDialogConfig(true, false, 'auto', message);
    this.dialog.open(MessageModalComponent, dialogConfig);
  }
}
