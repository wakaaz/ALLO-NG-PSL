import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-video',
  templateUrl: './sidebar-video.component.html',
  styleUrls: ['./sidebar-video.component.css']
})
export class SidebarVideoComponent implements OnInit {
  categoryName= 'Learning Tutorial';
  constructor() { }

  ngOnInit(): void {
  }

}
