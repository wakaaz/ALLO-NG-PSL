import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Plyr from 'plyr';
import { Location } from '@angular/common';
import { GenericService } from 'src/app/_services/generic-service';
import { PlyrComponent } from 'ngx-plyr';
import { NgForm } from '@angular/forms';
import { VideoService } from './video.service';
import { Subscription } from 'rxjs';

// import { PlyrDriver, PlyrDriverCreateParams, PlyrDriverUpdateSourceParams, PlyrDriverDestroyParams } from './plyr-driver';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  // get the component instance to have access to plyr instance
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;
  player: Plyr;
  isAutoPlay = false;
  id: number;
  categoryName = '';
  gradeId: number;
  categoryId: number;
  oldCategoryId: number;
  routerURL: string;
  selectedVideoQuality: string = '';
  selectedLessons: Array<{ name: string, url: string }> = [];
  videoQualities: Array<string> = [];
  videoLink: string;
  currentlyPlayed: any = {
  };
  storiesData: Array<any>
  isStories: boolean;
  success: boolean;
  selectedLanguage = 'english';
  allVedios: any[] = [];
  remeaningVedios = [];

  dictionariesSubscription$: Subscription;
  learningTutorialsSubscription$: Subscription;
  storiesSubscription$: Subscription;
  teacherTutorialsSubscription$: Subscription;
  // public player: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public genericService: GenericService,
    private videoService: VideoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    console.log('Video Player Component!!!!');
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
    this.isStories = url.split('/')[2] === 'story';

    if (this.allVedios.length === 0 || this.categoryId !== this.oldCategoryId) {
      this.oldCategoryId = this.categoryId;
      if (url.split('/')[2] === 'dictionary') {
        this.genericService.getDictionaries(this.categoryId);
      } else if (url.split('/')[2] === 'story') {
        this.genericService.getStoriesVedios(this.categoryId);
      } else if (url.split('/')[2] === 'learningTutorials') {
        this.genericService.getLearningTutorialVideoList(this.gradeId, this.categoryId);
      } else if (url.split('/')[2] === 'teacherTutorials') {
        this.genericService.getTeachTutorials(this.gradeId, this.categoryId);
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
          this.categoryName = 'Learning Tutorials';
          this.learningVideoSubscription();
        } else if (url.split('/')[2] === 'teacherTutorials') {
          this.categoryName = 'Teacher Tutorials';
          this.tutorVideoSubscription();
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
    this.storiesSubscription$ = this.genericService.stories$
      .subscribe(data => {
        // this.storiesData = JSON.parse(JSON.stringify(data));
        // const sortedArray = this.selectedLanguageData('english');
        if (data !== null) {
          this.setObject(data);
        }
      });
  }
  learningVideoSubscription(): void {
    this.learningTutorialsSubscription$ = this.genericService.learningTutorialVideos$
      .subscribe((data: any) => {
        if (data !== null) {
          this.setObject(data);
        }
      });
  }

  tutorVideoSubscription(): void {
    this.teacherTutorialsSubscription$ = this.genericService.teacherTutorialVideosList$.subscribe(teacherTutorialVideos => {
      if (teacherTutorialVideos !== null) {
        this.setObject(teacherTutorialVideos);
      }
    });
  }

  dictionariesSubscription(): void {
    this.dictionariesSubscription$ = this.genericService.dictionaries$
      .subscribe(data => {
        if (data !== null) {
          this.setObject(data);
        }
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
          this.currentlyPlayed['1080p'].url && {
            src: this.decodeURIComponent(this.currentlyPlayed['1080p'].url),
            type: 'video/mp4',
            size: 1080,
          },
          this.currentlyPlayed['720p'].url && {
            src: this.decodeURIComponent(this.currentlyPlayed['720p'].url),
            type: 'video/mp4',
            size: 720,
          },
          this.currentlyPlayed['480p'].url && {
            src: this.decodeURIComponent(this.currentlyPlayed['480p'].url),
            type: 'video/mp4',
            size: 480,
          },
          this.currentlyPlayed['360p'].url && {
            src: this.decodeURIComponent(this.currentlyPlayed['360p'].url),
            type: 'video/mp4',
            size: 360,
          },
          this.currentlyPlayed['240p'].url && {
            src: this.decodeURIComponent(this.currentlyPlayed['240p'].url),
            type: 'video/mp4',
            size: 240,
          }
        ],
      poster: this.decodeURIComponent(this.currentlyPlayed.poster)
    };
    this.videoLink =
    this.currentlyPlayed['720p'].url ? this.decodeURIComponent(this.currentlyPlayed['720p'].url) : 
    this.currentlyPlayed['480p'].url ? this.decodeURIComponent(this.currentlyPlayed['480p'].url) : 
    this.currentlyPlayed['360p'].url ? this.decodeURIComponent(this.currentlyPlayed['360p'].url) : 
    this.currentlyPlayed['240p'].url ? this.decodeURIComponent(this.currentlyPlayed['240p'].url) : '';
    //  ];
    // this.player.play();
  }

  /**
   * Setting the available video qualities to show in the download popup
   */
  setAvailableQualities(): void {
    this.videoQualities = Object.keys(this.currentlyPlayed).filter(key => {
      if (this.currentlyPlayed[key]?.url) {
        return key;
      }
    });
  }

  setCurrentlyPlayedVedio(id: number): void {
    const currentlyPlayedIndex = this.allVedios.findIndex(x => x.id == id);
    if (currentlyPlayedIndex > -1) {
      this.currentlyPlayed = this.allVedios[currentlyPlayedIndex];
      this.setPlayerCurrentSource();
      this.setAvailableQualities();
      if (currentlyPlayedIndex === this.allVedios.length - 1) {
        this.remeaningVedios = [...this.allVedios];
        this.remeaningVedios.splice(this.allVedios.length - 1, 1);
      } else {
        this.remeaningVedios = this.allVedios.slice(currentlyPlayedIndex + 1);
      }
    }
  }
  onBackClicked(): void {
    this.location.back();
  }
  onVideoEnded(): void {
    console.log('================Ended Video=================')
  }

  selectedQuality(quality: string) {
    this.selectedVideoQuality = quality;
  }

  /**
   * First download the video to current origin so that the HTML Anchor tag
   * download button can download the video otherwise it will redirect the user to link of video
   * 
   * @param {NgForm} videoForm to reset the form after it has started the download
   * @returns void
   */
  downloadVideo(videoForm: NgForm): void {
    if (!this.selectedVideoQuality) {
      return;
    } else {
      const url = this.decodeURIComponent(this.currentlyPlayed[this.selectedVideoQuality].url);
      this.videoService.getVideo(url)
        .subscribe((blob) => {
          this.success = true;
          let blobUrl = window.URL.createObjectURL(blob);
          const urlParts = url.split('/');
          const name = urlParts[urlParts.length - 1];
          const anchor = document.createElement('a');
          anchor.href = blobUrl;
          anchor.download = name;
          setTimeout(() => {
            const button = document.getElementById('close-video');
            button.click();
            this.success = false;
          }, 5000);
          anchor.click();
          URL.revokeObjectURL(blobUrl);
          videoForm.resetForm();
        }, error => {
          console.log(`error`, error)
        });
    }
  }

  selecteLesson(document: { name: string, url: string }): void {
    const index = this.selectedLessons.findIndex(lesson => lesson.name === document.name);
    if (index > -1) {
      this.selectedLessons.splice(index, 1);
    } else {
      this.selectedLessons.push(document);
    }
  }

  downloadLessons(lessonForm: NgForm): void {
    if (this.selectedLessons.length === 0) {
      return;
    } else {
      this.selectedLessons.forEach(lesson => {
        const url = this.decodeURIComponent(lesson.url);
        this.videoService.getVideo(url)
          .subscribe((blob) => {
            this.success = true;
            setTimeout(() => {
              const button = document.getElementById('close-lesson');
              button.click();
              this.success = false;
            }, 5000);
            let blobUrl = window.URL.createObjectURL(blob);
            const urlParts = url.split('/');
            const name = urlParts[urlParts.length - 1];
            const anchor = document.createElement('a');
            anchor.href = blobUrl;
            anchor.download = name;
            anchor.click();
            URL.revokeObjectURL(blobUrl);
            lessonForm.resetForm();
          }, error => {
            console.log(`error`, error)
          });
      });
    }
  }

  shareToFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.videoLink.trim())}`,
      'fb-share',
      'width=555, height=600'
    );
  }

  shareToTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?&url=${encodeURIComponent(this.videoLink.trim())}`,
      'tweet',
      'width=555, height=600'
    );
  }

  shareToWhatsapp() {
    window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(this.videoLink.trim())}`, 'width=555, height=600');
  }

  copyLink() {
    const textarea = document.createElement('textarea');
    textarea.textContent = this.videoLink;
    document.body.appendChild(textarea);

    const selection = document.getSelection();
    const range = document.createRange();
    range.selectNode(textarea);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    selection.removeAllRanges();

    document.body.removeChild(textarea);
  }

  languageChanged(lang: string): void {
    // const selectedStories = this.selectedLanguageData(lang);
    // this.setObject(selectedStories);
  }

  selectedLanguageData(lang: string): any {
    if (lang === 'english') {
      return this.storiesData.filter(story => story.language === 'english');
    } else {
      return this.storiesData.filter(story => story.language !== 'english');
    }
  }

  ngOnDestroy(): void {
    this.player.destroy();
    if (this.storiesSubscription$) { this.storiesSubscription$.unsubscribe(); }
    if (this.learningTutorialsSubscription$) { this.learningTutorialsSubscription$.unsubscribe(); }
    if (this.teacherTutorialsSubscription$) { this.teacherTutorialsSubscription$.unsubscribe(); }
    if (this.dictionariesSubscription$) { this.dictionariesSubscription$.unsubscribe(); }
  }
}
