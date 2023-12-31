import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import booksData from '../books.json' assert{type: 'json'}

const PAGE_SIZE = 5
const BOOK_KEY = 'bookDB'

var gFilterBy = {}
var gSortBy = {}
var gPageIdx

_createBooks()


export const bookService = {
    query,
    get,
    remove,
    save,
    addReview,
    removeReview,
    getEmptyReview,
    addGoogleBook,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy,
    getBookCountBySpeedMap
}
window.bookService = bookService

function query() {
    return storageService.query(BOOK_KEY)
    // .then(books => {
    //     if (gFilterBy.txt) {
    //         const regex = new RegExp(gFilterBy.txt, 'i')
    //         books = books.filter(car => regex.test(car.vendor))
    //     }
    //     if (gFilterBy.minSpeed) {
    //         books = books.filter(car => car.maxSpeed >= gFilterBy.minSpeed)
    //     }
    //     if (gPageIdx !== undefined) {
    //         const startIdx = gPageIdx * PAGE_SIZE
    //         books = books.slice(startIdx, startIdx + PAGE_SIZE)
    //     }
    //     if (gSortBy.maxSpeed !== undefined) {
    //         books.sort((c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed)
    //     } else if (gSortBy.vendor !== undefined) {
    //         books.sort((c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor)
    //     }

    //     return books
    // })
}

function get(bookId) {

    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            if (!book.reviews) {
                book.reviews = []
            }
            book.reviews.push(review)
            return save(book)
        })
}

function removeReview(bookId, reviewId) {
    return get(bookId)
        .then(book => {
            const idx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(idx, 1)
            return save(book)
        })
}

function getEmptyReview() {
    return {
        id: utilService.makeId(3),
        fullname: '',
        rating: 1,
        readAt: ''
    }
}

function addGoogleBook(book) {
    return get(book.id).then(book => {
        console.log(book);
        throw new Error(`Cannot add, book already exist... ${book}`)
    }).catch(err => {
        console.log(book);
        console.log('book added');
        return storageService.post(BOOK_KEY, book)
    })
}

function getEmptyBook(title = '', description = utilService.makeLorem(5)) {
    return {
        id: '',
        title,
        description,
        reviews: [],
        thumbnail: `img/book${utilService.getRandomIntInclusive(1, 4)}.jpg`,
        listPrice: {
            amount: utilService.getRandomIntInclusive(1, 500),
            currencyCode: "EUR",
            isOnSale: false
        }
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}
function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookIdx = books.findIndex(currbook => currbook.id === book.id)
            book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
            book.prevBookId = books[bookIdx - 1]
                ? books[bookIdx - 1].id
                : books[books.length - 1].id
            return book
        })
}

function getBookCountBySpeedMap() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const carCountBySpeedMap = books.reduce((map, car) => {
                if (car.maxSpeed < 120) map.slow++
                else if (car.maxSpeed < 200) map.normal++
                else map.fast++
                return map
            }, { slow: 0, normal: 0, fast: 0 })
            return carCountBySpeedMap
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        // books = []
        // books.push(_createBook('Harry Potter'))
        // books.push(_createBook('Hunger Games'))
        // books.push(_createBook('The Alchemist'))
        // books.push(_createBook('Art Of War'))
        books = booksData
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, description = utilService.makeLorem(5)) {
    const book = getEmptyBook(title, description)
    book.id = utilService.makeId()
    return book
}