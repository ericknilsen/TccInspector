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
  uploaded:boolean = false
  fileName:string = ""

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.fileUploadService.openLocalCredentialsFile()
  }

  fileChange(event) {    
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0]
        this.fileName = file.name
        this.fileUploadService.uploadfile(file)
        this.uploaded = true
    } else {
      this.fileName = ""
      this.uploaded = false
    }
  }
 

  showErrorMessages() {
    console.log(this.fileName)
    this.fileUploadService.showErrorMessages(this.fileName)
                          .subscribe(messages => this.messages = messages)
  }

  showDetail(m: Message) {
    m.showDetail = (m.showDetail === undefined || !m.showDetail) ? true: false

    m.detailLinkLabel = m.showDetail ? 'Ocultar': 'Dica de correção'

    return false
  }

  isValid(): boolean {
    return this.uploaded
  }

}
