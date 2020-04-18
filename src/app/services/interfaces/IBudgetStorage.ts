import {BudgetItem} from '../../../shared/models/budget-item.model';
import {Observable} from 'rxjs';

export interface IBudgetStorage {
  getItems(): Observable<BudgetItem[]>;
  addItem(item: BudgetItem): Observable<BudgetItem>;
  removeItem(item: BudgetItem): Observable<BudgetItem>;
  updateItem(oldItem: BudgetItem, newItem: BudgetItem): Observable<[BudgetItem, BudgetItem]>;
}
