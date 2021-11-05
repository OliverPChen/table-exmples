
export type PaginationDTO = {
    totalNumber:number;
    pageSize:number;
    jumpAction:(currentPage:number)=>void;
    currentPage:number;
  }