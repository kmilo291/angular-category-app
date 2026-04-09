import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../../../core/models/category.model';
import { CategoryFacade } from '../../../../../features/categories/facades/category.service';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    FormsModule,
    IconField,
    InputIcon,
    ConfirmDialogModule
  ],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.scss']
})
export class CategoryList implements OnInit {

  categories: Category[] = [];
  loading: boolean = true;

  constructor(
    public facade: CategoryFacade,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.facade.categories$.subscribe(data => {
      this.categories = data;
      this.loading = false;
    });
  }

  onEdit(code: string) {
     this.router.navigate(['/categories', code]);
  }

  onCreate() {
    this.router.navigate(['/categories/new']);
  }

  onDelete(code: string) {
  this.confirmationService.confirm({
    message: '¿Seguro que deseas eliminar esta categoría?',
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',

    acceptLabel: 'Sí, eliminar',
    rejectLabel: 'Cancelar',

    rejectButtonStyleClass: 'p-button-danger',

    accept: () => {
      this.facade.delete(code).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Categoría eliminada correctamente',
            life: 3000
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la categoría'
          });
        }
      });
    }
  });
}

  onToggle(code: string) {
    this.facade.toggleStatus(code).subscribe();
    this.presentToast('info', 'Estado', `Categoria ${code} cambio su estado exitosamente.`);
  }

  presentToast(severity: 'success' | 'info' | 'warn' | 'error', summary?: string, detail?: string,) {
    // Implement toast notification using PrimeNG's MessageService
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000
    });
  }
}
