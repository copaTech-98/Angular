import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  DocumentData,
  SharedDataService,
  Folder,
  File,
} from "../shared/shared-data.service";
import { SweetAlertService } from "../sweet-alert.service";

// Define una interfaz para la estructura de datos

@Component({
  selector: "app-document-list",
  templateUrl: "./document-list.component.html",
  styleUrls: ["./document-list.component.scss"],
})
export class DocumentListComponent implements OnInit, OnChanges {
  @Input() folderId: string = "";
  @Input() parent: DocumentData;
  @Input() document: DocumentData; // Usa la interfaz para tipificar la propiedad de entrada
  subfoldersLoaded = false;
  toolsOpen = false;

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private sweetAlertService: SweetAlertService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.document = {
      folder: {
        _id: "",
        name: "",
        parentId: "",
        isExpanded: false,
        root: false,
        description: "",
      },
      files: [],
      folders: [],
    };
    this.parent = {
      folder: {
        _id: "",
        name: "",
        parentId: "",
        isExpanded: false,
        root: false,
        description: "",
      },
      files: [],
      folders: [],
    };
  }

  ngOnInit(): void {
    if (!this.loadingData) {
      console.log("documentlist", this.folderId);
      this.loadDocumentData();
    }
    this.changeDetectorRef.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetectorRef.detectChanges();
    console.log("Cambio", changes["folderId"]);
    if (changes["folderId"] && !changes["folderId"].firstChange) {
      // Realizar la solicitud de datos cuando folderId cambia y no es la primera vez
      console.log("SE EJECUTA");
      this.loadDocumentData();
    }
  }

  get apiUrl(): string {
    return this.sharedDataService.apiUrl; // Obtiene el contenido del editor desde el servicio
  }
  get loadingData(): boolean {
    return this.sharedDataService.loadingData;
  }

  handleToolsOpen() {
    this.toolsOpen = !this.toolsOpen;
  }
  loadDocumentData() {
    this.document = {
      folder: {
        _id: "",
        name: "",
        parentId: "",
        isExpanded: false,
        root: false,
        description: "",
      },
      files: [],
      folders: [],
    };
    console.log("FOLDER ID", this.folderId);
    this.http
      .get<DocumentData>(
        this.apiUrl + "/api/files-and-folders/" + this.folderId
      )
      .subscribe(
        (data) => {
          console.log("DESDE EL SERVER", data);

          this.document = data;
          this.document.folder.isExpanded = true;
          this.sharedDataService.systemData = data;
          this.sharedDataService.updateloadingData(true); // Marca los datos como cargados
        },
        (error) => {
          console.error("error al cargar carpetas", error);
          this.sharedDataService.updateloadingData(true);
        }
      );
  }

  loadFileContent(file: any) {
    this.sharedDataService.updateEditorContent(file.content);
    this.sharedDataService.updateNameDocument(file);
  }

  toggleFolder(document: Folder) {
    if (!document.isExpanded) {
      this.subfoldersLoaded = false; // Oculta las subcarpetas al cerrar una carpeta
    }
    document.isExpanded = !document.isExpanded;
  }

  // Método para cargar las subcarpetas
  loadSubfolders() {
    this.subfoldersLoaded = true; // Cuando se cargan las subcarpetas, subfoldersLoaded se establece en true
  }
  createFolder() {
    this.sweetAlertService.promptForFolderName().then((result) => {
      if (result.isConfirmed && result.value) {
        const folderName = result.value;
        const parentId = this.document.folder._id; // Obtén el ID de la carpeta padre

        this.http
          .post<any>(this.apiUrl + "/api/folders", {
            name: folderName,
            parentId: parentId,
            root: parentId ? false : true,
          })
          .subscribe(
            (response) => {
              // La carpeta se creó exitosamente, puedes actualizar la vista o realizar otras acciones necesarias
              console.log("Carpeta creada:", response);
              const newFolder: DocumentData = {
                folder: response,
                folders: [],
                files: [],
              };
              console.log("CREATE FOLDER", newFolder);
              console.log("CREATE FOLDER", this.document);
              this.document.folders.push(newFolder);
            },
            (error) => {
              // Maneja cualquier error que ocurra al crear la carpeta
              console.error("Error al crear la carpeta:", error);
            }
          );
      }
    });
  }

  createFile() {
    this.sweetAlertService.promptForFileName().then((result) => {
      if (result.isConfirmed && result.value) {
        const fileName = result.value;
        const parentId = this.document.folder._id; // Obtén el ID de la carpeta padre

        this.http
          .post<any>(this.apiUrl + "/api/files", {
            name: fileName,
            parentId: parentId,
          })
          .subscribe(
            (response) => {
              // El archivo se creó exitosamente, puedes actualizar la vista o realizar otras acciones necesarias
              console.log("Archivo creado:", response);
              const newFile: File = {
                ...response,
              };
              console.log("CREATE FOLDER", newFile);
              console.log("CREATE FOLDER", this.document);
              this.document.files.push(newFile);
            },
            (error) => {
              // Maneja cualquier error que ocurra al crear el archivo
              console.error("Error al crear el archivo:", error);
            }
          );
      }
    });
  }

  deleteFolderOrFile(id: string, tipo: string) {
    this.sweetAlertService.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        const deleteUrl =
          tipo === "folder" ? `/api/folders/${id}` : `/api/files/${id}`;

        this.http.delete(this.apiUrl + deleteUrl).subscribe(
          () => {
            // La carpeta o archivo se eliminó exitosamente, puedes actualizar la vista o realizar otras acciones necesarias
            console.log("Carpeta o archivo eliminado");
            if (tipo === "folder") {
              const temp = this.parent.folders.filter((item) => {
                return item.folder._id !== id;
              });
              this.parent.folders = temp;
            }
            if (tipo === "file") {
              const temp2 = this.document.files.filter((item) => {
                return item._id !== id;
              });
              this.document.files = temp2;
            }
          },
          (error) => {
            // Maneja cualquier error que ocurra al eliminar la carpeta o archivo
            console.error("Error al eliminar la carpeta o archivo:", error);
          }
        );
      }
    });
  }
  // Función recursiva para eliminar un elemento de la estructura local
  renameFolder(id: string, root: boolean) {
    this.sweetAlertService.promptForFolderName().then((result) => {
      if (result.isConfirmed && result.value) {
        const name = result.value;
        this.http
          .put<any>(`${this.apiUrl}/api/folders/${id}`, {
            name,
            root,
          })
          .subscribe(
            (response) => {
              this.document.folder.name = name;
              this.toolsOpen = false;
            },
            (error) => {
              console.error(error);
            }
          );
      }
    });
  }
  generateUniqueId(): string {
    const timestamp = new Date().getTime();
    const randomPart = Math.random().toString(36).substr(2, 5); // Puedes ajustar la longitud según tus necesidades
    return `${timestamp}${randomPart}`;
  }
}
