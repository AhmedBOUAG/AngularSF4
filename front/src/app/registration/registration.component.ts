import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { MessageHandlerService } from '../services/message-handler.service';
import { UserRegistration } from './registration';
import { RegistrationService } from '../services/registration.service';
import { NgbDateFRParserFormatter } from '../datepicker/ngb-date-fr-parser-formatter';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { CommonUtils } from '../Utils/CommonUtils';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  parseDate = new NgbDateFRParserFormatter();
  loading: boolean = false;
  errorMessages = null;

  newUser: UserRegistration = new UserRegistration();

  constructor(
    private mhs: MessageHandlerService,
    private regUser: RegistrationService,
    public datePipe: DatePipe,
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.config.setTranslation(CommonUtils.i18PrimeNg.fr);
  }

  onUserRegistration(f: any) {
    this.loading = true;
    this.errorMessages = null;
    f.form.value.birthdate = moment(f.form.value.birthdate).format(CommonUtils.BD_DATE_FORMAT);
    this.regUser.registration(f.form.value).subscribe(
      (data: UserRegistration[]) => {
        this.loading = false;
        this.messageService.add(this.mhs.display(CommonUtils.CREATE, CommonUtils.messageToast.userRegistrationSuccess, false));
        f.reset();
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      },
      (err) => {
        console.log('err', err);
        //this.messageService.add(this.mhs.display(err, '', true));
        this.errorMessages = err;
        this.loading = false;
      },
      () => { this.loading = false; }
    );
  }
  onDateSelect(e: any) {

  }

}
