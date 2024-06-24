import { MessagesComponent } from './messages.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReadMessagesComponent } from './read-messages/read-messages.component';
import { DfmCheckGuard } from '../dfm-check.guard';


const routes: Routes = [
    {
        path: '',
        component: MessagesComponent
    },
    {
        path: 'read/:uuid',
        component: ReadMessagesComponent,
        canActivate: [DfmCheckGuard], canActivateChild: [DfmCheckGuard],
        data: {
            title: 'Lire le message',
            breadcrumb: 'readMessage'
        }


    },
    {
        path: '**',
        component: MessagesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    declarations: []
})
export class MessagesRoutingModule { }
