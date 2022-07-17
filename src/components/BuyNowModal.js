import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { useRouter } from 'next/router';
import Input, {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input/input';

function BuyNowModal({ buyNowData, show, onHide }) {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('+998');
  const [phoneInvalidMessage, setPhoneInvalidMessage] = useState('');
  const router = useRouter();

  const phoneInputIsValid = phone => {
    if (!phone) {
      setPhoneInvalidMessage('Обязательное поле!');
      return false;
    } else if (!isValidPhoneNumber(phone)) {
      setPhoneInvalidMessage(
        'Неверный формат телефона. Пример: +998 90 123 45 67'
      );
      return false;
    } else {
      setPhoneInvalidMessage('');
      return true;
    }
  };

  if (buyNowData == null) {
    return <div />;
  }

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    const lineItems = [
      {
        price: buyNowData.price,
        quantity: buyNowData.quantity,
        variation_id: buyNowData.variation && buyNowData.variation.id,
        name: buyNowData.name,
        product_id: buyNowData.id,
      },
    ];

    const paymentData = {
      line_items: lineItems,
      status: 'pending',
      currency: 'UZS',
      payment_method: 'cod',
      payment_method_title: 'Наличными',
      set_paid: false,
      customer_note: '',
      billing: {
        first_name: firstName,
        phone: phone,
        last_name: '',
      },
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Бесплатная достава',
          total: '0',
        },
      ],
      shipping: {
        address_1: '',
      },
    };

    const response = await axios.post('/api/order', { order: paymentData });

    setLoading(false);

    if (typeof window !== 'undefined') {
      localStorage.setItem('order', JSON.stringify(response.data.order));
    }

    await router.replace(
      `/order/${response.data.order.id}`,
      `/order/${response.data.order.id}`
    );
  };

  return (
    <Fragment>
      <Modal
        show={show}
        onHide={onHide}
        className="product-quickview-modal-wrapper"
        centered
        style={{ marginTop: 0 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`Оформление товара: ${buyNowData.name}`}</Modal.Title>
        </Modal.Header>

        <div className="modal-body">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <img
                  className="w-100 h-100"
                  src={buyNowData.image[0]}
                  alt={buyNowData.name}
                />
              </div>

              <div className="col-12 col-md-6">
                <form onSubmit={submit}>
                  <div className="billing-info-wrap">
                    <div className="billing-info mb-20">
                      <label>Имя</label>
                      <input
                        disabled={loading}
                        required
                        type="text"
                        placeholder="Имя"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="billing-info mb-20">
                      <label htmlFor="phone">Номер телефона</label>
                      <Input
                        disabled={loading}
                        id="phone"
                        international
                        withCountryCallingCode
                        required
                        placeholder="Номер телефона"
                        className={`${'is-invalid'}`}
                        value={phone}
                        onChange={phone => {
                          phoneInputIsValid(phone);
                          setPhone(phone || '');
                        }}
                      />
                      <div className="invalid-feedback font">
                        {phoneInvalidMessage}
                      </div>
                    </div>
                  </div>

                  <div className="simple-button btn-hover">
                    <button
                      type="submit"
                      disabled={loading || phoneInvalidMessage}
                    >
                      {loading ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        'Оформить заказ'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

BuyNowModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default BuyNowModal;
