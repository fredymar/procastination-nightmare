import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
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
import { CalendarComponent } from './components/mainappcomponents/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EventComponent } from './components/mainappcomponents/calendar/event/event.component';
import { registerLocaleData } from '@angular/common';
import localeEs from "@angular/common/locales/es";
import { CountingComponent } from './components/mainappcomponents/counting/counting.component';
import { CreateComponentComponent } from './components/mainappcomponents/counting/create-component/create-component.component';
import { HistoryComponent } from './components/mainappcomponents/counting/history/history.component';
import { TransactionComponent } from './components/mainappcomponents/counting/transaction/transaction.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
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
    CalendarComponent,
    EventComponent,
    CountingComponent,
    CreateComponentComponent,
    HistoryComponent,
    TransactionComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
