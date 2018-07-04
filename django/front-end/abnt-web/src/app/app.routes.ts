import {Routes} from '@angular/router'
import {FileUploadComponent} from './file-upload/file-upload.component'
import {RulesComponent} from './rules/rules.component'


export const ROUTES: Routes = [
  {path: '', component: FileUploadComponent},
  {path: 'upload', component: FileUploadComponent},
  {path: 'rules', component: RulesComponent}
]
