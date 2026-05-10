import { NavLink} from "react-router"
export const ItemList  = ({item} : any) => {
    return (
        <>
        <h2></h2>
              <NavLink to={`/list/${item.id}`}>{item.title}</NavLink>
              <hr/>
        </>

    )
}