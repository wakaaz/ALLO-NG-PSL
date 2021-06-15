import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    headers: HttpHeaders;
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
    }

    /**
     * 
     * @param url to fetch the Video from other Origin
     * @returns the video as blob to download
     */
    getVideo(url: string): Observable<Blob> {
        return this.http.get(url, { responseType: 'blob' });
    }

    getLesson(url: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': '*/*',
                'Content-Type': 'application/*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                'Access-Control-Allow-Credentials': 'true'
            })
        };

        //   httpOptions.headers.append('Access-Control-Allow-Origin', '*');
        //   httpOptions.headers.append('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS');
        //   httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //   httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');}
        return this.http.get(url, httpOptions);
    }
}