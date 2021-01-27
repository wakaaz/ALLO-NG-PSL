import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Plyr from 'plyr';
import { Location } from '@angular/common';
import { GenericService } from 'src/app/_services/generic-service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  id: number;
  categoryId: number;
  currentlyPlayed: any = {
  };
  allVedios: any[] = [];
  remeaningVedios = [];

  public player: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public genericService: GenericService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // this.genericService.getDictionaries(params.vedioId);
      // this.initialiseState(); // reset and set based on new parameter this time
      this.id = params.vedioId;
      this.categoryId = params.id;
    });
    this.setPlayer();
    this.genericService.dictionaries$
      .subscribe(d => {
        this.allVedios = d;
        if (this.allVedios.length > 0) {
          this.setCurrentlyPlayedVedio(this.id);
          this.setPlayer();
        }
      });
    if (this.allVedios.length === 0) {
      this.genericService.getDictionaries(this.categoryId);
    }

    // this.allVedios = this.genericService.dictionaries$.tak.value();
    // this.setCurrentlyPlayedVedio(this.id);
    // this.setPlayer();
  }

  decodeURIComponent(url: string): string {
    return decodeURIComponent(url);
  }

  setPlayer(): void {
    this.player = new Plyr('#plyrID', { captions: { active: true } });
  }

  setPlayerCurrentSource(): void {
    this.player.source = {
      type: 'video',
      title: this.currentlyPlayed.english_word,
      sources: [
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
}
