import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';

function CheckoutModal(props) {
  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper checkout-modal"
        centered
        style={{ marginTop: 0 }}
      >
        <Modal.Header closeButton />

        <div className="modal-body">
          <div className="row">
            <div className="col-12">
              <h4 className="text-center">
                <strong>Момент ...</strong>
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-2">
              <p className="text-center info">
                Если вы покинете эту страницу, информация не сохранится.
                <br />
                Вы уверены, что хотите прервать оформление заказа?
              </p>
            </div>
          </div>
          <div className="row justify-content-around mt-3">
            <div className="col">
              <div className="item-empty-area__text float-right">
                <Link href="/">
                  <a className="m-0 outlined-button">Выйти</a>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="item-empty-area__text float-left">
                <a className="m-0" onClick={props.onHide}>
                  Продолжить
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

CheckoutModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default CheckoutModal;
