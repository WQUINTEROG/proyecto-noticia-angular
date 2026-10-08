import { ComponentFixture, TestBed } from '@angular/core/testing';

import { listadoComponent } from './listado';

describe('listado', () => {
  let component: listadoComponent;
  let fixture: ComponentFixture<listadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [listadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(listadoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
