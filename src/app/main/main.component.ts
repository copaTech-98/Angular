import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { File, SharedDataService } from "../shared/shared-data.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnChanges {
  codigoJavaScriptActivo = false;
  etiquetaBlack = `<span class="etiqueta-black"></span>`;
  idRoot: any = "";
  constructor(
    private sharedDataService: SharedDataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log("se ejecuta");
    this.idRoot = this.route.snapshot.paramMap.get("id")
      ? this.route.snapshot.paramMap.get("id")
      : "";
    console.log("id", this.idRoot);
    const editorCode = document.getElementById("editor-code");
    if (editorCode) {
      editorCode.addEventListener("focus", () => {
        this.codigoJavaScriptActivo = true;
        console.log("focus element");
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("cambios", changes["editorContent"]);
    if (changes["editorContent"] && !changes["editorContent"].firstChange) {
      // La propiedad editorContent ha cambiado (y no es el primer cambio)
      console.log("Cambios");
      this.aplicarEstilosPalabrasClave();
    }
    console.log("se ejecuta");
    const editorCode = document.getElementById("editor-code");
    if (editorCode) {
      editorCode.addEventListener("focus", () => {
        this.codigoJavaScriptActivo = true;
        console.log("focus element");
      });
    }
  }
  get editorContent(): string {
    return this.sharedDataService.editorContent; // Obtiene el contenido del editor desde el servicio
  }
  get nameDocument(): File {
    return this.sharedDataService.nameDocument; // Obtiene el contenido del editor desde el servicio
  }

  set editorContent(content: string) {
    this.sharedDataService.editorContent = content;
    if (this.codigoJavaScriptActivo) {
      this.aplicarEstilosPalabrasClave();
    }
  }

  config: AngularEditorConfig = {
    editable: true,
    sanitize: false,
    width: "100%",
    height: "400px",
    minHeight: "5rem",
    placeholder: "Ingresa el texto aqui..",
    translate: "no",
    defaultParagraphSeparator: "",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };
  alternarCodigoJavaScript(
    executeCommandFn: (command: string, value?: any) => void
  ) {
    this.codigoJavaScriptActivo = !this.codigoJavaScriptActivo;
    const codigoJavaScript = `
    <div class="code-js">
    <div class="code-header">
     <div>Javascript <i class="fa-brands fa-square-js"></i></div>
      <ul>
        <li>
          <span class="buble"></span>
        </li>
        <li>
          <span class="buble"></span>
        </li>
        <li>
          <span class="buble"></span>
        </li>
      </ul>
    </div>
    <div class="code-code" id="editor-code">// Tu código JavaScript aquí</div>
  </div>
    `;

    if (this.codigoJavaScriptActivo) {
      executeCommandFn("insertHtml", codigoJavaScript);
    } else {
      this.sharedDataService.editorContent += `<br/><div>Nueva linea</div>`;
    }
  }

  aplicarEstilosPalabrasClave(): SafeHtml {
    // Obtén el contenido del editor
    let content = this.editorContent;

    // Expresión regular para buscar las palabras clave que no están dentro de etiquetas <span>
    const regexVar = /(?<!<span[^>]*>)(const|let|var)(?!<\/span>)/g;
    const regexFun = /(?<!<span[^>]*>)(function|for|foreach)(?!<\/span>)/g;

    // Reemplaza las ocurrencias de palabras clave con estilos
    content = content.replace(
      regexFun,
      (match) =>
        `<span class="func-container"><span class="func">${match}</span><span>  _name</span></span>`
    );
    content = content.replace(
      regexVar,
      (match) =>
        `<span class="keyword-container"><span class="keyword">${match}</span><span>  _name</span></span>`
    );

    this.sharedDataService.editorContent = content;
    // Marcar el contenido como seguro para usarlo en la vista
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
