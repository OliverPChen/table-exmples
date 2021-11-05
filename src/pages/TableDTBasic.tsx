import React, { useCallback, useEffect, useMemo, useReducer, useState, ChangeEvent } from 'react';
import Header from '../components/Header/Header';
import TopBarNav from '../components/TopBarNav/TopBarNav';
import MainContent from '../components/MainContent/MainContent';
import { fetchAllInfo, ItemDetailInfoDTO, ConditionProps, SearchConditionProps } from './tableDTBasic.api';
import TableData from '../components/TableData/TableData';
import { Spinner, Row, Col } from 'react-bootstrap';
import Pagination from '../components/Pagination/Pagination';

const searchField = [
    {
        label: '更新时间',
        key: 'item_4',
    },
    {
        label: '公司名称',
        key: 'item_6',
    },
    {
        label: '创建时间',
        key: 'item_15',
    },
    {
        label: '人数',
        key: 'peoples',
    },
];

const columns = [
    {
        key: 'companyNo',
        value: '公司代码',
        width: '8rem',
    },
    {
        key: 'companyName',
        value: '公司名称',
        width: '9rem',
    },
    {
        key: 'updateDate',
        value: '更新日期',
        width: '5rem',
    },
    {
        key: 'foundingDate',
        value: '创建日期',
        width: '5rem',
    },
    {
        key: 'street',
        value: '街道名称',
        width: '9rem',
    },
    {
        key: 'province',
        value: '省份',
        width: '5rem',
    },
    {
        key: 'provinceNo',
        value: '省编码',
        width: '5rem',
    },
    {
        key: 'city',
        value: '城市',
        width: '5rem',
    },
    {
        key: 'post',
        value: '邮编',
        width: '5rem',
    },
    {
        key: 'peoples',
        value: '人数',
        width: '5rem',
    },
    {
        key: 'romaji',
        value: '罗马字',
        width: '5rem',
    },
];

function onRenderCell(
    colKey: keyof ItemDetailInfoDTO | string,
    record: ItemDetailInfoDTO,
): ItemDetailInfoDTO[keyof ItemDetailInfoDTO] {
    return record[colKey as keyof ItemDetailInfoDTO];
}

const TableDTBasic: React.FunctionComponent = (): JSX.Element => {
    const [tableData, setTableData] = useState<ItemDetailInfoDTO[]>();
    const [totalNumber, setTotalNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataConditions, setDataconditions] = useState<ConditionProps>({
        pageNumber: 0,
    });
    const [searchCondition, setSearchCondition] = useState<SearchConditionProps>({
        item_4: '',
        item_15: '',
        item_6: '',
        peoples: '',
    });

    const jumpAction = useCallback((currentPage) => {
        setDataconditions((dataConditions) => ({ ...dataConditions, pageNumber: currentPage }));
    }, []);

    const getPageData = useCallback(() => {
        setIsLoading(true);
        fetchAllInfo(dataConditions)
            .then((data) => {
                console.log(data);
                setTotalNumber(data.data.total);
                setTableData(data.data.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dataConditions]);

    const changeWasActioned = useCallback((e: ChangeEvent<HTMLElement>) => {
        const key = e.currentTarget.dataset.role!;
        const value = (e.currentTarget as unknown as EventTarget & { value: string }).value;
        setSearchCondition((searchCondition) => {
            return {
                ...searchCondition,
                [key]: value,
            };
        });
    }, []);

    const searchClickWasActioned = useCallback(() => {
        setDataconditions((dataConditions) => ({ ...dataConditions, ...searchCondition }));
    }, [searchCondition]);

    useEffect(() => {
        getPageData();
    }, [getPageData]);

    return (
        <>
            <Header />
            <div className="main-container">
                <div className="overlay"></div>
                <div className="search-overlay"></div>
                <TopBarNav />
                <MainContent>
                    <>
                        <Row>
                            {searchField.map((item) => (
                                <Col key={item.key} md={3}>
                                    <div id="zero-config_filter" className="dataTables_filter">
                                        <label>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-search"
                                                onClick={searchClickWasActioned}
                                            >
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                            </svg>
                                            <input
                                                value={searchCondition[item.key as keyof SearchConditionProps]}
                                                type="search"
                                                className="form-control"
                                                data-role={item.key}
                                                placeholder={item.label}
                                                onChange={changeWasActioned}
                                                aria-controls="zero-config"
                                            />
                                        </label>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <Row className="justify-content-md-center responsiveFillFull">
                            {isLoading ? (
                                <Spinner animation="border" variant="primary" />
                            ) : (
                                <TableData<ItemDetailInfoDTO>
                                    tableData={tableData}
                                    columns={columns}
                                    onRenderCell={onRenderCell}
                                />
                            )}
                        </Row>
                        <Row>
                            <Col />
                            <Col>
                                <Pagination
                                    currentPage={dataConditions.pageNumber}
                                    totalNumber={300}
                                    pageSize={10}
                                    jumpAction={jumpAction}
                                />
                            </Col>
                            <Col />
                        </Row>
                    </>
                </MainContent>
            </div>
        </>
    );
};

export default TableDTBasic;
