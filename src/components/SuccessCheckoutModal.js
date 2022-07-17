import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';

function SuccessCheckoutModal(props) {
  return (
    <Fragment>
      <Modal
        backdrop="static"
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
        centered
        style={{ marginTop: 0 }}
      >
        <div className="modal-body">
          <div className="row">
            <div className="col-12">
              <h4 className="text-center">
                <strong>Ура!</strong>
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-2">
              <p className="text-center">
                Ваш заказ успешно оформлен, в скором времени с вами свяжутся
                наши операторы, спасибо!
              </p>
            </div>
          </div>
          <div className="row justify-content-around mt-3">
            <div className="item-empty-area__text">
              <Link href={'/catalog'}>
                <a className="m-0 outlined-button">Продолжить покупки</a>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

SuccessCheckoutModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default SuccessCheckoutModal;
