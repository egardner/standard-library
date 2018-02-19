/**
 * Fetches an OPDS file from Standard Ebooks and converts the resulting XML into
 * a custom data structure for use in the application. This is our internal
 * "api" for the various components.
 * @module BooksService
 */

/**
 * @typedef   {Object}         Book
 * @property  {string}         id Unique URL of each book
 * @property  {string}         title
 * @property  {array|string}   authors
 * @property  {string}         language
 * @property  {string}         publisher
 * @property  {array|string}   source
 * @property  {string}         summary
 * @property  {string}         content
 * @property  {array|string}   categories
 * @property  {string}         cover
 * @property  {string}         thumbnail
 */

/**
 * @typedef   {Object}  Author
 * @property  {string}  name
 * @property  {string}  url
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

      return books.map(b => this.generateBookData(b))
    })
  },

  /**
   * Generates a Book object from an OPDS entry element.
   * @param {node} bookXML
   * @returns {book} book object
   */
  generateBookData (bookXML) {
    /**
     * Parses an XML author tag and returns an author object
     * @param {node} authorXML
     * @returns {author} author object
     */
    function authorData (authorElement) {
      return {
        name: authorElement.querySelector('name').innerHTML,
        url : authorElement.querySelector('uri').innerHTML
      }
    }

    /**
     * Parses an XML source tag and returns a string of its content
     * @param {node} sourceElement
     * @returns {string} source string
     */
    function sourceData (sourceElement) {
      return sourceElement.innerHTML
    }

    /**
     * Parses an XML category tag and returns a string of its "term" attr value
     * @param {node} categoryElement
     * @returns {string} category term
     */
    function categoryData (categoryElement) {
      return categoryElement.attributes.getNamedItem('term').value
    }

    // function coverURL (doc) {
    //   let imageLinks = doc.querySelectorAll('link[]')
    // }

    // Alias DOM query methods for clarity
    let q = bookXML.querySelector.bind(bookXML)
    let qA = bookXML.querySelectorAll.bind(bookXML)

    return {
      id        : q('id').innerHTML,
      title     : q('title').innerHTML,
      authors   : Array.from(qA('author')).map(a => authorData(a)),
      language  : q('language').innerHTML,
      publisher : q('publisher').innerHTML,
      source    : Array.from(qA('source')).map(s => sourceData(s)),
      summary   : q('summary').textContent.trim(),
      content   : q('content').textContent.trim(),
      categories: Array.from(qA('category')).map(c => categoryData(c)),
      cover     : undefined,
      thumbnail : undefined
    }
  }
}
