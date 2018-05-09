import { AuthService } from './models/Auth/auth.service';
import { EventsService } from './models/events/events.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

export const services = [
	AuthService,
	CookieService,
	EventsService
]
