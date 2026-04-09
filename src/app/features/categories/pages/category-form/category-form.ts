import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryFacade } from '../../facades/category.service';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService, MessageService } from 'primeng/api';



@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CheckboxModule
  ],
  templateUrl: './category-form.html',
})
export class CategoryForm implements OnInit {

  form!: FormGroup;
  isEdit = false;
  existingCodes: string[] = [];
  originalCode: string = '';

  constructor(
    private fb: FormBuilder,
    private facade: CategoryFacade,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      code: ['', [Validators.required, this.codeExistsValidator]],
      name: ['', Validators.required],
      description: [''],
      status: [true]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;

      this.facade.categories$.subscribe(categories => {
        const category = categories.find(c => c.code === id);
        if (category) {
          this.form.patchValue(category);
        }
      });
    }

    this.facade.categories$.subscribe(categories => {
      this.existingCodes = categories.map(c => c.code);

      if (this.isEdit) {
        const id = this.route.snapshot.paramMap.get('id');
        this.originalCode = id || '';
      }
    });
  }

  codeExistsValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const exists = this.existingCodes.includes(control.value);

    if (this.isEdit && control.value === this.originalCode) {
      return null;
    }
    return exists ? { codeExists: true } : null;
  };

  onSubmit() {
    if (this.form.invalid) return;

    const value = this.form.value;

    if (this.isEdit) {
      this.facade.update(value as any).subscribe(() => {
        this.presentToast('success', 'Categoria actualizada', `Categoria ${value.name} ha sido actualizada correctamente.`);
        this.router.navigate(['/categories']);
      });
    } else {
      this.facade.create(value as any).subscribe(() => {
        this.presentToast('success', 'Categoria creada', `Categoria ${value.name} ha sido creada correctamente.`);
        this.router.navigate(['/categories']);
      });
    }
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
        this.facade.delete(code).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Categoría eliminada correctamente'
          });
        });
      }
    });
  }

  onBack() {
    this.router.navigate(['/categories']);
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
