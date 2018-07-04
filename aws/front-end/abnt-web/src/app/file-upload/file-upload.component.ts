import { Component, OnInit } from '@angular/core';

import {FileUploadService} from './file-upload.service'
import {Message} from './message.model'


@Component({
  selector: 'abnt-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnInit {

  messages: Message[] = []
  detailLinkLabel: string
  formData:FormData = new FormData();
  apiEndPoint: string = 'http://localhost:8000'


  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.fileUploadService.openLocalCredentialsFile()
  }

  fileChange(event) {
    this.formData = new FormData();
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.fileUploadService.uploadfile(file)
        this.formData.append('file', file, file.name);
        this.formData.append('remark','File uploaded!')
      }
  }

  sendFile() {


    //this.fileUploadService.sendFile(this.formData)
    //          .subscribe(fileName => this.showErrorMessages(fileName['file']))
  }

  showErrorMessages(fileName: string) {
    this.fileUploadService.showErrorMessages(fileName)
                          .subscribe(messages => this.messages = messages)
  }

  showDetail(m: Message) {
    m.showDetail = (m.showDetail === undefined || !m.showDetail) ? true: false

    m.detailLinkLabel = m.showDetail ? 'Ocultar': 'Dica de correção'

    return false
  }

  isValid(): boolean {
    return this.formData.get('file') !== null
  }

}
