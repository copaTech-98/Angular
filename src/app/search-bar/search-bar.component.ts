import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Searchs, SharedDataService } from "../shared/shared-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent {
  valueSearch: string = "";
  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {}
  get searchs(): Searchs {
    return this.sharedDataService.searchs;
  }
  onChange(value: any) {
    const inputValue = (value.target as HTMLInputElement)?.value || "";
    this.valueSearch = inputValue;
    console.log(this.valueSearch);
    if (this.valueSearch !== "") {
      this.http
        .get<Searchs>(
          `${this.sharedDataService.apiUrl}/api/search/${this.valueSearch}`
        )
        .subscribe(
          (response) => {
            this.sharedDataService.updateSearchs(response);
            console.log(this.searchs);
          },
          (error) => {
            console.log("Error", error);
          }
        );
    }
  }
  closeModal() {
    this.valueSearch = "";
  }
  goToFile(id: string) {
    this.valueSearch = "";
    this.sharedDataService.updateloadingData(false);
    this.router.navigate(["/documentation", { id }]);
  }
}
