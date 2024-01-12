import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { HomeComponent } from "./home/home.component";
import { AllDocsComponent } from "./all-docs/all-docs.component";
import { documentationGuard } from "./utils/guardRoute";

const routes: Routes = [
  { path: "", component: AllDocsComponent },
  {
    path: "documentation",
    component: HomeComponent,
  },
  { path: "create", component: MainComponent },
  { path: "all", component: AllDocsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
