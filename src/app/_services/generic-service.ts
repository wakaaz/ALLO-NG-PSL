import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary } from '../_models/dictionary';
import { LocalStorageSerivce } from './local-storage-serivce';
import { RestSerivce } from './rest-serivce';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private _dictionaryCategories$ = new BehaviorSubject<Dictionary[]>([]);
  private _dictionaries$ = new BehaviorSubject<Dictionary[]>([]);
  constructor(
    private restService: RestSerivce,
    private localStorageSerivce: LocalStorageSerivce
  ) { }

  get dictionaryCategories$(): Observable<Dictionary[]> {
    return this._dictionaryCategories$.asObservable();
  }

  get dictionaries$(): Observable<Dictionary[]> {
    return this._dictionaries$.asObservable();
  }
  setEmptyDictionaries(): void {
    this._dictionaries$.next([]);
  }
  getDictionaryCategories(): void {
    this.restService.getRequest<any>('/Preferences').pipe(map(x => x.object.dictionary_categories)).subscribe(x => {
      this._dictionaryCategories$.next(x);
    });
  }

  getDictionaries(id: number): void {
    this.restService.postRequest('/Dictionary', { category_id: id }).pipe(map(x => x.data)).subscribe(x => {
      this._dictionaries$.next(x);
    });
  }
}
