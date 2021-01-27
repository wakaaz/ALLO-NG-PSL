import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Dictionary } from 'src/app/_models/dictionary';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: [
    './dictionary.component.css'
  ],
  // encapsulation: ViewEncapsulation.None
})
export class DictionaryComponent implements OnInit {
  // dictionaries: Dictionary[];
  constructor(
    public genericService: GenericService
  ) { }

  ngOnInit(): void {
    this.genericService.getDictionaryCategories();
  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }
}
