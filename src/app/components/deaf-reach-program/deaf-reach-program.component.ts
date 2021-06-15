import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deaf-reach-program',
  templateUrl: './deaf-reach-program.component.html',
  styleUrls: ['./deaf-reach-program.component.css']
})
export class DeafReachProgramComponent implements OnInit {

  isLoading: boolean;
  constructor() { }

  ngOnInit(): void {
     this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 6000);
  }

}
