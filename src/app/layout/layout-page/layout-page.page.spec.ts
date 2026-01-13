import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPagePage } from './layout-page.page';

describe('LayoutPagePage', () => {
  let component: LayoutPagePage;
  let fixture: ComponentFixture<LayoutPagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutPagePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
