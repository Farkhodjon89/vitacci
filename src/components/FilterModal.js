import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';

function FilterModal(props) {
  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        dialogClassName="modal-100w filter-modal p-0"
        centered
        backdrop="static"
        style={{ marginTop: 0 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Фильтр</Modal.Title>
        </Modal.Header>

        <div className="modal-body">{props.children}</div>
      </Modal>
    </Fragment>
  );
}

FilterModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.node,
};

export default FilterModal;
