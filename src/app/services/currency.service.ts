import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Currency } from '../utils/global.models';
import { baseURL, currencyCodes } from '../utils/global.constants';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
    constructor(private http: HttpClient) { }

    getCurrencyRates(): Observable<Currency[]> {
        return this.http.get<Currency[]>(baseURL).pipe(map(currencyRates => {
            currencyRates = currencyRates.filter(rate => currencyCodes.includes(rate.cc));
            return [...currencyRates,
            { r030: 980, cc: "UAH", txt: "Українська гривня", rate: 1 }
            ]
        }))
    }

    getCurrencyByCc(cc: string, CurrencyList: Currency[]) {
        return CurrencyList.find(cur => cur.cc === cc)
    };

    getCrossRate(cc1: string, cc2: string, CurrencyList: Currency[]): number {
        const cur1 = CurrencyList.find(cur => cur.cc === cc1)?.rate;
        const cur2 = CurrencyList.find(cur => cur.cc === cc2)?.rate;
        if (cur1 && cur2) return cur1 / cur2;
        return 0;
    }
}
