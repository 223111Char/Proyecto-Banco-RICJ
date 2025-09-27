import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEjecutivo } from './inicio-ejecutivo';

describe('InicioEjecutivo', () => {
  let component: InicioEjecutivo;
  let fixture: ComponentFixture<InicioEjecutivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioEjecutivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioEjecutivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
