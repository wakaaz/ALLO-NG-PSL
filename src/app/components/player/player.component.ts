import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Plyr from 'plyr';
import { Location } from '@angular/common';
import { GenericService } from 'src/app/_services/generic-service';
import { PlyrComponent } from 'ngx-plyr';

// import { PlyrDriver, PlyrDriverCreateParams, PlyrDriverUpdateSourceParams, PlyrDriverDestroyParams } from './plyr-driver';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  // get the component instance to have access to plyr instance
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;
  player: Plyr;
  isAutoPlay = false;
  id: number;
  categoryName = '';
  gradeId: number;
  categoryId: number;
  routerURL: string;
  currentlyPlayed: any = {
  };
  allVedios: any[] = [];
  remeaningVedios = [];
  // public player: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public genericService: GenericService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.setPlayer();
    const url = this.router.url;
    this.route.params.subscribe(params => {
      // this.genericService.getDictionaries(params.vedioId);
      // this.initialiseState(); // reset and set based on new parameter this time
      this.id = params.vedioId;
      this.categoryId = params.id;
      this.gradeId = params.gradeId;
      this.init(url);
      // this.player.play();
      // console.log(this.player.play());
      this.player.play();
    });

    // this.allVedios = this.genericService.dictionaries$.tak.value();
    // this.setCurrentlyPlayedVedio(this.id);
    // this.setPlayer();
    this.player.on('ended', ev => {
      if (this.isAutoPlay) {
        // alert('ended event');
        this.router.navigateByUrl(`${this.updateUrl(this.remeaningVedios[0].id)}/${this.remeaningVedios[0].id}`);
      }
    });
  }
  onAutoPlay(isChecked: boolean): void {
    this.isAutoPlay = isChecked;
  }
  init(url: string): void {
    // this.setPlayer();

    if (this.allVedios.length === 0) {
      if (url.split('/')[2] === 'dictionary') {
        this.genericService.getDictionaries(this.categoryId);
      } else if (url.split('/')[2] === 'story') {
        this.genericService.getStoriesVedios(this.categoryId);
      } else if (url.split('/')[2] === 'learningTutorials') {
        this.genericService.getLearningTutorialVideoList(this.gradeId, this.categoryId);
      }
    }


    if (url.split('/')[1] === 'play') {
      if (url.split('/')[2] === 'dictionary') {
        this.dictionariesSubscription();
        this.setObject(this.allVedios);
        this.routerURL =
          this.categoryName = 'PSL Dictionary';
      } else {
        if (url.split('/')[2] === 'story') {
          this.storiesSubscription();
          this.categoryName = 'Story';
          this.setObject(this.allVedios);
        } else if (url.split('/')[2] === 'learningTutorials') {
          this.learningVideoSubscription();
        }
      }
    }
  }
  updateUrl(id: string): string {
    const url = this.router.url;
    const urlArray = url.split('/');
    // urlArray[urlArray.length - 1] = id;
    // this.routerURL = urlArray.join('/');
    urlArray.pop();
    return urlArray.join('/');
  }
  storiesSubscription(): void {
    this.genericService.stories$
      .subscribe(data => {
        this.setObject(data);
      });
  }
  learningVideoSubscription(): void {
    this.genericService.learningTutorialVideos$
      .subscribe((data: any) => {
        this.setObject(data);
      });
  }

  dictionariesSubscription(): void {
    this.genericService.dictionaries$
      .subscribe(data => {
        this.setObject(data);
      });
  }
  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }

  setObject(data: any): void {
    this.allVedios = data;
    if (this.allVedios.length > 0) {
      this.setCurrentlyPlayedVedio(this.id);
      // this.setPlayer();
    }
  }

  setPlayer(): void {
    this.player = new Plyr('#plyrID', { captions: { active: true }, autoplay: true });
  }

  setPlayerCurrentSource(): void {
    // this.player.source = null;
    this.player.source =
    // [
    {
      type: 'video',
      title: this.currentlyPlayed.english_word,
      sources:
        [
          {
            src: this.decodeURIComponent(this.currentlyPlayed['1080p'].url),
            type: 'video/mp4',
            size: 1080,
          },
          {
            src: this.decodeURIComponent(this.currentlyPlayed['720p'].url),
            type: 'video/mp4',
            size: 720,
          },
          {
            src: this.decodeURIComponent(this.currentlyPlayed['480p'].url),
            type: 'video/mp4',
            size: 480,
          },
          {
            src: this.decodeURIComponent(this.currentlyPlayed['360p'].url),
            type: 'video/mp4',
            size: 360,
          },
          {
            src: this.decodeURIComponent(this.currentlyPlayed['240p'].url),
            type: 'video/mp4',
            size: 240,
          }
        ],
      poster: this.decodeURIComponent(this.currentlyPlayed.poster)
    };
    //  ];
    // this.player.play();
  }

  setCurrentlyPlayedVedio(id: number): void {
    const currentlyPlayedIndex = this.allVedios.findIndex(x => x.id == id);
    this.currentlyPlayed = this.allVedios[currentlyPlayedIndex];
    this.setPlayerCurrentSource();
    if (currentlyPlayedIndex === this.allVedios.length - 1) {
      this.remeaningVedios = [...this.allVedios];
      this.remeaningVedios.splice(this.allVedios.length - 1, 1);
    } else {
      this.remeaningVedios = this.allVedios.slice(currentlyPlayedIndex + 1);
    }
  }
  onBackClicked(): void {
    this.location.back();
  }
  onVideoEnded(): void {
    console.log('================Ended Video=================')
  }
}
