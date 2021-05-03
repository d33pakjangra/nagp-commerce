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
    this.seedDatabase();
  }

  private setupDatabase(): void {
    const connectionRequest = indexedDB.open(this.dbName);
    connectionRequest.onupgradeneeded = () => {
      const db = connectionRequest.result;
      for (const entityType in EntityTypes) {
        if (EntityTypes.hasOwnProperty(entityType)) {
          db.createObjectStore(`${EntityTypes[entityType]}`, { keyPath: 'id' });
        }
      }
    };
  }

  seedDatabase(): void {
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

  deleteDatabase(): void {
    indexedDB.deleteDatabase(this.dbName);
  }

  addUpdateItems<T>(entityType: string, items: T[]): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        try {
          const database = connectionRequest.result;

          const transaction = database.transaction(entityType, 'readwrite');
          const store = transaction.objectStore(entityType);
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
        } catch (e) {
          observer.error(`error while putting item in indexed db store: ${e}`);
        }
      };
    });
  }

  getAll<T>(entityType: string): Observable<T[]> {
    return new Observable((observer: Observer<T[]>) => {
      const connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        try {
          const database = connectionRequest.result;

          const transaction = database.transaction(entityType);
          const store = transaction.objectStore(entityType);
          const entities = store.getAll();

          entities.onsuccess = (event: any) => {
            observer.next(event.target.result);
            observer.complete();
          };

          entities.onerror = () => {
            observer.error(`error while getting items from indexed db store: ${entities.error}`);
          };
        } catch (e) {
          observer.error(`error while getting items from indexed db store: ${e}`);
        }
      };
    });
  }

  getById<T>(entityType: string, id: string): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      const connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        try {
          const database = connectionRequest.result;

          const transaction = database.transaction(entityType);
          const store = transaction.objectStore(entityType);
          const entity = store.get(id);

          entity.onsuccess = (event: any) => {
            observer.next(event.target.result);
            observer.complete();
          };
          entity.onerror = () => {
            observer.error(`error while getting item from indexed db store: ${entity.error}`);
          };
        } catch (e) {
          observer.error(`error while getting item from indexed db store: ${e}`);
        }
      };
    });
  }

  deleteItemsByKeys(entityType: string, ids: string[]): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        try {
          const database = connectionRequest.result;

          const transaction = database.transaction(entityType, 'readwrite');
          const store = transaction.objectStore(entityType);

          ids.forEach((id) => {
            store.delete(id);
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

  deleteItemByKey(entityType: string, id: string): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        try {
          const database = connectionRequest.result;

          const transaction = database.transaction(entityType, 'readwrite');
          const store = transaction.objectStore(entityType);

          store.delete(id);

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
