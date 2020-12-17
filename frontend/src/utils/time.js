import { formatDistance, subMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale'

export function getAvgReadingTime(content) {
    const nWords = content.split(' ').length;

    const AVG_WORDS_PER_MIN = 250;
    const mins = Math.floor(nWords / AVG_WORDS_PER_MIN);

    const now = new Date();

    return formatDistance(subMinutes(now, mins), now, {
        locale: ptBR
    });
}

export function getElapsedTime(time) {
    return formatDistance(new Date(time), new Date(), {
        locale: ptBR
    })
}