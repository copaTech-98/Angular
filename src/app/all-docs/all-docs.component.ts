import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Folder, SharedDataService } from "../shared/shared-data.service";
import { SweetAlertService } from "../sweet-alert.service";

@Component({
  selector: "app-all-docs",
  templateUrl: "./all-docs.component.html",
  styleUrls: ["./all-docs.component.scss"],
})
export class AllDocsComponent implements OnInit {
  toolsOpen = false;
  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private sweetAlertService: SweetAlertService
  ) {}
  get folders(): Array<Folder> {
    return this.sharedDataService.folders;
  }
  ngOnInit(): void {
    this.http.get<any>(`${this.apiUrl}/api/folders/groups/roots`).subscribe(
      (response) => {
        this.sharedDataService.updateFolders(response);
        console.log("FOLDERS", this.folders);
      },
      (error) => {
        console.error(error.message);
      }
    );
  }

  get apiUrl(): string {
    return this.sharedDataService.apiUrl; // Obtiene el contenido del editor desde el servicio
  }
  get loadingData(): boolean {
    return this.sharedDataService.loadingData;
  }
  async createFolder() {
    this.sweetAlertService.promptForRootFolder().then((response) => {
      if (response.isConfirmed) {
        this.http
          .post<any>(this.apiUrl + "/api/folders", {
            name: response.value.nombre,
            description: response.value.descripcion,
            root: true,
          })
          .subscribe(
            (response) => {
              // La carpeta se creó exitosamente, puedes actualizar la vista o realizar otras acciones necesarias
              console.log("Carpeta creada:", response);
              this.folders.push(response);
            },
            (error) => {
              // Maneja cualquier error que ocurra al crear la carpeta
              console.error("Error al crear la carpeta:", error);
            }
          );
      }
    });
  }
}
