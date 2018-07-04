import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable'
import {RequestOptions} from '@angular/http'

import {Message} from './message.model'

@Injectable()
export class FileUploadService {

  apiEndPoint:string = 'http://localhost:8000'

  constructor(private http: HttpClient) {}


  sendFile(formData:FormData): Observable<FormData> {

    return this.http.post<FormData>(`${this.apiEndPoint}/upload/`, formData)
  }

  showErrorMessages(fileName: string): Observable<Message[]> {

    return this.http.get<Message[]>(`${this.apiEndPoint}/messages${fileName}/`)
  }

}
