import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }   from './app.component';
import { UserComponent }   from './user.component';
import { UserService }   from './services/user.service';
import { Weekdays } from './pipes/weekdays.pipe';

@NgModule({
    declarations: [ AppComponent, UserComponent, Weekdays ],
    imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule ],
    bootstrap:    [ AppComponent ],
    providers:    [ UserService ] 
})
export class AppModule {}
