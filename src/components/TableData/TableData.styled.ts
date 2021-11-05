import styled ,{css} from 'styled-components';

export  const TableHeaderCell = styled.th`
 ${({cssWidth}:{cssWidth?:string})=>{
     return cssWidth&&css`
       min-width:${cssWidth};
       max-width:${cssWidth};
     `
 }}
   
`

