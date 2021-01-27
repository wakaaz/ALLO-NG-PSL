import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarListComponent implements OnInit {

  constructor(
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    // if(this.genericService.)
    let length = 0;
    console.log(this.genericService.dictionaryCategories$);
    this.genericService.dictionaryCategories$.subscribe(x => {
      length = x.length;
    });
    if (length === 0) {
      this.genericService.getDictionaryCategories();
    }
  }
}
