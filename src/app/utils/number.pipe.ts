import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roundNumber',
})

export class RoundNumber implements PipeTransform {
    transform(value: number) {
        return Number(value.toFixed(4))
    }
}
