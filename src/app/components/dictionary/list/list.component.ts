import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    public genericService: GenericService
  ) { }
  ngOnDestroy(): void {
    // this.genericService.setEmptyDictionaries();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genericService.getDictionaries(params.id);
      // this.initialiseState(); // reset and set based on new parameter this time
    });
  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }
}
