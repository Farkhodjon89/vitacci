import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

import PropTypes from 'prop-types';
import { capitalize } from '../../utils/functions';
import Link from 'next/link';

const CatalogCategories = ({ categories, activeCategory, getFilterParams }) => {
  const [salesOn, setSalesOn] = useState(false);

  useEffect(() => {
    if (process.browser && window.location.search.includes('filter_onSale')) {
      setSalesOn(true);
    } else {
      setSalesOn(false);
    }
  }, []);

  categories = [
    {
      name: 'Все категории',
      slug: '',
      parent: null,
      children: [],
    },
    ...categories,
  ];

  const [initialCategories, setInitialCategories] = useState([]);

  const findParents = categorySlug => {
    const category = categories.find(x => x.slug === categorySlug);

    if (category && category.parent) {
      setInitialCategories([...initialCategories, category.parent.node.slug]);

      if (category.parent.node.parent) {
        findParents(category.parent.node.parent.slug);
      }
    }
  };

  useEffect(() => {
    if (activeCategory) {
      const initialCategory = categories.find(x => x.slug === activeCategory);

      if (initialCategory) {
        if (initialCategory.parent) {
          findParents(initialCategory.slug);
        } else {
          setInitialCategories([...initialCategories, initialCategory.slug]);
        }
      }
    }
  }, []);

  function categorySelect(category) {
    return (
      <div
        key={category.slug}
        className="px-3 py-2"
        style={{ borderTop: '1px solid rgba(0, 0, 0, 0.125)' }}
      >
        <div className="categories-check">
          <Link
            href={`/catalog/${category.slug}${
              salesOn ? '?filter_onSale=true' : ''
            }`}
          >
            <a
              className={
                activeCategory === category.slug ||
                (category.slug === '' && activeCategory == null)
                  ? 'active'
                  : ''
              }
              onClick={e => {
                getFilterParams('categories', category.slug);
                // setActiveSort(e, activeCategories);
              }}
            >
              <span className="checkmark" /> {capitalize(category.name)}
            </a>
          </Link>
        </div>
      </div>
    );
  }

  function buildCategories(category) {
    if (!category.children.length) {
      return categorySelect(category, activeCategory);
    }

    return category.children.map(({ slug }) => {
      let _category = categories.find(x => x.slug === slug);

      if (!_category.children.length) {
        return categorySelect(_category);
      }

      return (
        <Accordion
          defaultActiveKey={
            initialCategories.includes(category.slug) ? category.slug : ''
          }
          key={_category.slug}
        >
          <Card className="sidebar-accordion border-left-0 border-bottom-0 border-right-0">
            <Card.Header className="panel-heading">
              <Accordion.Toggle variant="link" eventKey={_category.slug}>
                <h3 className="panel-title px-3 py-1">
                  {capitalize(_category.name)}
                </h3>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={_category.slug}>
              <div>{buildCategories(_category)}</div>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );
    });
  }

  const order = ['obuv', 'sumki', 'aksessuary'];

  const mainCategories = categories
    .filter(x => x.parent == null)
    .sort(
      // @ts-ignore
      (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug)
    );

  const categoryAccordions = [];

  for (const category of mainCategories) {
    if (!category.children.length) {
      categoryAccordions.push(categorySelect(category));
      continue;
    }

    categoryAccordions.push(
      <Card
        className={`sidebar-accordion border-left-0 border-bottom-0 border-right-0 ${
          !categoryAccordions.length ? 'border-top-0' : ''
        }`}
        key={category.slug}
      >
        <Card.Header className="panel-heading">
          <Accordion.Toggle variant="link" eventKey={category.slug}>
            <h3 className="panel-title px-3 py-1">{category.name}</h3>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={category.slug}>
          <div>{buildCategories(category)}</div>
        </Accordion.Collapse>
      </Card>
    );
  }

  return (
    <Accordion defaultActiveKey="0">
      <div className="sidebar-accordion">
        <div className="root panel-heading">
          <Accordion.Toggle variant="link" eventKey="0">
            <h3 className="panel-title py-1">Категории</h3>
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="0">
          <Accordion
            key={initialCategories.length}
            className="root panel-body"
            defaultActiveKey={
              initialCategories.length ? initialCategories[0] : ''
            }
          >
            {categoryAccordions}
          </Accordion>
          {/*<div className="root panel-body pt-2">{}</div>*/}
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
};

CatalogCategories.propTypes = {
  categories: PropTypes.array,
  activeCategory: PropTypes.string,
  getFilterParams: PropTypes.func,
};

export default CatalogCategories;
