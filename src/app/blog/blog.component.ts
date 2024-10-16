import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  categories = ['Technology', 'Health', 'Lifestyle', 'Education', 'Travel'];
  posts = [
    {
      title: 'Post Title 1',
      description: 'This is a short description of the blog post. It provides a brief overview of the content to entice readers to read more.'
    },
    {
      title: 'Post Title 2',
      description: 'This blog post covers various aspects of maintaining a healthy lifestyle, including diet and exercise tips.'
    }
  ];

  chatMessages = [
    { user: 'John', text: 'Hey, has anyone tried the new tech from XYZ?' },
    { user: 'Jane', text: 'Yes! It\'s amazing. Totally worth checking out.' }
  ];

  newMessage = '';

  constructor(private router: Router) {}
  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatMessages.push({ user: 'You', text: this.newMessage });
      this.newMessage = '';
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
