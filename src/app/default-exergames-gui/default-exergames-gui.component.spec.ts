import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultExergamesGUIComponent } from './default-exergames-gui.component';

describe('DefaultExergamesGUIComponent', () => {
  let component: DefaultExergamesGUIComponent;
  let fixture: ComponentFixture<DefaultExergamesGUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultExergamesGUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultExergamesGUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
