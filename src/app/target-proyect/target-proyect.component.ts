import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { SharedDataService } from "../shared/shared-data.service";
import { SweetAlertService } from "../sweet-alert.service";
import { Router } from "@angular/router";
interface Folder {
  _id: string;
  name: string;
  parentId: string;
  isExpanded: boolean;
  root: boolean;
  description: string;
}
@Component({
  selector: "app-target-proyect",
  templateUrl: "./target-proyect.component.html",
  styleUrls: ["./target-proyect.component.scss"],
})
export class TargetProyectComponent {
  @Input() folder: Folder;
  @Input() folders: Array<Folder> = [];
  toolsOpen = false;
  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private sweetAlertService: SweetAlertService,
    private router: Router
  ) {
    this.folder = {
      _id: "",
      name: "",
      parentId: "",
      isExpanded: false,
      root: false,
      description: "",
    };
  }
  toggleTools() {
    this.toolsOpen = !this.toolsOpen;
  }
  get apiUrl(): string {
    return this.sharedDataService.apiUrl; // Obtiene el contenido del editor desde el servicio
  }
  get loadingData(): boolean {
    return this.sharedDataService.loadingData;
  }
  deleteProject(id: string) {
    this.toolsOpen = false;
    this.sweetAlertService.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        const deleteUrl = `/api/folders/${id}`;

        this.http.delete(this.apiUrl + deleteUrl).subscribe(
          () => {
            // La carpeta o archivo se eliminó exitosamente, puedes actualizar la vista o realizar otras acciones necesarias
            console.log("Carpeta o archivo eliminado");
            this.folders = this.folders.filter((item) => item._id !== id);
            this.sharedDataService.updateFolders(this.folders);
          },
          (error) => {
            // Maneja cualquier error que ocurra al eliminar la carpeta o archivo
            console.error("Error al eliminar la carpeta o archivo:", error);
          }
        );
      }
    });
  }
  editProject(project: Folder) {
    this.toolsOpen = false;
    this.sweetAlertService.editForRootFolder(project).then((response) => {
      if (response.isConfirmed) {
        this.http
          .put<any>(this.apiUrl + "/api/folders/" + project._id, {
            name: response.value.nombre,
            description: response.value.descripcion,
            root: true,
          })
          .subscribe(
            (response) => {
              // La carpeta se creó exitosamente, puedes actualizar la vista o realizar otras acciones necesarias
              console.log("Carpeta creada:", response);
              this.folders = this.folders.map((folder) => {
                if (folder._id === project._id) {
                  folder = { ...response };
                }
                return folder;
              });
              this.sharedDataService.updateFolders(this.folders);
            },
            (error) => {
              // Maneja cualquier error que ocurra al crear la carpeta
              console.error("Error al crear la carpeta:", error);
            }
          );
      }
    });
  }
  goToFolders(id: string) {
    this.router.navigate(["/documentation", { id }]);
  }
}
