import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Currency, RoundNumber } from '../utils';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-converter',
  standalone: false,
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent implements OnInit {
  constructor(private currencyService: CurrencyService, private roundNumber: RoundNumber) { }

  @Input() currencyList$!: Observable<Currency[]>;

  currencyList!: Currency[];
  amount1: number = 100;
  currency1: Currency | undefined;
  currency2: Currency | undefined;
  amount2!: number;
  crossRate!: number;
  reverseRate!: number;
  isCurrency1MenuOpen: boolean = false;
  isCurrency2MenuOpen: boolean = false;

  ngOnInit(): void {
    this.currencyList$.subscribe(currencies => {
      this.currencyList = currencies;
      this.currency1 = this.currencyService.getCurrencyByCc("USD", this.currencyList);
      this.currency2 = this.currencyService.getCurrencyByCc("EUR", this.currencyList);
      if (this.currency1 && this.currency2) {
        this.crossRate = this.currencyService.getCrossRate(this.currency1.cc,
          this.currency2.cc, this.currencyList);
        this.reverseRate = 1 / this.crossRate;
        this.amount2 = this.roundNumber.transform(this.amount1 * this.crossRate);
      }
    })
  }

  onInputFocused(event: any) {
    event.target.value = '';
  }

  onAmount1Changed() {
    this.amount2 = this.roundNumber.transform(this.amount1 * this.crossRate);
  }

  onAmount2Changed() {
    this.amount1 = this.roundNumber.transform(this.amount2 * this.reverseRate);
  }

  onButton1Clicked() {
    this.isCurrency1MenuOpen = true;
  }

  onButton2Clicked() {
    this.isCurrency2MenuOpen = true;
  }

  onCurrency1Changed(event: any) {
    this.currency1 = this.currencyService.getCurrencyByCc(event.target.value, this.currencyList);
    if (this.currency1 && this.currency2) {
      this.crossRate = this.currencyService.getCrossRate(this.currency1.cc,
        this.currency2.cc, this.currencyList);
      this.reverseRate = 1 / this.crossRate;
      this.amount2 = this.roundNumber.transform(this.amount1 * this.crossRate);
    }
    this.isCurrency1MenuOpen = false;
  }

  onCurrency2Changed(event: any) {
    this.currency2 = this.currencyService.getCurrencyByCc(event.target.value, this.currencyList);
    if (this.currency1 && this.currency2) {
      this.crossRate = this.currencyService.getCrossRate(this.currency1.cc,
        this.currency2.cc, this.currencyList);
      this.reverseRate = 1 / this.crossRate;
      this.amount1 = this.roundNumber.transform(this.amount2 * this.reverseRate);
    }
    this.isCurrency2MenuOpen = false;
  }


}