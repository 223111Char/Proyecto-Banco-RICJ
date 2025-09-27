import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerYcon } from './ter-ycon';

describe('TerYcon', () => {
  let component: TerYcon;
  let fixture: ComponentFixture<TerYcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerYcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerYcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
