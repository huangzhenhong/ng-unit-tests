import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import {
  JsonpModule,
  Jsonp,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  Headers
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SearchService } from './search.service';

/*
We can test code that makes Http requests by using a MockBackend.

This requires that we configure our TestBed so that the Jsonp or Http services are created using the MockBackend.

We grab a reference to the instance of MockBackend that was injected and use it to simulate responses.

Since Http is asynchronous we use of one of the async testing mechanisms so we can write tests specs for our code.
*/

describe('SearchService', () => {

  let service: SearchService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonpModule],
      providers: [
        SearchService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Jsonp,
          useFactory: (backend, options) => new Jsonp(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    backend = TestBed.get(MockBackend);

    service = TestBed.get(SearchService);

  });

  it('search should return SearchItems', fakeAsync(() => {
    const response = {
      'resultCount': 1,
      'results': [
        {
          'artistId': 78500,
          'artistName': 'U2',
          'trackName': 'Beautiful Day',
          'artworkUrl60': 'image.jpg',
        }]
    };

    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response)
      }));
    });

    service.search('U2');
    tick();
    expect(service.results.length).toBe(1);
    expect(service.results[0].artist).toBe('U2');

  }));

  // it('should be created', inject([SearchService], (service: SearchService) => {
  //   expect(service).toBeTruthy();
  // }));
});
