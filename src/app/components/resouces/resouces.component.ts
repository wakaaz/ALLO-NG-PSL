import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resouces',
  templateUrl: './resouces.component.html',
  styleUrls: ['./resouces.component.css']
})
export class ResoucesComponent implements OnInit {
  isLoading: boolean;

  isUrdu: boolean;
  isEnglish: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 6000);
  }

  selectedLanguage(lang: string): void {
    if (lang === 'urdu') {
      this.isUrdu = true;
      this.isEnglish = false;
    } else {
      this.isUrdu = false;
      this.isEnglish = true;
    }
    const versionModalBtn = document.getElementById('version-modal-btn');
    (versionModalBtn as HTMLButtonElement).click();
    const videoModalBtn = document.getElementById('video-modal');
    setTimeout(() => {
      (videoModalBtn as HTMLButtonElement).click();
    }, 500);
  }

}
