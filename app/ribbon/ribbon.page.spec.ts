import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RibbonPage } from './ribbon.page';

describe('RibbonPage', () => {
  let component: RibbonPage;
  let fixture: ComponentFixture<RibbonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RibbonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
