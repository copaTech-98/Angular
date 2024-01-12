import { Component } from "@angular/core";
import { SharedDataService } from "../shared/shared-data.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  constructor(private sharedDataService: SharedDataService) {}
  get loadingData(): boolean {
    return this.sharedDataService.loadingData;
  }
  changeRoute() {
    this.sharedDataService.updateloadingData(false);
    this.sharedDataService.updateEditorContent("");
  }
}
