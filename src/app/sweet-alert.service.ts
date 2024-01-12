import { Injectable } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";
import { Folder } from "./shared/shared-data.service";

@Injectable({
  providedIn: "root",
})
export class SweetAlertService {
  constructor() {}
  async promptForRootFolder() {
    return Swal.fire({
      title: "Nueva Carpeta",
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre de la carpeta">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción de la carpeta"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return {
          nombre: (document.getElementById("nombre") as HTMLInputElement).value,
          descripcion: (
            document.getElementById("descripcion") as HTMLTextAreaElement
          ).value,
        };
      },
    });
  }
  async editForRootFolder(folder: Folder) {
    console.log(folder.name, folder.description);
    return Swal.fire({
      title: "Editar Carpeta",
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre de la carpeta" value="${folder.name}">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción de la carpeta">${folder.description}</textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return {
          nombre: (document.getElementById("nombre") as HTMLInputElement).value,
          descripcion: (
            document.getElementById("descripcion") as HTMLTextAreaElement
          ).value,
        };
      },
    });
  }
  confirmDelete(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
  }

  promptForFolderName(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: "Nueva Carpeta",
      input: "text",
      inputPlaceholder: "Nombre de la carpeta",
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
    });
  }

  promptForFileName(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: "Nuevo Archivo",
      input: "text",
      inputPlaceholder: "Nombre del archivo",
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
    });
  }
}
