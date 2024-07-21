import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap, Power3 } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LastRecipesComponent } from './last-recipes/last-recipes.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LastRecipesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('iconSVG') iconSVG: ElementRef;
  @ViewChild('lastRecipes') lastRecipes: ElementRef;
  list = ["Bienvenue sur <b>DuFaitMaison.com</b>,",
    "Premier site de partage de recette entre particulier.",
    "Proposez vos recettes à d'autres internautes à travers le web!"
  ]
  el: any;
  chars: any;
  queue: any;
  frame: any;
  frameRequest: any;
  resolve: any;
  constructor() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }
  setText(newText: any) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    setTimeout(() => {
      this.update()
    }, 2000);

    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="char">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }


  ngOnInit(): void {
    const el = document.querySelector('.animed-text')
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)

    let counter = 0
    const next = () => {
      this.setText(this.list[counter]).then(() => {
        setTimeout(next, 800)
      })
      counter = (counter + 1) % this.list.length
    }

    next()
  }

  ngAfterViewInit() {
    this.animateImage();
    gsap.from(this.lastRecipes.nativeElement, {
      scrollTrigger: this.lastRecipes.nativeElement,
      x: 0,
      ease: 'elastic',
      duration: 1,
      delay: 1
    });
  }

  animateImage() {
    gsap.from(this.iconSVG.nativeElement, {
      opacity: 0,
      y: -200,
      ease: 'power3.out',
      duration: 2,
      delay: 1
    });
  }
}
