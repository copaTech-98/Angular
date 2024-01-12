import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetProyectComponent } from './target-proyect.component';

describe('TargetProyectComponent', () => {
  let component: TargetProyectComponent;
  let fixture: ComponentFixture<TargetProyectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetProyectComponent]
    });
    fixture = TestBed.createComponent(TargetProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
