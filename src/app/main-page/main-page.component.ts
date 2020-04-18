import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {BudgetService} from '../services/budget.service';
import {UpdateItemEvent} from '../budget-item-list/budget-item-list.component';
import {BudgetItem} from '../../shared/models/budget-item.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  budgetItems: BudgetItem[] = new Array<BudgetItem>();
  budgetItemsChanges = new Subject<BudgetItem>();

  totalBudget = 0;

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.getBudgetItems();

    this.budgetItemsChanges
      .pipe(
        startWith(null)
      )
      .subscribe(() => this.calculateTotalBudget());
  }

  // Todo copy items
  getBudgetItems(): void {
    this.budgetService.getItems()
      .subscribe(items => {
        this.budgetItems = [...items];
        this.budgetItemsChanges.next(items[0]);
      });
  }

  onAddItem(newItem: BudgetItem): void {
    this.budgetService.addItem(newItem)
      .subscribe((item: BudgetItem) => {
        this.budgetItems.push(item);
        this.budgetItemsChanges.next(item);
      });
  }

  onRemoveItem(item: BudgetItem): void {
    this.budgetService.removeItem(item)
      .subscribe((removedItem: BudgetItem) => {
        const index = this.budgetItems.indexOf(removedItem);
        this.budgetItems.splice(index, 1);
        this.budgetItemsChanges.next(item);
      });
  }

  onUpdateItem(updateItemEvent: UpdateItemEvent): void {
    this.budgetService.updateItem(updateItemEvent.old, updateItemEvent.new)
      .subscribe(([oldItem, newItem]) => {
          this.budgetItems[this.budgetItems.indexOf(oldItem)] = newItem;
          this.budgetItemsChanges.next(newItem);
      });
  }

  private calculateTotalBudget(): void {
    this.totalBudget = this.budgetItems.reduce((prev, {amount}) => {
      return prev + amount;
    }, 0);
  }
}
