import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDocsComponent } from './all-docs.component';

describe('AllDocsComponent', () => {
  let component: AllDocsComponent;
  let fixture: ComponentFixture<AllDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDocsComponent]
    });
    fixture = TestBed.createComponent(AllDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
