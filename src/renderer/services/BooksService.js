/**
 * Fetches an OPDS file from Standard Ebooks and converts the resulting XML into
 * a custom data structure for use in the application. This is our internal
 * "api" for the various components.
 * @module BooksService
 */

/**
 * @typedef {Object} Book
 * @property {string} id Unique URL of each book
 * @property {string} title
 * @property {array} authors
 * @property {string} language
 * @property {string} publisher
 * @property {array} source
 * @property {string} summary
 * @property {string} content
 * @property {array} categories
 */

import axios from 'axios'
const BOOKS_URL = 'https://standardebooks.org/opds/all'

export default {

  /**
   * get the books in the OPDS Feed
   * @returns {promise} HTTP request to the Standard Ebooks OPDS feed. If
   * successful this resolves to an array of Book objects.
   */
  get () {
    return axios.get(BOOKS_URL).then(response => {
      let parser = new DOMParser()
      let feed = parser.parseFromString(response.data, 'application/xml')
      let books = Array.from(feed.querySelectorAll('entry'))

      return books.map(b => { return this.generateBookData(b) })
    })
  },

  /**
   * Generates a Book object from an OPDS entry element.
   * @param {} bookXML
   * @returns {book}
   */
  generateBookData (bookXML) {
    function authorData (authorXML) {
      return {
        name: authorXML.querySelector('name').innerHTML,
        url: authorXML.querySelector('uri').innerHTML
      }
    }

    function sourceData (sourceXML) {
      return sourceXML.innerHTML
    }

    function categoryData (categoryXML) {
      return categoryXML.attributes.getNamedItem('term').value
    }

    return {
      id: bookXML.querySelector('id').innerHTML,
      title: bookXML.querySelector('title').innerHTML,
      authors: Array.from(bookXML.querySelectorAll('author')).map(a => {
        return authorData(a)
      }),
      language: bookXML.querySelector('language').innerHTML,
      publisher: bookXML.querySelector('publisher').innerHTML,
      source: Array.from(bookXML.querySelectorAll('source')).map(s => {
        return sourceData(s)
      }),
      summary: bookXML.querySelector('summary').textContent.trim(),
      content: bookXML.querySelector('content').textContent.trim(),
      categories: Array.from(bookXML.querySelectorAll('category')).map(c => {
        return categoryData(c)
      })
    }
  }
}
