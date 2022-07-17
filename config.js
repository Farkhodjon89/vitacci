const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const NOTIFICATIONS_CHANNEL = process.env.NOTIFICATIONS_CHANNEL;

const GRAPHQL_URL = 'https://wp.vitacci.uz/graphql';
const WP_URL = 'https://wp.vitacci.uz';

const META_DATA_FOR_PAGES = {
  '/catalog': {
    title: 'Каталог товаров интернет-магазина | Vitacci',
    description:
      'Женская обувь, женские сумки, браслеты, очки, перчатки и другие женские аксессуары в интернет магазине, в Ташкенте | Vitacci',
  },
  '/catalog?filter_onSale=true': {
    title: 'Каталог товаров со скидкой в магазине | Vitacci',
    description:
      'Женская обувь, женские сумки, браслеты, очки, перчатки и другие женские аксессуары со скидкой в интернет магазине | Vitacci',
  },
  '/catalog/': {
    keys: ['{categoryTitle}'],
    title: 'Красивые и качественные {categoryTitle} | Vitacci',
    description:
      '{categoryTitle} от Российско-Итальянского бренда Vitacci. Женский салон обуви, сумок и аксессуаров в Ташкенте. Только на Vitacci',
  },
  '/product/': {
    keys: ['{productTitle}', '{color}', '({sku})', '{price}'],
    title: '{productTitle} {color} ({sku}) | Vitacci',
    description:
      '{productTitle} за {price} UZS. Цвет: {color}. Купить {productTitle} в Ташкенте. Гарантия качества, только на Vitacci | {sku}',
  },
  '/blog/': {
    keys: ['{postTitle}', '{separator}', '{siteTitle}'],
    title: '{postTitle} | Vitacci',
  },
  '/about': {
    title: 'Информация о нашей компании | Vitacci',
    description:
      'Узнайте больше о нашей компании: Сколько лет на рынке? Как мы заслужили доверие клиентов? Сколько всего магазинов? И прочее..',
  },
  '/return': {
    title: 'Наша политика возврата и обмена | Vitacci',
    description:
      'Как вернуть товар обратно? Как заменить товар? Как получить деньги за возврат товара? Эта и другая информация на данной странице.',
  },
  '/delivery': {
    title: 'Информация о примерке и доставке | Vitacci',
    description:
      'Можно-ли примерить товар до покупки? Сколько стоит доставка, если товар не подошел? Сколько времени уходит на доставку?',
  },
  '/policy': {
    title: 'Политика конфиденциальности сайта | Vitacci',
    description:
      'Политика по обработке и защите персональных данных, Порядок сбора, хранения, передачи и других видов обработки данных',
  },
  '/payment': {
    title: 'Способы оплаты (Uzcard, Click, наличные...)  | Vitacci',
    description:
      'Как оплачивать через платежные системы Payme или Click? Нужна-ли предоплата? Можно ли оплачивать через карту Uzcard?',
  },
  '/installment': {
    title: 'Условия Рассрочки интернет-магазина | Vitacci',
    description:
      'Что такое рассрочка от бренда Vitacci? Как происходит процедура оформления? Оферта о предоставлении услуги для Ташкента.',
  },
  '/cart': {
    title: 'Корзина | Vitacci',
    description:
      'Товары, которые вы закинули в корзину. Редактируйте список, добавляйте и убавляйте товары по вашим нуждам. | Vitacci',
  },
  '/contacts': {
    title: 'Наши контакты и адреса магазинов | Vitacci',
    description:
      'Адреса магазинов Vitacci в городе Ташкенте. Контактные телефоны магазинов и их местоположение на карте. | Vitacci',
  },
  '/blog': {
    title: 'Статьи на тему моды и стиля, а также новости магазина | Vitacci',
    description:
      'Модные и трендовые тенденции, Советы по стилю, лайфхаки, правила покупки, способы улучшения гардероба и другие статьи блога.',
  },
  '/wishlist': {
    title: 'Ваши избранные товары | Vitacci',
    description:
      'Ваши избранные товары, которые вы отметили специальным значком. Редактируйте список, добавляйте и убавляйте товары | Vitacci',
  },
  '/terms': {
    title: 'Публичная офферта интернет-магазина | Vitacci',
    description:
      'Определения и термины, Общие положения, Цена товара, Оформление заказа, Доставка и передача товара Покупателю и прочее…',
  },
  '/faq': {
    title: 'Часто задаваемые вопросы | Vitacci',
    description:
      'Чье производство обуви? Обувь большемерит или маломерит? Сколько у вас филиалов? Подарочные сертификаты? Ответы здесь!',
  },
  '/warranty': {
    title: 'Условия Гарантии по состоянию продукции | Vitacci',
    description:
      'Гарантийные случаи, на что распространяется гарантия, а на что нет? Сколько дней со дня покупки должно пройти? | Vitacci',
  },
};

module.exports = {
  GRAPHQL_URL,
  WP_URL,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  TELEGRAM_BOT_TOKEN,
  META_DATA_FOR_PAGES,
  NOTIFICATIONS_CHANNEL,
};
