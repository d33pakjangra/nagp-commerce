import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { EntityTypes } from '../constants';
import { Product } from '../models/product';
import { User } from '../models/user';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbName = 'nagp-commerce';

  constructor(private readonly logger: LoggerService, private readonly http: HttpClient) {
    this.setupDatabase();
  }

  private setupDatabase() {
    var connectionRequest = indexedDB.open(this.dbName);
    connectionRequest.onupgradeneeded = () => {
      let db = connectionRequest.result;
      for (let key in EntityTypes) {
        db.createObjectStore(`${EntityTypes[key]}`, { keyPath: 'id' });
      }
    };
  }

  seedDatabase() {
    const baseUrl = '/assets/templates';

    this.http.get<Product[]>(`${baseUrl}/products.json`).subscribe((products: Product[]) => {
      this.addUpdateItems(EntityTypes.products, products).subscribe(
        (success) => {
          this.logger.info('products data seeded: ', success);
        },
        (err) => {
          this.logger.error(err);
        }
      );
    });

    this.http.get<User[]>(`${baseUrl}/users.json`).subscribe((users: User[]) => {
      this.addUpdateItems(EntityTypes.users, users).subscribe(
        (success) => {
          this.logger.info('users data seeded: ', success);
        },
        (err) => {
          this.logger.error(err);
        }
      );
    });
  }

  deleteDatabase() {
    indexedDB.deleteDatabase(this.dbName);
  }

  addUpdateItems<T>(entityType: string, items: T[]): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      var connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        let database = connectionRequest.result;

        let transaction = database.transaction(entityType, 'readwrite');
        var store = transaction.objectStore(entityType);
        items.forEach((item) => {
          store.put(item);
        });

        transaction.oncomplete = () => {
          observer.next(true);
          observer.complete();
        };

        transaction.onerror = () => {
          observer.error(`error while putting item in indexed db store: ${transaction.error}`);
        };
      };
    });
  }

  getAll<T>(entityType: string): Observable<T[]> {
    return new Observable((observer: Observer<T[]>) => {
      var connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        let database = connectionRequest.result;

        let transaction = database.transaction(entityType);
        var store = transaction.objectStore(entityType);
        var entities = store.getAll();

        entities.onsuccess = (event: any) => {
          observer.next(event.target.result);
          observer.complete();
        };

        entities.onerror = () => {
          observer.error(`error while getting items from indexed db store: ${entities.error}`);
        };
      };
    });
  }

  getById<T>(entityType: string, id: number): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      var connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        let database = connectionRequest.result;

        let transaction = database.transaction(entityType);
        var store = transaction.objectStore(entityType);
        var entity = store.getKey(id);

        entity.onsuccess = (event: any) => {
          observer.next(event.target.result);
          observer.complete();
        };
        entity.onerror = () => {
          observer.error(`error while getting item from indexed db store: ${entity.error}`);
        };
      };
    });
  }

  deleteExistingItems(entityType: string, items: string[]): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      var connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        try {
          let database = connectionRequest.result;

          let transaction = database.transaction(entityType, 'readwrite');
          var store = transaction.objectStore(entityType);

          items.forEach((item) => {
            store.delete(item);
          });

          transaction.oncomplete = () => {
            observer.next(true);
            observer.complete();
          };
        } catch (e) {
          this.logger.error('error while deleting data', e);
          observer.next(false);
        }
      };
    });
  }
}
