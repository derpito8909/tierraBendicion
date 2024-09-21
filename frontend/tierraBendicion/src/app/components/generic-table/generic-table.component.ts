import {
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, CommonModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css',
})
export class GenericTableComponent<T>
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() data: T[] = []; // Datos que vendrán de un servicio o componente
  @Input()
  columns: { key: string; label: string }[] = []; // Columnas a mostrar
  dataSource = new MatTableDataSource<T>([]);
  // Se define un input para permitir la visibilidad de la columna de botones
  @Input() showActions: boolean = false;
  // Evento para emitir las acciones realizadas desde la tabla
  @Output() actionEvent: EventEmitter<{ action: string; element: T }> =
    new EventEmitter();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = []; // Claves de las columnas

  ngOnInit(): void {
    // Inicializa la tabla con los datos y las columnas
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Obtén las claves de las columnas a mostrar
      this.displayedColumns = this.columns.map((col) => col.key);

      // Si 'showActions' está habilitado, añadimos una columna para botones de acciones
      if (this.showActions) {
        this.displayedColumns.push('action');
      }
    }, 1000);
  }
  ngOnDestroy(): void {
    console.log('generic componet finished');
  }

  // Método que se ejecuta cuando un botón es clicado
  onAction(action: string, element: T) {
    this.actionEvent.emit({ action, element });
  }

  // Método para verificar si el valor es booleano
  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }
  // Método para verificar si el valor es fecha
  isDate(value: any): boolean {
    return value instanceof Date;
  }
  // Método para verificar si el valor es fecha
  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  // Método para verificar si el valor es texto
  isText(value: any): boolean {
    return typeof value === 'string';
  }

  // Método para verificar si el valor es texto
  isObject(value: any): boolean {
    return typeof value === 'object';
  }
  getValueForObject(value: any): string {
    if (value.length !== undefined) {
      for (const element of value) {
        if (element.name) {
          return element.name;
        } else {
          return element.fullname;
        }
      }
    }
    return '';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Método para aplicar filtros
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
