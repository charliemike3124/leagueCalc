import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamppanelComponent } from './champpanel.component';

describe('ChamppanelComponent', () => {
  let component: ChamppanelComponent;
  let fixture: ComponentFixture<ChamppanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamppanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamppanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
