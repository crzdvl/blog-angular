import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})
export class HeaderComponent
{
  currentUser
  faUser = faUser;
  
  constructor(
    private authService: AuthService,
  ) {
    this.authService.currentUser.subscribe((user)=>{
      this.currentUser = user
    })
  }

}
