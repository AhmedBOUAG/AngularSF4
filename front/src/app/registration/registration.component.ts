import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { MessageHandlerService } from '../services/message-handler.service';
import { UserRegistration } from './registration';
import { RegistrationService } from '../services/registration.service';
import { NgbDateFRParserFormatter } from '../datepicker/ngb-date-fr-parser-formatter';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { CommonUtils } from '../Utils/CommonUtils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  messageHandler: any = {};
  parseDate = new NgbDateFRParserFormatter();
  loading: boolean = false;

  newUser: UserRegistration = new UserRegistration();

  constructor(
    private mhs: MessageHandlerService,
    private regUser: RegistrationService,
    public datePipe: DatePipe,
    private config: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.config.setTranslation(CommonUtils.i18PrimeNg.fr);
  }

  onUserRegistration(f: any) {
    this.loading = true;
    f.form.value.birthdate = moment(f.form.value.birthdate).format(CommonUtils.BD_DATE_FORMAT);
    this.regUser.registration(f.form.value).subscribe(
      (data: UserRegistration[]) => {
        let message = "Votre inscription a été effectuée avec succès."
        console.log(data);
        this.messageHandler = this.mhs.display('CREATE', message, false);
        this.loading = false;
        setTimeout(() => this.messageHandler = {}, 7000);
        f.reset();
      },
      (err) => {
        this.messageHandler = this.mhs.display(err, '', true);
        this.loading = false;
      },
      () => { this.loading = false; }
    );
  }
  onDateSelect(e: any) {

  }

}
