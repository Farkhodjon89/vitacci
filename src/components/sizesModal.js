import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

function SizesModal(props) {
  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
        centered
        style={{ marginTop: 0 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Размерная сетка</Modal.Title>
        </Modal.Header>

        <div className="modal-body">
          <div className="container">
            <div className="description-review-wrapper">
              <Tab.Container defaultActiveKey="shoes">
                <Nav variant="pills" className="description-review-topbar">
                  <Nav.Item>
                    <Nav.Link eventKey="shoes">Обувь</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="gloves">Перчатки</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content className="description-review-bottom">
                  <Tab.Pane eventKey="shoes">
                    <img
                      className="w-100"
                      src={`${process.env.PUBLIC_URL}/shoes_sizes.jpg`}
                      alt="Размерная сетка"
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="gloves">
                    <img
                      className="w-100"
                      src={`${process.env.PUBLIC_URL}/gloves_sizes.jpg`}
                      alt="Размерная сетка"
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

SizesModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default SizesModal;
