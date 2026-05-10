import { Button } from "../ui/Button";
import { useLanguage } from "../context/LanguageContext";
interface Dell {
    id: number,
    onDelete: (id:number) => void;
    isIcon?: boolean
}

export const Delete = ({id, onDelete, isIcon}: Dell) => {
      const { t } = useLanguage();
      console.log("sdad");
      
    return(
        <div>
           <Button key={id} onClick={() => onDelete(id)} cursor="pointer" size="sm" variant="danger">{isIcon ? t.delete : t.dell} </Button> 
        </div>
    )
}