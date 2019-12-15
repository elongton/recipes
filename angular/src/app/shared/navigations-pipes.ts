import { map } from 'rxjs/operators';


export const redirectToHomeOrLogin = map((user: firebase.User) => user ? [''] : ['login']);