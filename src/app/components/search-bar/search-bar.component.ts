import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();

  // searchTerm: string = '';

  private lastValue: string = '';

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    //only emit it input transactions from non-empty to empty
    if (this.lastValue && !value) {
      this.searchTermChange.emit('');
    }
    this.searchTerm = value;
    this.lastValue = value;
  }

  triggerSearch() {
    this.searchTermChange.emit(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.lastValue = '';
    this.searchTermChange.emit('');
  }
}
