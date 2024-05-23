import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoPontoComponent } from './lancamento-ponto.component';

describe('LancamentoPontoComponent', () => {
  let component: LancamentoPontoComponent;
  let fixture: ComponentFixture<LancamentoPontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LancamentoPontoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LancamentoPontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
