import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerFuncionarioComponent } from './timer-funcionario.component';

describe('TimerFuncionarioComponent', () => {
  let component: TimerFuncionarioComponent;
  let fixture: ComponentFixture<TimerFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerFuncionarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimerFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
