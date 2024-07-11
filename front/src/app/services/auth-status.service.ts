import { BehaviorSubject, Subject } from 'rxjs';

export class AuthStatusService {
    private isAuthenticated$ = new BehaviorSubject<boolean>(false);

    isloggededIn$ = this.isAuthenticated$.asObservable();

    setAuthenticated(status: boolean) {
        this.isAuthenticated$.next(status);
    }
}
