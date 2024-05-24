import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPontosAdmComponent } from './lista-pontos-adm.component';

describe('ListaPontosAdmComponent', () => {
  let component: ListaPontosAdmComponent;
  let fixture: ComponentFixture<ListaPontosAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPontosAdmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPontosAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
