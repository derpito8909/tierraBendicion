import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { TokenService } from '../../services/token.service';
import { InicioComponent } from './inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgresoEsperaComponent } from '../../components/progreso-espera/progreso-espera.component';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
  let mockLoginService: any;
  let mockTokenService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockLoginService = jasmine.createSpyObj('LoginService', [
      'login',
      'setNameUser',
      'setRolUser',
    ]);
    mockTokenService = jasmine.createSpyObj('TokenService', ['setToken']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        InicioComponent,
        BrowserAnimationsModule,
        ProgresoEsperaComponent,
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería crear un formulario con campos de correo y contraseña', () => {
    expect(component.credentialForm.contains('email')).toBeTruthy();
    expect(component.credentialForm.contains('password')).toBeTruthy();
  });

  it('debería invalidar el formulario si los campos están vacíos', () => {
    const emailControl = component.credentialForm.get('email');
    const passwordControl = component.credentialForm.get('password');

    emailControl?.setValue('');
    passwordControl?.setValue('');

    expect(component.credentialForm.valid).toBeFalsy();
  });

  it('debería llamar a login cuando el formulario es válido', () => {
    const credentials = {
      email: 'davisito544@gmail.com',
      password: 'Maya@c19',
    };
    mockLoginService.login.and.returnValue(
      of({
        token: 'dummyToken',
        nameUser: 'David Rodriguez',
        rolUser: 'servidor',
      })
    );

    component.credentialForm.setValue(credentials);
    component.onLogin();

    expect(mockLoginService.login).toHaveBeenCalledWith(credentials);
  });

  it('debería manejar un inicio de sesión exitoso y llamar a TokenService.setToken', () => {
    const response = {
      token: 'dummyToken',
      nameUser: 'Test User',
      rolUser: 'Admin',
    };

    mockLoginService.login.and.returnValue(of(response));

    component.credentialForm.setValue({
      email: 'davisito544@gmail.com',
      password: 'Maya@:c19',
    });

    component.onLogin();

    expect(mockTokenService.setToken).toHaveBeenCalledWith('dummyToken');
    expect(mockLoginService.setNameUser).toHaveBeenCalledWith('Test User');
    expect(mockLoginService.setRolUser).toHaveBeenCalledWith('Admin');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/principal']);
    expect(component.errorMessage).toBeNull();
  });

  it('debería manejar un inicio de sesión fallido y mostrar un mensaje de error', () => {
    const error = { message: null };
    mockLoginService.login.and.returnValue(throwError(error));

    component.onLogin();

    //expect(component.showLoader).toBeFalsy();
    expect(component.errorMessage).toBe(error.message);
    expect(component.credentialForm.valid).toBeFalsy();
  });

  it('no debería llamar a login si el formulario es inválido', () => {
    component.credentialForm.setValue({ email: '', password: '' });

    component.onLogin();

    expect(mockLoginService.login).not.toHaveBeenCalled();
  });
});
