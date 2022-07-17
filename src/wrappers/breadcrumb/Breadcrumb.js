import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from 'react-breadcrumbs-dynamic';

const Breadcrumb = () => {
  return (
    <div className="breadcrumb-area pt-2 pb-2 bg-gray-3 joki ">
      <div className="container">
        <div className="breadcrumb-content text-left">
          <Breadcrumbs
            separator={<span>/</span>}
            // item={Link}
            finalItem={'span'}
          />
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
