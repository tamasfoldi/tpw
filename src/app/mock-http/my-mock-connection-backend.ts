import { ConnectionBackend, Connection, Request } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MyMockConnectionBackend extends ConnectionBackend {
  createConnection(request: Request): Connection {
    return { request: request, response: null, readyState: null };
  }
}
