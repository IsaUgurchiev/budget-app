import {Injectable} from '@angular/core';
import {IBudgetStorage} from './interfaces/IBudgetStorage';
import {BudgetItem} from '../../shared/models/budget-item.model';
import {Observable, of as observableOf} from 'rxjs';

const STORAGE_KEY = 'budget_items';

@Injectable({
  providedIn: 'root'
})
export class BudgetService implements IBudgetStorage {

  private dataSource: Storage;
  private items: BudgetItem[];

  constructor() {
    if (!window.localStorage) {
      throw new Error('localStorage is not available');
    }

    this.dataSource = window.localStorage;

    if (this.isEmptyStore()) {
      this.createStore();
    }

    this.items = JSON.parse(this.dataSource.getItem(STORAGE_KEY)) as BudgetItem[];
  }

  isEmptyStore(): boolean {
    return this.dataSource.getItem(STORAGE_KEY) == null;
  }

  createStore(): void {
    this.dataSource.setItem(STORAGE_KEY, JSON.stringify([]));
  }

  getItems(): Observable<BudgetItem[]> {
    return observableOf(this.items);
  }

  addItem(item: BudgetItem): Observable<BudgetItem> {
    this.items.push(item);
    this.dataSource.setItem(STORAGE_KEY, JSON.stringify(this.items));
    return observableOf(item);
  }

  removeItem(item: BudgetItem): Observable<BudgetItem> {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.dataSource.setItem(STORAGE_KEY, JSON.stringify(this.items));
    return observableOf(item);
  }

  updateItem(oldItem: BudgetItem, newItem: BudgetItem): Observable<[BudgetItem, BudgetItem]> {
    this.items[this.items.indexOf(oldItem)] = newItem;
    this.dataSource.setItem(STORAGE_KEY, JSON.stringify(this.items));
    return observableOf([oldItem, newItem]);
  }
}
