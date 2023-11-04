import WooCommerceResApi from '@woocommerce/woocommerce-rest-api'
import format from 'string-template'
import axios from 'axios'

import {
  WP_URL,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  TELEGRAM_BOT_TOKEN,
  NOTIFICATIONS_CHANNEL,
} from '../../../config'
import { formatPrice } from '../../utils/functions'
const wc = new WooCommerceResApi({
  url: WP_URL,
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  version: 'wc/v3',
})

const newOrderTemplate = [
  '<b>Поступил заказ с Сайта</b>: {link}\n',
  '<b>Имя клиента</b>: {name}',
  '<b>Номер</b>: {number}',
  '<b>Сумма заказа</b>: {price} UZS',
  '<b>Адрес</b>: {location}',
  '<b>Оплата</b>: {method}',
  '<b>Кол-во товаров</b>: {amount}\n',
].join('\n')

export default async (req, res) => {
  if (req.method === 'POST') {
    const { order } = req.body

    let response

    try {
      response = await wc.post('orders', order)
    } catch (e) {
      res.end(JSON.stringify({ status: false, message: e.message }))
      return
    }

    const orderLink = `${WP_URL}/wp-admin/post.php?post=${response.data.id}&action=edit`

    const message = [
      format(newOrderTemplate, {
        link: `<a href="${orderLink}">#${response.data.id}</a>`,
        name: `${response.data.billing.first_name || ''} ${
          order.billing.last_name || ''
        }`,
        number: response.data.billing.phone,
        price: formatPrice(response.data.total),
        location: response.data.shipping.address_1,
        method: response.data.payment_method_title,
        amount: String(response.data.line_items.length),
      }),
    ]

    for (let i = 0; i < response.data.line_items.length; i++) {
      const product = response.data.line_items[i]

      message.push(
        `<b>${i + 1}. ${product.name} [${product.sku}] (${formatPrice(
          product.price
        )} UZS x${product.quantity})</b> Цвет: ${
          product?.meta_data?.find((el) => el?.key === 'pa_color')
            ?.display_value
        } Размер: ${
          product?.meta_data?.find((el) => el?.key === 'pa_size')?.display_value
        }`
      )
    }

    if (order.customer_note) {
      message.push(`\nКомментарий клиента: ${order.customer_note}`)
    }

    axios
      .post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: NOTIFICATIONS_CHANNEL,
        text: message.join('\n'),
        parse_mode: 'HTML',
      })
      .catch((e) => console.log(e))

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: true, order: response.data }))
  } else {
    res.setHeader('Allow', ['POST'])
    res.statusCode = 404
    res.end()
  }
}
