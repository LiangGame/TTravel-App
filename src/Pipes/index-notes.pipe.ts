import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexNotes'
})
export class IndexNotesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let new_Value = [];
    console.log(args);
    if(value){
      if(value!=''&&value!=null){
        if(value.length >= 4){
          for(let i = 0;i<args;i++){
            new_Value[i]=value[i]
          }
          console.log(new_Value);
          return new_Value;
        }else {
          return value
        }
      }
    }

  }

}
