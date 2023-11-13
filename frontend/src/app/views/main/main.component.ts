import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ServiceType} from "../../../types/service.type";
import {ArticleType} from "../../../types/article.type";
import {ArticleService} from "../../shared/services/article.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../shared/services/category.service";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  articles: ArticleType[] = [];
  isShowPopup: boolean = false;
  isPopupConsultation: boolean = false;
  isPopupSuccess: boolean = false;

  customOptionsMainCarousel: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 0,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  };

  proposals = [
    {
      preTitle: 'Предложение месяца',
      title: 'Продвижение в Instagram для вашего бизнеса -15%!',
      service: 'Реклама',
      text: '',
      image: 'image-1.png',
    },
    {
      preTitle: 'Акция',
      title: 'Нужен грамотный копирайтер?',
      service: 'Копирайтинг',
      text: 'Весь декабрь у нас действует акция на работу копирайтера.',
      image: 'image-2.png',
    },
    {
      preTitle: 'Новость дня',
      title: '6 место в ТОП-10 SMM-агенств Москвы!',
      service: 'Продвижение',
      text: 'Мы благодарим каждого, кто голосовал за нас!',
      image: 'image-3.png',
    },
  ];

  services: ServiceType[] = [
    {
      image: 'service-1.png',
      title: 'Создание сайтов',
      text: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: '7 500',
    },
    {
      image: 'service-2.png',
      title: 'Продвижение',
      text: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: '3 500',
    },
    {
      image: 'service-3.png',
      title: 'Реклама',
      text: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы. ',
      price: '1 000',
    },
    {
      image: 'service-4.png',
      title: 'Копирайтинг',
      text: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: '750',
    },
  ];

  advantages = [
    {
      number: '1',
      span: 'Мастерски вовлекаем аудиторию в процесс. ',
      text: 'Мы увеличиваем процент вовлечённости за короткий промежуток времени.'
    },
    {
      number: '2',
      span: 'Разрабатываем бомбическую визуальную концепцию. ',
      text: 'Наши специалисты знают как создать уникальный образ вашего проекта.'
    },
    {
      number: '3',
      span: 'Создаём мощные воронки с помощью текстов. ',
      text: 'Наши копирайтеры создают не только вкусные текста, но и классные воронки.'
    },
    {
      number: '4',
      span: 'Помогаем продавать больше. ',
      text: 'Мы не только помогаем разработать стратегию по продажам, но также корректируем её под нужды заказчика.'
    },
  ];

  reviews = [
    {
      image: 'review1.png',
      name: 'Станислав',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.',
    },
    {
      image: 'review2.png',
      name: 'Алёна',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.',
    },
    {
      image: 'review3.png',
      name: 'Мария',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
    {
      image: 'review4.jpg',
      name: 'Аделина',
      text: 'Спасибо большое за мою обновлённую коллекцию суккулентов! Сервис просто на 5+: быстро, удобно, недорого. Что ещё нужно клиенту для счастья?'
    },
    {
      image: 'review5.jpg',
      name: 'Марина',
      text: 'Для меня всегда важным аспектом было наличие не только физического магазина, но и онлайн-маркета, ведь не всегда есть возможность прийти на место. Ещё нигде не встречала такого огромного ассортимента!'
    },
    {
      image: 'review6.jpg',
      name: 'Ирина',
      text: 'Хочу поблагодарить консультанта Ирину за помощь в выборе цветка для моей жены. Я ещё никогда не видел такого трепетного отношения к весьма непростому клиенту, которому сложно угодить! Сервис – огонь!'
    },

  ];

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: false
  }

  constructor(private articleService: ArticleService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder,
              private categoryService: CategoryService
  ) {
  }

  popupForm: FormGroup = this.fb.group({
    service: ['', Validators.required],
    name: ['', [Validators.required, Validators.pattern(/([А-Я]{1}[а-яё]{1,23})/)]],
    phone: ['', [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]],
  });

  ngOnInit(): void {
    this.articleService.getPopularArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
      })
  }

  showPopup(service: string | null) {
    if (service) {
      this.isShowPopup = true;
      this.isPopupConsultation = true;
      this.popupForm.reset();
      this.popupForm.get('service')?.setValue(service);
    }
  }

  showPopupSuccess() {
    this.isShowPopup = true;
    this.isPopupConsultation = false;
    this.isPopupSuccess = true;
    this.requestConsultation();
  }

  hidePopup() {
    this.isShowPopup = false;
  }

  hideShowPopupSuccess() {
    this.router.navigate(['/']);
    this.isShowPopup = false;
    this.isPopupSuccess = false;
  }

  requestConsultation() {
    this.categoryService.requestConsultation(this.popupForm.value.name,
      this.popupForm.value.phone, this.popupForm.value.service, 'order')
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data.error) {
            this._snackBar.open(data.message);
            throw new Error(data.message);
          }

          // this.isPopupConsultation = false;
          // this.isPopupSuccess = true;
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка оформления заказа');
          }
        }
      })
  }
}
