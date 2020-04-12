import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BudgetItem} from '../../../shared/models/budget-item.model';

@Component({
  selector: 'app-budget-item-card',
  templateUrl: './budget-item-card.component.html',
  styleUrls: ['./budget-item-card.component.scss']
})
export class BudgetItemCardComponent implements OnInit {

  @Input() item: BudgetItem;
  @Output() removeItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() cardClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onRemoveItem() {
    this.removeItem.emit();
  }

  onCardClick() {
    this.cardClick.emit();
  }
}
