import { Component } from '@angular/core';
import { GenericService } from './_services/generic-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PSL';
  constructor(private genericService: GenericService) {
    this.genericService.getToken();
  }
}
