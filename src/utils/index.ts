export const getBackgroundColor = (condition: string) => {
    switch (condition.toLowerCase()) {
        case 'clear': return 'bg-blue-500';
        case 'clouds': return 'bg-gray-500';
        case 'rain': return 'bg-blue-900';
        case 'snow': return 'bg-white text-black';
        case 'thunderstorm': return 'bg-purple-700';
        default: return 'bg-blue-300';
    }
};

export const translateCondition = (condition: string) => {
    switch (condition.toLowerCase()) {
        case 'clear': return 'Céu limpo';
        case 'clouds': return 'Nublado';
        case 'rain': return 'Chuva';
        case 'snow': return 'Neve';
        case 'thunderstorm': return 'Tempestade';
        case 'drizzle': return 'Chuvisco';
        case 'mist': return 'Névoa';
        case 'smoke': return 'Neblina';
        case 'haze': return 'Neblina';
        case 'dust': return 'Poeira';
        case 'fog': return 'Nevoeiro';
        case 'sand': return 'Areia';
        case 'ash': return 'Cinzas';
        case 'squall': return 'Rajadas de vento';
        case 'tornado': return 'Tornado';
        default: return 'Condição desconhecida';
    }
};