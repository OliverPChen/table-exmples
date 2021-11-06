import React, { useState, useEffect, useCallback, useMemo, MouseEvent, MouseEventHandler, ChangeEvent } from 'react';
import { PaginationDTO } from './paginationDTO';
import {
    PaginationContainer,
    PaginationUL,
    PaginationLi,
    PaginationLink,
    SVGFeatherArrow,
    PaginationInfo,
} from './Paginnation.styled';

const maxLength = 5;

const isNumber = (value: string) => {
    return /^\d+(\.\d+)?$/.test(value);
};
export type PaginationItem = {
    pages: number;
    currentPage: number;
    isDisable: boolean;
};

const PaginationItem: React.FunctionComponent<PaginationItem> = ({ pages, currentPage, isDisable }): JSX.Element => {
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
                if (i === 0) {
                    pageArray.push('1');
                }
                if (i == 1) {
                    pageArray.push('next_ellipsis');
                }
                if (i >= 2) {
                    pageArray.push(`${pages - (maxLength - i + 1)}`);
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
        console.log('currentPage', currentPage);
        return pageArray;
    }, [pages, currentPage]);

    return (
        <>
            {pageNumberValues
                ? pageNumberValues.map((pageNumberValue: string, index: number) => (
                      <PaginationLi key={pageNumberValue}>
                          {isNumber(pageNumberValue) ? (
                              <PaginationLink
                                  href="#"
                                  isActive={isNumber(pageNumberValue) && currentPage === parseInt(pageNumberValue) - 1}
                                  isDisable={isDisable}
                                  data-role={pageNumberValue}
                              >
                                  {pageNumberValue}
                              </PaginationLink>
                          ) : (
                              <PaginationLink href="#" data-role={pageNumberValue}>
                                  …
                              </PaginationLink>
                          )}
                      </PaginationLi>
                  ))
                : '……'}
        </>
    );
};

const Pagination: React.FunctionComponent<PaginationDTO> = ({
    currentPage,
    jumpAction,
    totalNumber,
    pageSize,
    isDisable = false,
}): JSX.Element => {
    const pages = useMemo<number>(() => Math.ceil(totalNumber / pageSize), [totalNumber, pageSize]);
    const clickWasActioned = useCallback(
        (e: MouseEvent<HTMLElement>) => {
            const roleValue = (e.target as EventTarget & { dataset: any }).dataset.role;
            if (isNumber(roleValue)) {
                jumpAction(parseInt(roleValue, 10) - 1);
            } else {
                if (roleValue === 'pre' && currentPage > 0) {
                    jumpAction(currentPage - 1);
                } else if (roleValue === 'next' && currentPage < pages - 1) {
                    jumpAction(currentPage + 1);
                }
            }
        },
        [currentPage, pageSize, pages],
    );

    return (
        <PaginationContainer>
            <PaginationInfo>{`Showing page ${currentPage + 1} of ${pages}`}</PaginationInfo>
            <PaginationUL onClick={clickWasActioned}>
                <PaginationLi>
                    <PaginationLink href="#" data-role="pre" isDisable={isDisable || currentPage === 0}>
                        <SVGFeatherArrow
                            data-role="pre"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line data-role="pre" x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline data-role="pre" points="12 19 5 12 12 5"></polyline>
                        </SVGFeatherArrow>
                    </PaginationLink>
                </PaginationLi>
                <PaginationItem pages={pages} currentPage={currentPage} isDisable={isDisable} />
                <PaginationLi>
                    <PaginationLink href="#" data-role="next" isDisable={isDisable || currentPage === pages - 1}>
                        <SVGFeatherArrow
                            xmlns="http://www.w3.org/2000/svg"
                            data-role="next"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line data-role="pre" x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline data-role="pre" points="12 5 19 12 12 19"></polyline>
                        </SVGFeatherArrow>
                    </PaginationLink>
                </PaginationLi>
            </PaginationUL>
        </PaginationContainer>
    );
};

export default Pagination;
