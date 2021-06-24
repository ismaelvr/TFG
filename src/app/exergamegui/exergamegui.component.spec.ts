import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExergameGUIComponent } from './exergamegui.component';

describe('GUIComponent', () => {
  let component: ExergameGUIComponent;
  let fixture: ComponentFixture<ExergameGUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExergameGUIComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExergameGUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
