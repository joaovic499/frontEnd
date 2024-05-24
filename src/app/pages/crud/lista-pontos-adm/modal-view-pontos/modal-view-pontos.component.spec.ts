import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewPontosComponent } from './modal-view-pontos.component';

describe('ModalViewPontosComponent', () => {
  let component: ModalViewPontosComponent;
  let fixture: ComponentFixture<ModalViewPontosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViewPontosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalViewPontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
