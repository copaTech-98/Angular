import { Component } from "@angular/core";
import { SharedDataService, File } from "../shared/shared-data.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-header-editor",
  templateUrl: "./header-editor.component.html",
  styleUrls: ["./header-editor.component.scss"],
})
export class HeaderEditorComponent {
  loading = false;
  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService
  ) {}

  get nameDocument(): File {
    return this.sharedDataService.nameDocument; // Obtiene el contenido del editor desde el servicio
  }
  get apiUrl(): string {
    return this.sharedDataService.apiUrl; // Obtiene el contenido del editor desde el servicio
  }
  get editorContent(): string {
    return this.sharedDataService.editorContent; // Obtiene el contenido del editor desde el servicio
  }

  saveDocument() {
    const id = this.nameDocument._id;
    const content = this.editorContent;
    if (id && content) {
      this.loading = true;
      this.http
        .put<File>(`${this.apiUrl}/api/files/${id}`, { content })
        .subscribe(
          (data) => {
            console.log("DESDE EL SERVER", data);
            this.sharedDataService.updateloadingData(true); // Marca los datos como cargados
            this.sharedDataService.updateNameDocument({ ...data, number: 0 });
            this.loading = false;
            this.nameDocument.content = content;
          },
          (error) => {
            console.error("SAVE DOCUMENT", error.message);
          }
        );
    }
  }
}
