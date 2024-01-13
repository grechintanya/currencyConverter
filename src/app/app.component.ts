import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { Observable } from 'rxjs';
import { Currency } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private currencyService: CurrencyService) { }

  currencyRates$: Observable<Currency[]> = this.currencyService.getCurrencyRates();

  ngOnInit(): void {

  }

}
