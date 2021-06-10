import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary } from '../_models/dictionary';
import { LearningTutorial, Subject as LearningSubjects } from '../_models/learning-tutorial';
import { Skill } from '../_models/skill';
import { Story } from '../_models/story';
import { TeacherTutorial } from '../_models/teacher-tutorial';
import { LocalStorageSerivce } from './local-storage-serivce';
import { VideoList } from '../_models/learning-tutorial'
import { RestSerivce } from './rest-serivce';
import { VideosListComponent } from '../components/learning-tutorial/videos-list/videos-list.component';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private _dictionaryCategories$ = new BehaviorSubject<Dictionary[]>(null);
  private _teacherTutorial$ = new BehaviorSubject<TeacherTutorial[]>(null);
  private _storyTypes$ = new BehaviorSubject<Story[]>(null);
  private _stories$ = new BehaviorSubject<Story[]>(null);
  private _learnginSkill$ = new BehaviorSubject<Skill[]>(null);
  private _learningTutorial$ = new BehaviorSubject<LearningTutorial[]>(null);
  private _learningTutorialVideos$ = new BehaviorSubject<VideoList[]>(null);

  // private _learningTutorialSubjects$ = new BehaviorSubject<LearningSubjects[]>(null);
  private _dictionaries$ = new BehaviorSubject<Dictionary[]>(null);
  private _learningVideo$ = new BehaviorSubject<VideoList[]>(null);
  private _teacherTutorialVideosList$ = new BehaviorSubject<VideoList[]>(null);

  constructor(
    // private http: HttpClient,
    private restService: RestSerivce,
    private localStorageSerivce: LocalStorageSerivce
  ) { }

  // dictionary categories subject
  get dictionaryCategories$(): Observable<Dictionary[]> {
    return this._dictionaryCategories$.asObservable();
  }
  // get dictionaries list
  get dictionaries$(): Observable<Dictionary[]> {
    return this._dictionaries$.asObservable();
  }

  get teacherTutorialVideosList$(): Observable<VideoList[]> {
    return this._teacherTutorialVideosList$.asObservable();
  }

  // get Teacher teturial grades
  get teacherTutorial$(): Observable<TeacherTutorial[]> {
    return this._teacherTutorial$.asObservable();
  }

  // get Story types
  get storyTypes$(): Observable<Story[]> {
    return this._storyTypes$.asObservable();
  }
  // get Story types
  get stories$(): Observable<Story[]> {
    return this._stories$.asObservable();
  }

  // get Learnign Skills
  get learnginSkill$(): Observable<Story[]> {
    return this._learnginSkill$.asObservable();
  }
  // get Learnign Skills
  get learningTutorial$(): Observable<LearningTutorial[]> {
    return this._learningTutorial$.asObservable();
  }
  get learningTutorialVideos$(): Observable<VideoList[]> {
    return this._learningTutorialVideos$.asObservable();
  }
  get learningVideo$(): Observable<VideoList[]> {
    return this._learningVideo$.asObservable();
  }
  // get learningTutorialSubjects$(id: number): Observable<LearningSubjects[]> {
  // return this._learningTutorialSubjects$.pipe(map(x = x.id == this.paramId)?.subjects)).asObservable();
  // }
  // Emtpty dictionary
  setEmptyDictionaries(): void {
    this._dictionaries$.next([]);
  }
  // Empty Teacher teturial
  setEmptyTeacherTutorials(): void {
    this._teacherTutorial$.next([]);
  }
  // Empty Stories
  setEmptyStories(): void {
    this._storyTypes$.next([]);
  }
  getDictionaryCategories(): void {
    this.restService.getRequest<any>('/Preferences').pipe(map(x => x.object)).subscribe(x => {
      this._dictionaryCategories$.next(x.dictionary_categories);
      this._teacherTutorial$.next(x.tut_grades);
      this._storyTypes$.next(x.story_types);
      this._learnginSkill$.next(x.life_skills);
      this._learningTutorial$.next(x.learning_tut_grades);
    });
  }

  getDictionaries(id: number): void {
    this.restService.postRequest('/Dictionary', { category_id: id }).pipe(map(x => x.data)).subscribe(x => {
      this._dictionaries$.next(x);
    });
  }
  getTeachTutorials(gradeId: number, subjectId: number): void {
    this.restService.postRequest('/Tutorials', { grade_id: gradeId, subject_id: subjectId }).pipe(map(x => x.data)).subscribe(x => {
      this._teacherTutorialVideosList$.next(x);
    })
  }
  getLearningTutorialVideoList(gradeIds: number, subjectId: number): void {
    this.restService.postRequest('/LearningTutorials', { grade_id: gradeIds, subject_id: subjectId }).pipe(map(x => x.data)).subscribe(x => {
      console.log('getLearningTutorialVideoList', x)
      this._learningTutorialVideos$.next(x);
    });
  }
  getLearningTutorials(id: number): void {
    this._learningTutorialVideos$.subscribe((videos: VideoList[]) => {
      const video = videos.filter((x => x.id === id));
      this._learningVideo$.next(videos);
      // console.log('videos', video);
    });
  }

  searchVideos(keyword: string): Observable<any> {
    // original url: /Search
    return this.restService.postRequest('/Search', { keyword });
    
    // For testing
    // return this.http.get('/assets/sample-json/search.sample.json');
  }

  // getStoriesVedios
  getStoriesVedios(id: number): void {
    this.restService.postRequest('/Stories', { type_id: id }).pipe(map(x => x.data)).subscribe(x => {
      this._stories$.next(x);
    });
  }
  // getTeacherTetorials
  getTeacherTetorials(gradeId: number, subjectId: number): void {
    this.restService.postRequest('/Tutorials', { grade_id: gradeId, subject_id: subjectId }).pipe(map(x => x.data)).subscribe(x => {
      this._stories$.next(x);
    });
  }

  getPreferences(): void {
    this.getDictionaryCategories();
  }

  recommendAWord(data: { name: string, email: string, word: string }): Observable<any> {
    return this.restService.postRequest('/RecommendAWord', data);
  }

  getToken(): void {
    this.restService.postAuth('/GuestLogin')
        .subscribe(x => {
          this.localStorageSerivce.setItem('api_token', x);
        });
  }

  sortMainArray(actualArray: Array<Dictionary | LearningSubjects | Story | VideoList >, sortBy: string): Array<any> {
    const sortedArray = actualArray.sort((a: any, b: any) => {
      if (sortBy === 'A') {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      } else {
        return b.title.charCodeAt(0) - a.title.charCodeAt(0);
      }
    });
    return sortedArray;
  }

  sortSubArray(actualArray: Array<any>, sortBy: string): Array<any> {
    const sortedArray = actualArray.sort((a: any, b: any) => {
      if (sortBy === 'A') {
        return a.english_word.charCodeAt(0) - b.english_word.charCodeAt(0);
      } else {
        return b.english_word.charCodeAt(0) - a.english_word.charCodeAt(0);
      }
    });
    return sortedArray;
  }
}
