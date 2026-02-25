import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// ...import component classes here...
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [
    // ...component declarations here...
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
    // Add RouterModule.forRoot(routes) here if needed
  ],
  providers: [
  // AuthInterceptor is now registered as a function in app.config.ts
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [/* AppComponent */]
})
export class AppModule {}
