import { Component, OnInit } from '@angular/core';
import { I18n, CustomDatepickerI18n } from '../datepicker/datepicker-i18n';
import { MessageHandlerService } from '../services/message-handler.service';
import { UserRegistration } from './registration';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../services/registration.service';
import { NgbDateFRParserFormatter } from '../datepicker/ngb-date-fr-parser-formatter';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}
    ]

})
export class RegistrationComponent implements OnInit {
  messageHandler: any = {};
  parseDate = new NgbDateFRParserFormatter();
  birthdate = '';

  newUser: UserRegistration = new UserRegistration();

  constructor(private mhs: MessageHandlerService, private regUser: RegistrationService) { }

  ngOnInit(): void {
  }

  onUserRegistration(f: any) {
    let birthdate = f.form.value.birthdate;
    if (typeof f.form.value.birthdate === 'string') {
      //this.parseDate.dateCheck(birthdate); // a revoir plus tard
      f.form.value.birthdate = this.parseDate.parse(f.form.value.birthdate);
    }
    console.log(typeof f.form.value.birthdate);
    this.birthdate =  f.form.value.birthdate !== 'undefined' ? f.form.value.birthdate : this.birthdate ;
    f.form.value.birthdate = this.parseDate.formatDB(f.form.value.birthdate);
    //console.log(f.form.value);
    this.regUser.registration(f.form.value).subscribe(
      (data: UserRegistration[]) => {
        this.messageHandler = this.mhs.display('CREATE');
          setTimeout(() => this.messageHandler = {}, 7000);
          f.reset();
      },
      (err) => {
        this.messageHandler = this.mhs.display(err, true);
      }
    );
  }
  onDateSelect(e: any) {
    alert('Yooo' + e);
  }

}
