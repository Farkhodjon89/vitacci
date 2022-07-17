import client from '../components/ApolloClient';
import GET_CATEGORIES_QUERY from '../../queries/categories';
import { ATTRIBUTES } from '../../queries/attributes';
import { capitalize } from './functions';

const fetchCategories = async () => {
  const result = await client.query({
    query: GET_CATEGORIES_QUERY,
    fetchPolicy: 'no-cache',
  });

  const list = result.data.productCategories.nodes
    .filter(category => category.slug !== 'uncategorized')
    .map(category => ({
      ...category,
      children: category.children ? category.children.nodes : [],
    }));

  const main = list.filter(category => category.parent == null);

  return {
    list,
    main,
  };
};

const fetchAttributes = async () => {
  const { data } = await client.query({
    query: ATTRIBUTES,
  });

  const attributeTranslations = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      attributeTranslations[key] = data[key].nodes.map(({ slug, name }) => ({
        name: capitalize(name),
        slug,
      }));
    }
  }

  const catalogAttributes = {
    heelHeights: data.paHeelHeights.nodes,
    colors: data.paColors.nodes,
    sizes: data.paSizes.nodes,
  };

  return {
    catalogAttributes,
    attributeTranslations,
  };
};

export class StaticData {
  constructor(categories, attributes) {
    this.categories = categories || {
      list: [],
      main: [],
    };

    this.attributes = attributes || {
      catalogAttributes: {},
      attributeTranslations: {},
    };
  }
}

export class StaticDataSingleton {
  constructor() {
    if (!StaticDataSingleton.instance) {
      StaticDataSingleton.instance = new StaticData();
    }
  }

  getInstance() {
    return StaticDataSingleton.instance;
  }

  async checkAndFetch(force = false) {
    const staticData = new StaticDataSingleton().getInstance();

    const isCategoriesEmpty = staticData.categories.list.length === 0;
    const isAttributesEmpty = Object.keys(staticData.attributes).length === 0;

    if (force || isCategoriesEmpty || isAttributesEmpty) {
      try {
        staticData.categories = await fetchCategories();
        staticData.attributes = await fetchAttributes();
      } catch (e) {
        console.log('L39 e:', e);

        staticData.attributes = {
          catalogAttributes: {},
          attributeTranslations: {},
        };
        staticData.categories = {
          list: [],
          main: [],
        };
      }
    }
  }
}
