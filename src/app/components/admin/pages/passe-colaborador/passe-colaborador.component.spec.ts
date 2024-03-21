import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasseColaboradorComponent } from './passe-colaborador.component';

describe('PasseColaboradorComponent', () => {
  let component: PasseColaboradorComponent;
  let fixture: ComponentFixture<PasseColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasseColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasseColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
