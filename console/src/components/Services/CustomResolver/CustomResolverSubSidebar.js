import React from 'react';
import { Link } from 'react-router';

import LeftSubSidebar from '../../Common/Layout/LeftSubSidebar/LeftSubSidebar';

const CustomResolverSubSidebar = ({
  appPrefix,
  dataList,
  filtered,
  searchQuery,
  location,
  filterItem,
  viewResolver,
  migrationMode,
}) => {
  const styles = require('../../Common/Layout/LeftSubSidebar/LeftSubSidebar.scss');

  function tableSearch(e) {
    const searchTerm = e.target.value;
    filterItem(dataList, searchTerm);
  }

  const getSearchInput = () => {
    return (
      <input
        type="text"
        onChange={tableSearch.bind(this)}
        className="form-control"
        placeholder="search remote schemas"
        data-test="search-remote-schemas"
      />
    );
  };

  const getChildList = () => {
    const _dataList = searchQuery ? filtered : dataList;

    let childList;
    if (_dataList.length === 0) {
      childList = (
        <li
          className={styles.noChildren}
          data-test="remote-schema-sidebar-no-schemas"
        >
          <i>No remote schemas available</i>
        </li>
      );
    } else {
      childList = _dataList.map((d, i) => {
        let activeTableClass = '';
        if (
          d.name === viewResolver &&
          location.pathname.includes(viewResolver)
        ) {
          activeTableClass = styles.activeTable;
        }

        return (
          <li
            className={activeTableClass}
            key={i}
            data-test={`remote-schema-sidebar-links-${i + 1}`}
          >
            <Link
              to={appPrefix + '/manage/' + d.name + '/details'}
              data-test={d.name}
            >
              <i
                className={styles.tableIcon + ' fa fa-table'}
                aria-hidden="true"
              />
              {d.name}
            </Link>
          </li>
        );
      });
    }

    return childList;
  };

  return (
    <LeftSubSidebar
      migrationMode={migrationMode}
      searchInput={getSearchInput()}
      heading={`Remote Schemas (${dataList.length})`}
      addLink={`${appPrefix}/manage/add`}
      addLabel={'Add'}
      addTestString={'remote-schema-sidebar-add-table'}
      childListTestString={'remote-schema-table-links'}
    >
      {getChildList()}
    </LeftSubSidebar>
  );
};

export default CustomResolverSubSidebar;
