import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MainComponent } from "./main/main.component";
import { FormsModule } from "@angular/forms"; // Importa FormsModule
import { AngularEditorModule } from "@kolkov/angular-editor"; // Importa AngularEditorModule
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from './navbar/navbar.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { HeaderEditorComponent } from './header-editor/header-editor.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AllDocsComponent } from './all-docs/all-docs.component';
import { TargetProyectComponent } from './target-proyect/target-proyect.component';
@NgModule({
  declarations: [AppComponent, MainComponent, HomeComponent, NavbarComponent, DocumentListComponent, HeaderEditorComponent, LoadingSpinnerComponent, SearchBarComponent, AllDocsComponent, TargetProyectComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule, // Agrega FormsModule a los imports
    AngularEditorModule, // Agrega AngularEditorModule a los imports
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
