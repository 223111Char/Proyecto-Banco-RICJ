import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioGerente } from './inicio-gerente';

describe('InicioGerente', () => {
  let component: InicioGerente;
  let fixture: ComponentFixture<InicioGerente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioGerente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioGerente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
