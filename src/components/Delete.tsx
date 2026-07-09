import { Button } from "../ui/Button";

interface Dell {
  id: number;
  onDelete: (id: number) => void;
  isIcon?: boolean;
}

export const Delete = ({ id, onDelete }: Dell) => {
  return (
    <div>
      <Button
        onClick={() => onDelete(id)}
        cursor="pointer"
        size="sm"
        variant="danger"
      >
        Удалить
      </Button>
    </div>
  );
};
