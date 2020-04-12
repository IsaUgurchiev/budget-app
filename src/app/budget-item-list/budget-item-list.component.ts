import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BudgetItem} from '../../shared/models/budget-item.model';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})
export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem;
  @Output() removeItem: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();

  constructor() { }

  ngOnInit(): void {
  }

  onRemoveItem(item: BudgetItem) {
    this.removeItem.emit(item);
  }
}
