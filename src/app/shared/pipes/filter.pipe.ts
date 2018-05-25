import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
debugger;
            input = input.toLowerCase();
            return value.filter(function (el: any) {

debugger; return el.firstName.toLowerCase().indexOf(input) > -1;
            })
        }
        return value;
    }
}
