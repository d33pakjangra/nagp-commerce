import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      this.addUpdateItems(EntityTypes.products, products).then((success) => {
        this.logger.info('products data seeded: ', success);
      });
    });

    this.http.get<User[]>(`${baseUrl}/users.json`).subscribe((users: User[]) => {
      this.addUpdateItems(EntityTypes.users, users).then((success) => {
        this.logger.info('users data seeded: ', success);
      });
    });
  }

  deleteDatabase() {
    indexedDB.deleteDatabase(this.dbName);
  }

  addUpdateItems<T>(entityType: string, items: T[]) {
    return new Promise<Boolean>((resolve) => {
      var connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        let database = connectionRequest.result;

        let transaction = database.transaction(entityType, 'readwrite');
        var store = transaction.objectStore(entityType);
        items.forEach((item) => {
          store.put(item);
        });

        transaction.oncomplete = () => {
          resolve(true);
        };
      };
    });
  }

  getAll<T>(entityType: string): Promise<T[]> {
    return new Promise<T[]>((resolve) => {
      var connectionRequest = indexedDB.open(this.dbName);

      connectionRequest.onsuccess = () => {
        let database = connectionRequest.result;

        let transaction = database.transaction(entityType);
        var store = transaction.objectStore(entityType);
        var getall = store.getAll();

        getall.onsuccess = (event: any) => {
          resolve(event.target.result);
        };
      };
    });
  }

  deleteExistingItems(entityType: string, items: string[]) {
    return new Promise<Boolean>((resolve) => {
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
            resolve(true);
          };
        } catch (e) {
          this.logger.log('error while deleting data', e);
          resolve(false);
        }
      };
    });
  }
}
