import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { reqHeaderInterceptor } from './core/interceptors/req-header.interceptor';
import { reqErrorInterceptor } from './core/interceptors/req-error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,withViewTransitions()), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([reqHeaderInterceptor,reqErrorInterceptor,loadingInterceptor])),
    importProvidersFrom(BrowserAnimationsModule,NgxSpinnerModule),

    provideToastr(),
  ]
};
