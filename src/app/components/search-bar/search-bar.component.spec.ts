import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchTermChanges when magnifier is clicked', () => {
    spyOn(component.searchTermChange, 'emit');
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'batman';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.search-button'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.searchTermChange.emit).toHaveBeenCalledWith('batman');
  });

  it('should emit searchTermChanges when enter is pressed', () => {
    spyOn(component.searchTermChange, 'emit');
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'batman';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    input.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.searchTermChange.emit).toHaveBeenCalledWith('batman');
  });

  it('should clear button when searchTerm is not empty', () => {
    component.searchTerm = 'test';
    fixture.detectChanges();
    const clearBtn = fixture.debugElement.query(By.css('.clear-button'));

    expect(clearBtn).toBeTruthy();
  });

  it('should hide clear button when saerchTerm is empty', () => {
    component.searchTerm = '';
    fixture.detectChanges();
    const clearBtn = fixture.debugElement.query(By.css('.clear-button'));
    expect(clearBtn).toBeFalsy();
  });

  it('should claer searchTerma nd emit string when clear button is clicked', () => {
    component.searchTerm = 'something';
    fixture.detectChanges();
    spyOn(component.searchTermChange, 'emit');

    const clearBtn = fixture.debugElement.query(By.css('.clear-button'));
    clearBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.searchTerm).toBe('');
    expect(component.searchTermChange.emit).toHaveBeenCalledWith('');
  });
});
