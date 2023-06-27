import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { TeamComponent } from './components/team/team.component';
import { MainappComponent } from './routes/mainapp/mainapp.component';
import { TasktablesComponent } from './components/mainappcomponents/tasktables/tasktables.component';
import { BarscontainerComponent } from './components/mainappcomponents/barscontainer/barscontainer.component';
import { HabitsComponent } from './components/mainappcomponents/habits/habits.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/mainappcomponents/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EventComponent } from './components/mainappcomponents/calendar/event/event.component';
import { registerLocaleData } from '@angular/common';
import localeEs from "@angular/common/locales/es";
import { CountingComponent } from './components/mainappcomponents/counting/counting.component';
import { CreateComponentComponent } from './components/mainappcomponents/counting/create-component/create-component.component';
import { HistoryComponent } from './components/mainappcomponents/counting/history/history.component';
import { TransactionComponent } from './components/mainappcomponents/counting/transaction/transaction.component';
<<<<<<< HEAD
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
=======
import { TextFieldComponent } from './components/mainappcomponents/tasktables/text-field/text-field.component';
import { StateModalComponent } from './components/mainappcomponents/tasktables/state-modal/state-modal.component';
>>>>>>> 3fa6249cb338cac836e86cd7dfc7b9823715761d
registerLocaleData(localeEs)



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    PortfolioComponent,
    TestimonialsComponent,
    TeamComponent,
    MainappComponent,
    TasktablesComponent,
    BarscontainerComponent,
    HabitsComponent,
    CalendarComponent,
    EventComponent,
    CountingComponent,
    CreateComponentComponent,
    HistoryComponent,
    TransactionComponent,
<<<<<<< HEAD
    LoginComponent,
    RegisterComponent
=======
    TextFieldComponent,
    StateModalComponent
>>>>>>> 3fa6249cb338cac836e86cd7dfc7b9823715761d
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    CommonModule,
    DatePipe
  ],
  providers: [
    {provide: LOCALE_ID,
      useValue: 'es'
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
