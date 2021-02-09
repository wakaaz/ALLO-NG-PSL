import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarVideoComponent } from './sidebar-video.component';

describe('SidebarVideoComponent', () => {
  let component: SidebarVideoComponent;
  let fixture: ComponentFixture<SidebarVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
