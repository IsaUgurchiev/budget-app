import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BudgetItem} from '../../shared/models/budget-item.model';
import {EditItemModalComponent} from '../edit-item-modal/edit-item-modal.component';
import {MatDialog} from '@angular/material/dialog';

export interface UpdateItemEvent {
  old: BudgetItem;
  new: BudgetItem;
}

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})
export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() removeItem: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() updateItem: EventEmitter<UpdateItemEvent> = new EventEmitter<UpdateItemEvent>();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onRemoveItem(item: BudgetItem) {
    this.removeItem.emit(item);
  }

  onCardClicked(item: BudgetItem) {
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateItem.emit({
          old: item,
          new: result
        });
      }
    });
  }
}
