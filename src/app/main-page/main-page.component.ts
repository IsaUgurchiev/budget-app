import { Component, OnInit } from '@angular/core';
import {BudgetItem} from '../../shared/models/budget-item.model';
import {UpdateItemEvent} from '../budget-item-list/budget-item-list.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  budgetItems: BudgetItem[] = new Array<BudgetItem>();
  totalBudget = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(newItem: BudgetItem) {
    this.budgetItems.push(newItem);
    this.calculateTotalBudget();
  }

  onRemoveItem(item: BudgetItem) {
    const index = this.budgetItems.indexOf(item);
    this.budgetItems.splice(index, 1);
    this.calculateTotalBudget();
  }

  onUpdateItem(updateItemEvent: UpdateItemEvent) {
    this.budgetItems[this.budgetItems.indexOf(updateItemEvent.old)] = updateItemEvent.new;
    this.calculateTotalBudget();
  }

  private calculateTotalBudget() {
    this.totalBudget = this.budgetItems.reduce((prev, {amount}) => {
      return prev + amount;
    }, 0);
  }
}
