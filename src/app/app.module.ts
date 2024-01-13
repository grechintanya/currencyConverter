import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConverterComponent } from './converter/converter.component';
import { CurrencyService } from './services/currency.service';
import { DateToString, RoundNumber } from './utils';

@NgModule({
    declarations: [AppComponent, HeaderComponent, ConverterComponent, DateToString],
    imports: [BrowserModule, HttpClientModule, FormsModule],
    providers: [CurrencyService, RoundNumber],
    bootstrap: [AppComponent]
})
export class AppModule { }
