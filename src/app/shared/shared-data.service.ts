// shared-data.service.ts
import { Injectable, Input } from "@angular/core";

// Define una interfaz para la estructura de datos

export interface Folder {
  _id: string;
  name: string;
  parentId: string;
  isExpanded: boolean;
  root: boolean;
  description: string;
}
export interface DocumentData {
  folder: Folder;
  files: any[];
  folders: any[];
}
export interface File {
  _id: string;
  name: string;
  content: string;
  parentId: string;
  number: Number;
}
export interface Searchs {
  files: Array<File>;
  folders: Array<Folder>;
}
@Injectable({
  providedIn: "root",
})
export class SharedDataService {
  private _editorContent: string = "";
  private _FileDocument: File = {
    _id: "",
    name: "",
    parentId: "",
    content: "",
    number: 0,
  };
  private _API_URL: string = "http://localhost:3000";
  private _loading: boolean = false;
  private _folders: Array<Folder> = [];
  private _searchs: Searchs = { files: [], folders: [] };
  private _system: DocumentData = {
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

  updateFolders(content: Array<Folder>) {
    this._folders = content;
  }

  updateSearchs(content: Searchs) {
    this._searchs = content;
  }

  get searchs(): Searchs {
    return this._searchs;
  }

  set folders(content: Array<Folder>) {
    this._folders = content;
  }
  get folders(): Array<Folder> {
    return this._folders;
  }
  get systemData(): DocumentData {
    return this._system;
  }

  set systemData(content: DocumentData) {
    this._system = content;
  }

  get loadingData(): boolean {
    return this._loading;
  }

  set loadingData(content: boolean) {
    this._loading = content;
  }
  updateloadingData(content: boolean) {
    this._loading = content;
  }
  get apiUrl(): string {
    return this._API_URL;
  }
  get nameDocument(): File {
    return this._FileDocument;
  }
  set nameDocument(content: File) {
    this._FileDocument = content;
  }

  get editorContent(): string {
    return this._editorContent;
  }

  set editorContent(content: string) {
    this._editorContent = content;
  }

  updateEditorContent(content: string) {
    this.editorContent = content;
  }
  updateNameDocument(content: File) {
    this._FileDocument = content;
  }

  deleteFolder(id: string, arr: any) {
    let current = arr.folders;
    let temp = { ...arr };
    console.log("CURRENT", current);
    let encontrado = false;
    let index = 0;
    if (current) {
      temp.folders = current.filter((item: any) => {
        if (item.folder._id === id) {
          encontrado = true;
        }
        return item.folder._id !== id;
      });
      console.log("TEMP", temp);
      if (!encontrado) {
        console.log("recursion", index);
        this.deleteFolder(id, arr[index]);
      } else {
      }
    }
    this._system = temp;
    return temp;
  }
}
