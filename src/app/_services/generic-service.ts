import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary } from '../_models/dictionary';
import { LocalStorageSerivce } from './local-storage-serivce';
import { RestSerivce } from './rest-serivce';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(
    private restService: RestSerivce,
    private localStorageSerivce: LocalStorageSerivce
  ) { }

  getDictionaryCategories(): Observable<any> {
    return this.restService.getRequest<any>('/Preferences').pipe(map(x => x.object.dictionary_categories));
  }
}
