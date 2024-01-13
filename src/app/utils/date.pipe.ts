import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDate',
})

export class DateToString implements PipeTransform {
    transform(date: Date) {
        const months = [
            "січня", "лютого", "березня", "квітня", "травня", "червня",
            "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
        ]
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
        return `${day} ${month} ${year} року`;
    }
}