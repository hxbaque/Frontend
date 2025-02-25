import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeDialogoComponent } from './mensaje-dialogo.component';

describe('MensajeDialogoComponent', () => {
  let component: MensajeDialogoComponent;
  let fixture: ComponentFixture<MensajeDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeDialogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
