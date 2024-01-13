import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../utils/global.models';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Input() currencyRates$!: Observable<Currency[]>

  USDRate: number | undefined;
  EURRate: number | undefined;
  date = new Date();

  ngOnInit(): void {
    this.currencyRates$.subscribe(rates => {
      this.USDRate = rates.find(rate => rate.cc === "USD")?.rate;
      this.EURRate = rates.find(rate => rate.cc === "EUR")?.rate;
    })
  }

}
