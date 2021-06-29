// Utils

export const getOrderOptions = (list) => {
    return list.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
}

export const isMobile = () => (
    navigator.userAgent.toLowerCase().indexOf("android") > -1 ||
    [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
)

export function paramsToObject(entries) {
    const result = {};
    for (const entry of entries) {
      // each 'entry' is a [key, value] tupple
      const [key, value] = entry;
      result[key] = value;
    }
    return result;
}