import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: Date) {
    const dateFormated = format(date, "d 'de' LLLL 'ás' HH:mm'h'", {
        locale: ptBR,
    });

    return dateFormated;
}