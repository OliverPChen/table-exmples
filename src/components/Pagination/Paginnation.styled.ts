import styled ,{css} from 'styled-components';

export  const PaginationContainer = styled.div`
   height:5rem;
   display:flex;
   display: flex;
   align-items: flex-end;
    justify-content: center;
`

export const PaginationUL = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    flex:1;
`
interface LinkProps {
    readonly isActive?: boolean;
    readonly isDisable?:boolean;
}

export const PaginationLink = styled.a<LinkProps>`
   color: #888ea8;
   display:block;
   border-radius: 50%;
   width:100%;
   height:100%;
   text-align: center;
   border-color: ${props=>props.isDisable?'#dee2e6':''} ;;
   background-color:${props=>props.isDisable&&!props.isActive?"#f1f2f3":props.isActive?'#1b55e2':'rgba(0, 23, 55, 0.08)'} ;
   color:${props=>props.isDisable&&!props.isActive?"#6c757d":props.isActive?'#fff':'#888ea8'} ;
   pointer-events:${props=>props.isDisable?"none":"all"} ;
   overflow: hidden;    
   text-overflow:ellipsis;    
   white-space: nowrap;
   &::hover{
     color:#1b55e2;
   }
`
export const SVGFeatherArrow=styled.svg`
     margin-bottom: 4px;
`
export const PaginationLi = styled.li`
    margin-right: 5px;
    border-radius: 50%;
    display:block;
    width:33px;
    height:35px;
    line-height: 35px;
   
    &:first-child {
        height:35px;
    }
    &:last-child {
        height:35px;
    }
`

export const PaginationInfo= styled.div`
    white-space: normal;
    color: #1b55e2;
    font-weight: 600;
    border: 1px solid #e0e6ed;
    display: inline-block;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 13px;
`


