import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from "./login/login.component";
import { JourneyComponent } from "./journey/journey.component";
import { FeedbackComponent } from "./feedback/feedback.component";

export const APP_ROUTES = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'profiles/:username',
        component: ProfileComponent
    },
    {
        path: 'journey1',
        component: JourneyComponent
    },
    {
        path: 'feedback',
        component: FeedbackComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]