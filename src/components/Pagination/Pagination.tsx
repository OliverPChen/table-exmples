import React, { useState, useEffect, useCallback, useMemo, MouseEvent, MouseEventHandler, ChangeEvent } from 'react';
import classnames from 'classnames';
import { PaginationDTO } from './paginationDTO';
import { PaginationContainer } from './Paginnation.styled';

const maxLength = 5;

const isNumber = (value: string) => {
    return /^\d+(\.\d+)?$/.test(value);
};
export type PaginationItem = {
    pages: number;
    currentPage: number;
};

const PaginationItem: React.FunctionComponent<PaginationItem> = ({ pages, currentPage }): JSX.Element => {
    const pageNumberValues = useMemo<string[]>(() => {
        let pageArray = [];
        if (pages <= maxLength) {
            for (let i = 0; i < pages; i++) {
                pageArray.push(`${i}`);
            }
        } else if (currentPage < maxLength - 1) {
            for (let i = 0; i < maxLength + 2; i++) {
                if (i <= 4) {
                    pageArray.push(`${i + 1}`);
                }
                if (i == 5) {
                    pageArray.push('pre_ellipsis');
                }
                if (i == 6) {
                    pageArray.push(`${pages}`);
                }
            }
        } else if (currentPage + 1 <= pages && currentPage > pages - maxLength - 1) {
            for (let i = 0; i < maxLength + 2; i++) {
                if (i <= 4) {
                    pageArray.push(`${i + 1}`);
                }
                if (i == 5) {
                    pageArray.push('next_ellipsis');
                }
                if (i == 6) {
                    pageArray.push(`${pages}`);
                }
            }
        } else {
            pageArray.push(`1`);
            pageArray.push('pre_ellipsis');
            pageArray.push(`${currentPage}`);
            pageArray.push(`${currentPage + 1}`);
            pageArray.push(`${currentPage + 2}`);
            pageArray.push('next_ellipsis');
            pageArray.push(`${pages}`);
        }
        console.log(pageArray);
        return pageArray;
    }, [pages, currentPage]);

    return (
        <>
            {pageNumberValues
                ? pageNumberValues.map((pageNumberValue: string) => (
                      <li
                          key={pageNumberValue}
                          data-role={pageNumberValue}
                          className={classnames('paginate_button', 'page-item', {
                              active: `${currentPage + 1}` === pageNumberValue,
                          })}
                      >
                          {isNumber(pageNumberValue) ? (
                              <a href="#" className="page-link" data-role={pageNumberValue}>
                                  {pageNumberValue}
                              </a>
                          ) : (
                              <a href="#" data-role={pageNumberValue} className="page-link">
                                  …
                              </a>
                          )}
                      </li>
                  ))
                : ''}
        </>
    );
};

const Pagination: React.FunctionComponent<PaginationDTO> = ({
    currentPage,
    jumpAction,
    totalNumber,
    pageSize,
}): JSX.Element => {
    const pages = useMemo<number>(() => Math.ceil(totalNumber / pageSize), [totalNumber, pageSize]);
    const clickWasActioned = useCallback(
        (e: MouseEvent<HTMLElement>) => {
            const roleValue = (e.target as EventTarget & { dataset: any }).dataset.role;
            if (isNumber(roleValue)) {
                jumpAction(parseInt(roleValue, 10) - 1);
            } else {
                if (roleValue === 'next' && currentPage > 0) {
                    jumpAction(currentPage - 1);
                } else if (roleValue === 'pre' && currentPage < pages - 1) {
                    jumpAction(currentPage + 1);
                }
            }
        },
        [currentPage, pageSize, pages],
    );

    return (
        <PaginationContainer>
            <ul className="pagination" onClick={clickWasActioned}>
                <li data-role="next" className="paginate_button page-item previous">
                    <a href="#" className="page-link" data-role="next">
                        <svg
                            data-role="next"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-arrow-left"
                        >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </a>
                </li>
                <PaginationItem pages={pages} currentPage={currentPage} />
                <li className="paginate_button page-item next" data-role="pre" id="zero-config_next">
                    <a href="#" data-role="pre" className="page-link">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-role="pre"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-arrow-right"
                        >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </li>
            </ul>
        </PaginationContainer>
    );
};

export default Pagination;
