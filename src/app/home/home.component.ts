import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { SharedDataService } from "../shared/shared-data.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  EventType,
  Router,
} from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  idRoot: any = "";
  constructor(
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  get editorContent(): string {
    return this.sharedDataService.editorContent; // Obtiene el contenido del editor desde el servicio
  }
  ngOnInit(): void {
    this.idRoot = this.route.snapshot.paramMap.get("id")
      ? this.route.snapshot.paramMap.get("id")
      : "";
    this.changeDetectorRef.detectChanges();
  }

  goToEdit() {
    this.sharedDataService.loadingData = false;
    this.sharedDataService.updateloadingData(false);
    this.sharedDataService.updateEditorContent("");
    this.router.navigate(["/create", { id: this.idRoot }]);
  }
}
