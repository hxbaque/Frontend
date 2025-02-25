import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPeliculasComponent } from './asignar-peliculas.component';

describe('AsignarPeliculasComponent', () => {
  let component: AsignarPeliculasComponent;
  let fixture: ComponentFixture<AsignarPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarPeliculasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
