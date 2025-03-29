import {Component} from '@angular/core';
import {DialogNewClientComponent} from "../../components/dialog-new-client/dialog-new-client.component";
import {MatDialog} from "@angular/material/dialog";
import {ClientsService} from "../../services/clients.service";
import Swal from "sweetalert2";

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
    private dialog: MatDialog,
    private clientsService: ClientsService,
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
    const isMobile = window.innerWidth <= 700;
    const dialogRef = this.dialog.open(DialogNewClientComponent,
      {
      width: isMobile ? 'full-screen-dialog' : '40%',
        height: isMobile ? '90%' : '65%',
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.notifyReadData++;
      }
    });
  }
  /*
  * This method calls the backend service to generate and download a CSV file with client information.
  * Once the file is received as a Blob, it creates a temporary URL and triggers the download automatically.
  */
  generateCSVFile(){
    this.clientsService.generateCSVFile().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'clientes.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    });
  }
}
