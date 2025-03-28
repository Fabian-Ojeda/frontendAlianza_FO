import {Component} from '@angular/core';
import {DialogNewClientComponent} from "../../components/dialog-new-client/dialog-new-client.component";

import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.css'
})
export class ClientsPageComponent {
  /**
   * Counter used to notify other components (like the client table) to re-fetch their data.
   * Each time a new client is created, this value is incremented, which can be passed as an
   * input to child components to trigger data updates.
   */

  notifyReadData= 0;
  /**
   * Constructor to inject the Angular Material dialog service.
   *
   * @param dialog Dialog service for opening modal dialogs.
   */

  constructor(
    private dialog: MatDialog
  ) {
  }
  /**
   * Opens a dialog to create a new client.
   * Utilizes `DialogNewClientComponent` for the dialog content.
   *
   * After the dialog is closed, it checks the result. If a client was successfully created
   * (i.e., the dialog returns `true`), it increments the `notifyReadData` counter to notify
   * the child components to refresh their data.
   */

  openDialogCreateUser(){
    const dialogRef = this.dialog.open(DialogNewClientComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.notifyReadData++;
      }
    });
  }
}
