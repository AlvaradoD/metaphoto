import { Pipe, PipeTransform } from '@angular/core'
import { LangService } from '../services/lang.service';

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {

    result: string

    constructor(private langService: LangService) { }

    transform(value: string, code?: string): Promise<string> {
        return this.langService.get('MN'+code, value)
        .then(msg => {
            return msg
        })
    }
}