import { utilService } from './util.service.js'

const GOOGLE_BOOK_KEY = 'cache'


const gSearchesCache = utilService.loadFromStorage('cache') || {}






export const googleBookService = {
    query,
    getGoogleBooks

}


function query(txt) {
    return getGoogleBooks(txt)
}
function getGoogleBooks(value) {
    if (gSearchesCache[value]) {
        console.log('frome cache: ', gSearchesCache[value])
        return Promise.resolve(gSearchesCache[value])
    }

    var url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${value}`
    const prm1 = axios.get(url)
        .then(res => res.data.items.map(book => {
            const detailedBook = {
                id: book.id,
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                reviews: [],
                thumbnail: book.volumeInfo.imageLinks.thumbnail,
                publishedDate: book.volumeInfo.publishedDate,
                pageCount: book.volumeInfo.pageCount,
                listPrice: {
                    amount: utilService.getRandomIntInclusive(1, 500),
                    currencyCode: "EUR",
                    isOnSale: false
                }
            }
            if (!detailedBook['description']) detailedBook['description'] = 'Book has no description'
            if (!detailedBook['thumbnail']) detailedBook['thumbnail'] = ''
            return detailedBook
        }))
        .then(finalItems => {
            gSearchesCache[value] = finalItems
            utilService.saveToStorage(GOOGLE_BOOK_KEY, gSearchesCache)
            return finalItems
        })
    console.log('frome axios: ', prm1)
    return prm1

}











