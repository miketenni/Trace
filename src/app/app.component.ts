import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './project/Navbar/navbar/navbar.component';
import { FooterComponent } from './project/Footer/footer/footer.component';
import { SideBarComponent } from './project/Sidebar/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,FooterComponent,SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Trace';
}
