import { Injectable } from '@angular/core';
import { MyRenderer } from './my-renderer';

@Injectable()
export class MyDomRenderer implements MyRenderer {
  invokeElementMethod(renderElement, methodName, args): any {
    ((renderElement))[methodName].apply(renderElement, args);
  }
}
