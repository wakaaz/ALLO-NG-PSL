import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedioListComponent } from './vedio-list.component';

describe('VedioListComponent', () => {
  let component: VedioListComponent;
  let fixture: ComponentFixture<VedioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VedioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VedioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
