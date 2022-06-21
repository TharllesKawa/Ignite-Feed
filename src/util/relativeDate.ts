import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function relativeDate(date: Date) {
    const resRelativeDate = formatDistanceToNow(date, {
        locale: ptBR,
        addSuffix: true,
    });

    return resRelativeDate;
}